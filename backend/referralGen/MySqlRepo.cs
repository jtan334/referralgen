using MySql.Data.MySqlClient;
using System.Data;

public class MySqlRepo
{
    private readonly string _connectionString;

    public MySqlRepo(string connectionString)
    {
        _connectionString = connectionString;
    }

    public DataTable ExecuteQuery(string query)
    {
        using (var connection = new MySqlConnection(_connectionString))
        {
            using (var command = new MySqlCommand(query, connection))
            {
                connection.Open();
                var dataTable = new DataTable();
                using (var dataAdapter = new MySqlDataAdapter(command))
                {
                    dataAdapter.Fill(dataTable);
                }
                return dataTable;
            }
        }
    }
}
