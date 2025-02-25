using referralGen.models;
using Dapper;

namespace referralGen.SQLRepo;

public class LinkRepo(DatabaseConnection dbConnection)
{


    private readonly DatabaseConnection _dbConnection = dbConnection;

   public async Task<string> AddNewLink(Link newLink)
{
    using var connection = _dbConnection.CreateConnection();

    string getRefLinkFormat = "SELECT linkFormat FROM companies WHERE companyName = @CompanyName AND productName = @ProductName AND country = @Country";

    var refLinkFormat = await connection.ExecuteScalarAsync<string>(
        getRefLinkFormat,
        new
        {
            CompanyName = newLink.CompanyName,
            ProductName = newLink.ProductName,
            Country = newLink.Country
        }
    );

    if (string.IsNullOrEmpty(refLinkFormat))
    {
        throw new Exception("Link format not found for the provided inputs.");
    }

    // Clean up the links for comparison
    string cleanRefFormat = CleanUrl(refLinkFormat);
    string cleanUserLink = CleanUrl(newLink.RefLink);

    // Extract base domain and path from reference format
    string refDomain = GetDomainPart(cleanRefFormat);
    string refPath = GetPathPart(cleanRefFormat);

    // Validate domain if user provided one
    string userDomain = GetDomainPart(cleanUserLink);
    if (!string.IsNullOrEmpty(userDomain) && !userDomain.Equals(refDomain, StringComparison.OrdinalIgnoreCase))
    {
        throw new Exception($"Invalid domain. Expected domain: {refDomain}");
    }

    // Extract path from user input, ignoring their domain if present
    string userPath = "";
    if (cleanUserLink.Contains("/"))
    {
        // If the input contains a slash, take everything after the last slash
        userPath = "/" + cleanUserLink.Split('/').Last();
    }
    else
    {
        // If no slash, treat the entire input as the path
        userPath = "/" + cleanUserLink;
    }

    // Construct the final URL
    string finalUrl = refDomain + (refPath.TrimEnd('/') + "/" + userPath.TrimStart('/')).TrimEnd('/');

    // Update the newLink.RefLink with the properly formatted URL
    newLink.RefLink = finalUrl;

    string checkPathSql = @"
        SELECT COUNT(*) 
        FROM links 
        WHERE CompanyName = @CompanyName 
        AND ProductName = @ProductName 
        AND Country = @Country 
        AND RefLink LIKE @PathPattern;";

    var pathExists = await connection.ExecuteScalarAsync<int>(
        checkPathSql,
        new { 
            CompanyName = newLink.CompanyName,
            ProductName = newLink.ProductName,
            Country = newLink.Country,
            PathPattern = $"%{userPath}"
        });

    if (pathExists > 0)
    {
        throw new Exception("This path is already in use. Please provide a unique path.");
    }

    newLink.UID = Guid.NewGuid().ToString();

    string sql = @"
        INSERT INTO links (
            UID, RefLink, Owner, Used, Seen, CompanyName, 
            ProductName, Country, Active, Created, Updated
        )
        VALUES (
            @UID, @RefLink, @Owner, @Used, @Seen, @CompanyName,
            @ProductName, @Country, @Active, @Created, @Updated
        );";

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
private string CleanUrl(string url)
{
    if (string.IsNullOrEmpty(url))
    {
        return "";
    }

    // Remove any protocol prefixes
    url = url.Replace("https://", "")
            .Replace("http://", "")
            .Replace("www.", "");

    // Remove any trailing slashes
    url = url.TrimEnd('/').ToLower();

    return url;
}

private string GetDomainPart(string cleanUrl)
{
    if (string.IsNullOrEmpty(cleanUrl))
    {
        return "";
    }

    // Get everything before the first slash
    int slashIndex = cleanUrl.IndexOf('/');
    return slashIndex < 0 ? cleanUrl : cleanUrl.Substring(0, slashIndex);
}

private string GetPathPart(string cleanUrl)
{
    if (string.IsNullOrEmpty(cleanUrl))
    {
        return "";
    }

    // Get everything after the first slash
    int slashIndex = cleanUrl.IndexOf('/');
    return slashIndex < 0 ? "" : cleanUrl.Substring(slashIndex);
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
        var activateQuery = "UPDATE links SET active = 1 WHERE UID = @UID";

        try
        {
            var rowsAffected = await connection.ExecuteAsync(activateQuery, new { UID });

            if (rowsAffected == 0)
            {
                throw new KeyNotFoundException($"No link found with UID: {UID}");
            }

            return $"Successfully activated {UID}";
        }
        catch (KeyNotFoundException ex)
        {
            // Handle specific case where no matching UID exists
            return $"Activation failed: {ex.Message}";
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while activating the link.", ex);
        }
    }


    public async Task<string> AddSeenAsync(string UID)
{
    using var connection = _dbConnection.CreateConnection();

    // Perform the update and return the affected row count
    string sql = @"
        UPDATE links
        SET Seen = Seen + 1
        WHERE UID = @UID;

        SELECT ROW_COUNT();";

    var rowsAffected = await connection.ExecuteScalarAsync<int>(sql, new { UID });
    return $"Updated seen count for{UID}";
}


    public async Task<string> AddUsedAsync(string UID)
    {
        using var connection = _dbConnection.CreateConnection();

        // Check if the link exists
        string checkSql = "SELECT COUNT(*) FROM links WHERE UID = @UID;";
        var exists = await connection.ExecuteScalarAsync<int>(checkSql, new { UID });

        if (exists == 0)
        {
            return "The link does not exist."; // Return error if link is not found
        }

        // Increment the Used count
        string updateSql = @"
        UPDATE links
        SET Used = Used + 1
        WHERE UID = @UID;";

        int rowsAffected = await connection.ExecuteAsync(updateSql, new { UID });

        // Confirm if the Seen count was incremented
        if (rowsAffected > 0)
        {
            return "Used count updated successfully.";
        }
        else
        {
            return "Failed to update the Used count.";
        }
    }






}