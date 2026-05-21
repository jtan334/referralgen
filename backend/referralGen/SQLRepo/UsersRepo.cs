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

        public async Task<string> CreateNewUser(Users newUser)
        {
            using var connection = _dbConnection.CreateConnection();

            // Insert user and retrieve the user by the last inserted ID
            string sql = @"
        INSERT INTO users (UID, name) 
        VALUES (@UID, @Name);
        
        SELECT * 
        FROM users 
        WHERE UID = @UID";  // Assuming 'id' is the primary key

            try
            {
                var createNewUser = await connection.QuerySingleOrDefaultAsync<Users>(sql, new
                {
                    newUser.UID,
                    newUser.Name
                });

                if (createNewUser != null)
                {
                    return $"User created successfully: {createNewUser.UID} - {createNewUser.Name}";
                }
                else
                {
                    return "Error: Failed to retrieve the newly created user.";
                }
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return $"Error creating new user: {ex.Message}";
            }
        }

        public async Task<string> DeleteUser(string Uid)
        {
            using var connection = _dbConnection.CreateConnection();

            string deleteLinksSql = "DELETE FROM links WHERE Owner = @UID;";
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

        public async Task<string> AddFreind(string Uid)
        {
            using var connection = _dbConnection.CreateConnection();
            string addFriendSql = "UPDATE users SET friends = array_append(friends, @Uid) WHERE UID = @Uid";
            try
            {
                await connection.ExecuteAsync(addFriendSql, new { Uid });
                return $"Successfully added friend {Uid}";
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding a friend.", ex);
            }
        }

        public async Task<string> RemoveFriend(string Uid)
        {
            using var connection = _dbConnection.CreateConnection();
            string removeFriendSql = "UPDATE users SET friends = array_remove(friends, @Uid) WHERE UID = @Uid";
            try
            {
                await connection.ExecuteAsync(removeFriendSql, new { Uid });
                return $"Successfully removed friend {Uid}";
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while removing a friend.", ex);
            }
        }
        public async Task<string[]> GetFriendsAsync(string userID)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = "SELECT friends FROM users WHERE UID = @UserId";
            var friends = await connection.QuerySingleOrDefaultAsync<string[]>(sql, new { UserId = userID });

            return friends ?? Array.Empty<string>();
        }
        public async Task<List<Link>> GetAllFriendsLinksAsync(string userID)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT l.*
                FROM links l
                JOIN users u ON l.owner = ANY(u.friends)
                WHERE u.UID = @UserId";

            var friendsLinks = await connection.QueryAsync<Link>(sql, new { UserId = userID });

            return friendsLinks.ToList();
        }

        public async Task<string> GetNameByUIDAsync(string userID)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = "SELECT name FROM users WHERE UID = @UserId";
            var name = await connection.QuerySingleOrDefaultAsync<string>(sql, new { UserId = userID });

            return name ?? "Name not found";
        }
    }
}
