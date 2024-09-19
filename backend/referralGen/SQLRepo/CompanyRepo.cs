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


    public async Task<List <Link>> AddCompany (string company)
    {
          using (var connection = _dbConnection.CreateConnection())
            {

                string sql = "SELECT * FROM links WHERE companyName = @companyName";
                var links = await connection.QueryAsync<Link>(sql, new { companyName = company });
                
                return links.ToList();
            }
    }
}