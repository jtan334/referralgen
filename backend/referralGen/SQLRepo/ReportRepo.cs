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
        public async System.Threading.Tasks.Task AddReportAsync(Report report)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                INSERT INTO Reports (LinkId, ReportType, ReporterUid, Timestamp)
                VALUES (@LinkId, @ReportType, @ReporterUid, @Timestamp);";

            await connection.ExecuteAsync(sql, new
            {
                report.LinkId,
                report.ReportType,
                report.ReporterUid,
                report.Timestamp
            });
        }

        // Get all reports
        public async System.Threading.Tasks.Task<System.Collections.Generic.List<Report>> GetAllReportsAsync()
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT LinkId, ReporterUid, ReportType, Timestamp
                FROM Reports;";

            var reportData = await connection.QueryAsync<Report>(sql);

            return new System.Collections.Generic.List<Report>(reportData);
        }

        // Get all reports for a specific linkId
        public async System.Threading.Tasks.Task<System.Collections.Generic.List<Report>> GetReportsAsync(string linkId)
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

            return new System.Collections.Generic.List<Report>(reportData);
        }

        // Get reports within a date range
        public async System.Threading.Tasks.Task<System.Collections.Generic.List<Report>> GetReportsInTimeRangeAsync(string linkId, System.DateTime startDate, System.DateTime endDate)
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

            return new System.Collections.Generic.List<Report>(reportData);
        }

        // Delete all reports for a specific linkId
        public async System.Threading.Tasks.Task DeleteReportsAsync(string linkId)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                DELETE FROM Reports
                WHERE LinkId = @LinkId;";

            await connection.ExecuteAsync(sql, new { LinkId = linkId });
        }
    }
}