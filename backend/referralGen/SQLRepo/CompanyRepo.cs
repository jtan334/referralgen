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


    public async Task<string> AddCompany (Company newCompany)
    {
         using var connection = _dbConnection.CreateConnection();

        string checkSql = "SELECT COUNT(*) FROM companies WHERE productName = @productName AND companyName = @companyName;";


        var exists = await connection.ExecuteScalarAsync<int>(checkSql, new { companyName = newCompany.CompanyName, productName= newCompany.ProductName});

        if (exists > 0)
        {
            return "Company and product is not unique";
        }

        string sql = @"
            INSERT INTO companies (CompanyName, ProductName, LinkFormat, Country )
            VALUES (@CompanyName, @ProductName, @Country, @LinkFormat);

            SELECT * FROM companies WHERE idcompanies = LAST_INSERT_ID();"; // MySQL

        var createdCompany = await connection.QuerySingleAsync<Company>(sql, new 
        {
           CompanyName = newCompany.CompanyName,
           ProductName = newCompany.ProductName,
           Country = newCompany.Country,
           LinkFormat = newCompany.LinkFormat
            
        });

        return $"Company and product created successfully: {createdCompany.CompanyName} {createdCompany.ProductName}";
    }

     public async Task<List <Link>> GetCompanyLinks (string company)
    {
        using var connection = _dbConnection.CreateConnection();

        string sql = "SELECT * FROM links WHERE companyName = @companyName";
        var links = await connection.QueryAsync<Link>(sql, new { companyName = company });

        return links.ToList();
    }
}