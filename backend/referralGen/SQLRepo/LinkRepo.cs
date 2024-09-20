using referralGen.models;
using Dapper;

namespace referralGen.SQLRepo;

public class LinkRepo
{


    private readonly DatabaseConnection _dbConnection;

    public LinkRepo(DatabaseConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<string> AddNewLink(Link newLink)
    {
        using (var connection = _dbConnection.CreateConnection())
        {

            string checkSql = "SELECT COUNT(*) FROM links WHERE RefLink = @RefLink;";
            

             var exists = await connection.ExecuteScalarAsync<int>(checkSql, new { RefLink = newLink.RefLink });

        if (exists > 0)
        {   
            return "The RefLink is not unique.";
        }

        string sql = @"
            INSERT INTO links (RefLink, Owner, Used, Seen, CompanyName, ProductName, Country, Active)
            VALUES (@RefLink, @Owner, @Used, @Seen, @CompanyName, @ProductName, @Country, @Active);

            SELECT * FROM links WHERE UID = LAST_INSERT_ID();"; // MySQL

            var createdLink = await connection.QuerySingleAsync<Link>(sql, new
            {
                RefLink = newLink.RefLink,
                Owner = newLink.Owner,
                Used = newLink.Used,
                Seen = newLink.Seen,
                CompanyName = newLink.CompanyName,
                ProductName = newLink.ProductName,
                Country = newLink.Country,
                Active = newLink.Active
            });

            return $"Link created successfully: {createdLink.RefLink}";
        }
    }

     public async Task<List<Link>> GetLink(string UID)
        {
            using (var connection = _dbConnection.CreateConnection())
            {

                string sql = "SELECT * FROM links WHERE UID = @UID";
                var links = await connection.QueryAsync<Link>(sql, new { UID = UID });
                
                return links.ToList();
            }
        }

 public async Task<string> EditLink(Link link)
{
    using (var connection = _dbConnection.CreateConnection())
    {
        // Check if the link exists
        string checkSql = "SELECT COUNT(*) FROM links WHERE UID = @UID;";
        var exists = await connection.ExecuteScalarAsync<int>(checkSql, new { UID = link.UID });

        if (exists == 0)
        {
            return "The link does not exist."; // Return error if link is not found
        }

        // Update the link details
        string updateSql = @"
            UPDATE links
            SET RefLink = @RefLink,
                Owner = @Owner,
                Used = @Used,
                Seen = @Seen,
                CompanyName = @CompanyName,
                ProductName = @ProductName,
                Country = @Country,
                Active = @Active
            WHERE UID = @UID;";

        int rowsAffected = await connection.ExecuteAsync(updateSql, new
        {
            RefLink = link.RefLink,
            Owner = link.Owner,
            Used = link.Used,
            Seen = link.Seen,
            CompanyName = link.CompanyName,
            ProductName = link.ProductName,
            Country = link.Country,
            Active = link.Active,
            UID = link.UID // Make sure to include UID in the update condition
        });

        // Check if any rows were updated
        if (rowsAffected > 0)
        {
            return "Link updated successfully.";
        }
        else
        {
            return "No changes were made to the link.";
        }
    }
}




}