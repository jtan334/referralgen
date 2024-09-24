using Dapper;
using referralGen.models;

namespace referralGen.SQLRepo
{
    public class UsersRepo(DatabaseConnection dbConnection)
    {
        private readonly DatabaseConnection _dbConnection = dbConnection;

        public async Task<List<Link>> GetLinksByUserIDAsync(string userID)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = "SELECT * FROM links WHERE owner = @UserId";
            var links = await connection.QueryAsync<Link>(sql, new { UserId = userID });

            return links.ToList();
        }

        public async Task <string> CreateNewUser(Users newUser)
        {
            using var connection = _dbConnection.CreateConnection();
           

            string sql = @"INSERT INTO users (UID, name, links) VALUES (@UID, @Name, @Links);
            SELECT * FROM users WHERE UID = LAST_INSERT_ID();";

            var createNewUser = await connection.QuerySingleOrDefaultAsync<Users>(sql, new 
            { UID = newUser.UID, 
            Name=newUser.Name});
            if (createNewUser != null){
                return  createNewUser.ToString();
            }
            else{
                return "Error creating new user";
            }
            
        }

        public async Task<string> DeleteUser (string Uid)
    {
        using var connection = _dbConnection.CreateConnection();

        string deleteLinksSql = "DELETE FROM links WHERE UID = @UID;";
        await connection.ExecuteAsync(deleteLinksSql, new { UID = Uid });

        var deleteQuery = "DELETE FROM users WHERE UID = @Uid";

        try
        {
            var rowsAffected = await connection.ExecuteAsync(deleteQuery, new { UID = Uid });

            if (rowsAffected == 0)
            {
                return $"User ID: {Uid} Not Found";
            }
            return $"Successfully deleted user {Uid}";
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while deleting the link.", ex);
        }
    }
           
    }
}
