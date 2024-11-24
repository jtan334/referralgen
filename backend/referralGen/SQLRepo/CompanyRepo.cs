using referralGen.models;
using Dapper;

namespace referralGen.SQLRepo;

public class CompanyRepo
{


    private readonly DatabaseConnection _dbConnection;

     public CompanyRepo(DatabaseConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }


   public async Task<string> AddCompany(Company newCompany)
{
    using var connection = _dbConnection.CreateConnection();

    // Check if a company with the same product and company name already exists
    string checkSql = @"
        SELECT COUNT(*) 
        FROM companies 
        WHERE productName = @ProductName AND companyName = @CompanyName;";

    var exists = await connection.ExecuteScalarAsync<int>(checkSql, new 
    { 
        CompanyName = newCompany.CompanyName, 
        ProductName = newCompany.ProductName 
    });

    if (exists > 0)
    {
        return "Company and product is not unique.";
    }

    // Insert new company details into the companies table
    string sqlInsert = @"
        INSERT INTO companies (CompanyName, ProductName, Country, LinkFormat, Approval)
        VALUES (@CompanyName, @ProductName, @Country, @LinkFormat, @Approval);";

    // Execute the insert operation
    await connection.ExecuteAsync(sqlInsert, new 
    { 
        CompanyName = newCompany.CompanyName, 
        ProductName = newCompany.ProductName, 
        Country = newCompany.Country, 
        LinkFormat = newCompany.LinkFormat, 
        Approval = "pending"
    });

    // Fetch the newly inserted company by auto-incremented ID
    string sqlSelect = @"
        SELECT * 
        FROM companies 
        WHERE idcompanies = LAST_INSERT_ID();";

    // Get the newly created company
    var createdCompany = await connection.QuerySingleAsync<Company>(sqlSelect);

    // Return success message with details of the created company
    return $"Company and product created successfully: {createdCompany.CompanyName} {createdCompany.ProductName}";
}

    public async Task<List<Company>> GetCompanies ()
    {
        using var connection = _dbConnection.CreateConnection();

        string sql = "SELECT * FROM companies";
        var companies = await connection.QueryAsync<Company>(sql);

        return companies.ToList();
    }

     public async Task<List <Link>> GetCompanyLinks (string company, string product)
    {
        using var connection = _dbConnection.CreateConnection();

        string sql = "SELECT * FROM links WHERE companyName = @companyName AND productName = @productName" ;
        var links = await connection.QueryAsync<Link>(sql, new { companyName = company, productName = product });

        return links.ToList();
    }

    public async Task<string> ApproveCompany(int companyId)
{
    using var connection = _dbConnection.CreateConnection();

    // Update the approval field to 'approved' for the specified company ID
    string sqlUpdate = @"
        UPDATE companies 
        SET Approval = 'approved' 
        WHERE idcompanies = @CompanyId;";

    // Execute the update operation
    int rowsAffected = await connection.ExecuteAsync(sqlUpdate, new { CompanyId = companyId });

    if (rowsAffected == 0)
    {
        return "Company not found or already approved.";
    }

    return $"Company with ID {companyId} approved successfully.";
}
}