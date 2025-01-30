using Dapper;
using referralGen.Models;

namespace referralGen.SQLRepo
{
    public class ReportRepo
    {
        private readonly DatabaseConnection _dbConnection;

        public ReportRepo(DatabaseConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        // Add a new report
        public async Task AddReportAsync(Report report)
{
    using var connection = _dbConnection.CreateConnection();

    string sql = @"
        INSERT INTO Reports (LinkId, ReportType, ReporterUid, Timestamp)
        VALUES (@LinkId, @ReportType, @ReporterUid, @Timestamp);";

    report.Timestamp = DateTime.UtcNow;
    var parameters = new
    {
        report.LinkId,
        report.ReportType,
        report.ReporterUid,
        report.Timestamp
    };

    await connection.ExecuteAsync(sql, parameters);
}

        // Get all reports
        public async Task<List<Report>> GetAllReportsAsync()
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT LinkId, ReporterUid, ReportType, Timestamp
                FROM Reports;";

            var reportData = await connection.QueryAsync<Report>(sql);

            return [.. reportData];
        }

        // Get all reports for a specific linkId
        public async Task<List<Report>> GetReportsAsync(string linkId)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT LinkId, ReportType, ReporterUid, Timestamp
                FROM Reports
                WHERE LinkId = @LinkId;";

            var reportData = await connection.QueryAsync<Report>(
                sql,
                new { LinkId = linkId }
            );

            return [.. reportData];
        }

        // Get reports within a date range
        public async Task<List<Report>> GetReportsInTimeRangeAsync(string linkId, DateTime startDate, DateTime endDate)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT LinkId, ReportType, ReporterUid, Timestamp
                FROM Reports
                WHERE LinkId = @LinkId 
                AND Timestamp BETWEEN @StartDate AND @EndDate;";

            var reportData = await connection.QueryAsync<Report>(
                sql,
                new
                {
                    LinkId = linkId,
                    StartDate = startDate,
                    EndDate = endDate
                }
            );

            return [.. reportData];
        }

        // Delete all reports for a specific linkId
        public async Task DeleteReportsAsync(string linkId)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                DELETE FROM Reports
                WHERE LinkId = @LinkId;";

            await connection.ExecuteAsync(sql, new { LinkId = linkId });
        }
    }
}