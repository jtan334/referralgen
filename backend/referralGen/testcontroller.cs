using Microsoft.AspNetCore.Mvc;
using System.Data;
using MySql.Data.MySqlClient;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly MySqlRepo _repository;

    public TestController(MySqlRepo repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public IActionResult GetTestData()
    {
        // Simple query to test connection
        string query = "SELECT * FROM  links"; // A simple query that just returns the number 1

       try
        {
            // Execute the query and get the result set
            DataTable result = _repository.ExecuteQuery(query);

            // Convert DataTable to a list of dictionaries
            var dataList = new List<Dictionary<string, object>>();

            foreach (DataRow row in result.Rows)
            {
                var rowDict = new Dictionary<string, object>();

                foreach (DataColumn column in result.Columns)
                {
                    rowDict[column.ColumnName] = row[column];
                }

                dataList.Add(rowDict);
            }

            // Return the data as a JSON response
            return Ok(dataList);
        }
        catch (Exception ex)
        {
            // Return the exception message in case of failure
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
}
