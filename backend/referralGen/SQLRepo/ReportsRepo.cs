using Dapper;
using referralGen.Models;

namespace referralGen.SQLRepo
{
    public class ReportsRepo(DatabaseConnection dbConnection)
    {
        private readonly DatabaseConnection _dbConnection = dbConnection;
       

        // Add a new report
        public async Task AddReportAsync(string linkId, string reportType, string reporterUid)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                INSERT INTO Reports (LinkId, ReportType, ReporterUid)
                VALUES (@LinkId, @ReportType, @ReporterUid);";

            await connection.ExecuteAsync(sql, new
            {
                LinkId = linkId,
                ReportType = reportType,
                ReporterUid = reporterUid
            });
        }

        // Get all reports for a specific linkId
        public async Task<Reports> GetReportsAsync(string linkId)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT ReportType, ReporterUid
                FROM Reports
                WHERE LinkId = @LinkId;";

            var reportData = await connection.QueryAsync<(string ReportType, string ReporterUid)>(sql, new { LinkId = linkId });

            var reportTypeToReporters = reportData
                .GroupBy(r => r.ReportType)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(r => r.ReporterUid).ToList()
                );

            return new Reports
            {
                LinkId = linkId,
                ReportTypeToReporters = reportTypeToReporters
            };
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
