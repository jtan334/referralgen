using referralGen.models;
using Dapper;

namespace referralGen.SQLRepo;

public class LinkRepo(DatabaseConnection dbConnection)
{


    private readonly DatabaseConnection _dbConnection = dbConnection;

public async Task<string> AddNewLink(Link newLink)
{
    using var connection = _dbConnection.CreateConnection();

    string checkSql = "SELECT COUNT(*) FROM links WHERE RefLink = @RefLink;";
    
    var exists = await connection.ExecuteScalarAsync<int>(checkSql, new { RefLink = newLink.RefLink });

    if (exists > 0)
    {
        return "The RefLink is not unique.";
    }

    // Generate a new UUID for the UID
    newLink.UID = Guid.NewGuid().ToString(); // Generate UUID

    string sql = @"
        INSERT INTO links (UID, RefLink, Owner, Used, Seen, CompanyName, ProductName, Country, Active)
        VALUES (@UID, @RefLink, @Owner, @Used, @Seen, @CompanyName, @ProductName, @Country, @Active);";

    await connection.ExecuteAsync(sql, new
    {
        UID = newLink.UID,
        RefLink = newLink.RefLink,
        Owner = newLink.Owner,
        Used = newLink.Used,
        Seen = newLink.Seen,
        CompanyName = newLink.CompanyName,
        ProductName = newLink.ProductName,
        Country = newLink.Country,
        Active = newLink.Active
    });

    return $"Link created successfully: {newLink.RefLink}";
}

     public async Task<List<Link>> GetLink(int UID)
        {
        using var connection = _dbConnection.CreateConnection();

        string sql = "SELECT * FROM links WHERE UID = @UID";
        var links = await connection.QueryAsync<Link>(sql, new { UID = UID });

        return links.ToList();
    }

 public async Task<string> EditLink(Link link)
{
        using var connection = _dbConnection.CreateConnection();
        // Check if the link exists
        string checkSql = "SELECT COUNT(*) FROM links WHERE UID = @UID;";
        var exists = await connection.ExecuteScalarAsync<int>(checkSql, new { link.UID });

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
            UID = link.UID 
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
 public async Task<string> DeleteLink(string UID)
    {
        using var connection = _dbConnection.CreateConnection();
        var deleteQuery = "DELETE FROM links WHERE UID = @Uid";

        try
        {
            var rowsAffected = await connection.ExecuteAsync(deleteQuery, new { Uid = UID });

            if (rowsAffected == 0)
            {
                return $"Link ID: {UID} Not Found";
            }
            return $"Successfully deleted link {UID}";
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while deleting the link.", ex);
        }
    }
    

    public async Task <string> ActivateLink (int UID){

         using var connection = _dbConnection.CreateConnection();
         var activateQuery = "UPDATE links SET active = 1 WHERE UID =@UID";

        try{
            var activateLink = await connection.ExecuteAsync(activateQuery, new { UID });
            return $"Successfully activated {UID}";
        }
         catch (Exception ex)
        {
            throw new Exception("An error occurred while activating the link.", ex);
        }

    }






}