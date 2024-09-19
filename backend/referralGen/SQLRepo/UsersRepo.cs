using Dapper;
using referralGen.models;

namespace referralGen.SQLRepo
{
    public class UsersRepo
    {
        private readonly DatabaseConnection _dbConnection;

        public UsersRepo(DatabaseConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<List<Link>> GetLinksByUserIDAsync(string userID)
        {
            using (var connection = _dbConnection.CreateConnection())
            {

                string sql = "SELECT * FROM links WHERE user = @UserId";
                var links = await connection.QueryAsync<Link>(sql, new { UserId = userID });
                
                return links.ToList();
            }
        }
    }
}
