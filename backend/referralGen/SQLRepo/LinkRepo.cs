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
        INSERT INTO links (UID, RefLink, Owner, Used, Seen, CompanyName, ProductName, Country, Active, Created, Updated)
        VALUES (@UID, @RefLink, @Owner, @Used, @Seen, @CompanyName, @ProductName, @Country, @Active, @Created, @Updated);";

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
            Active = newLink.Active,
            Created = DateTime.UtcNow,
            Updated = DateTime.UtcNow
        });

        return $"Link created successfully: {newLink.RefLink}";
    }

    public async Task<List<Link>> GetLink(string UID)
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
        Updated = @Updated
    WHERE UID = @UID;";

    int rowsAffected = await connection.ExecuteAsync(updateSql, new
    {
        link.RefLink,
        Updated = DateTime.UtcNow,
        link.UID
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


    public async Task<string> ActivateLink(string UID)
    {

        using var connection = _dbConnection.CreateConnection();
        var activateQuery = "UPDATE links SET active = 1 WHERE UID =@UID";

        try
        {
            var activateLink = await connection.ExecuteAsync(activateQuery, new { UID });
            return $"Successfully activated {UID}";
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while activating the link.", ex);
        }

    }

    public async Task<string> AddSeenAsync(string UID)
    {
        using var connection = _dbConnection.CreateConnection();

        // Check if the link exists
        string checkSql = "SELECT COUNT(*) FROM links WHERE UID = @UID;";
        var exists = await connection.ExecuteScalarAsync<int>(checkSql, new { UID });

        if (exists == 0)
        {
            return "The link does not exist."; // Return error if link is not found
        }

        // Increment the Seen count
        string updateSql = @"
        UPDATE links
        SET Seen = Seen + 1
        WHERE UID = @UID;";

        int rowsAffected = await connection.ExecuteAsync(updateSql, new { UID });

        // Confirm if the Seen count was incremented
        if (rowsAffected > 0)
        {
            return "Seen count updated successfully.";
        }
        else
        {
            return "Failed to update the Seen count.";
        }
    }






}