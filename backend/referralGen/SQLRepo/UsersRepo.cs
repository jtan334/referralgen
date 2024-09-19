using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data;
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
                connection.Open(); // Use synchronous Open method

                string sql = "SELECT * FROM links WHERE user = @UserId";
                var links = await connection.QueryAsync<Link>(sql, new { UserId = userID });
                
                return links.ToList();
            }
        }
    }
}
