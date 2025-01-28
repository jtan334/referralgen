using Dapper;
using referralGen.Models;

namespace referralGen.SQLRepo 
{
    public class ReportsRepo
    {
        private readonly DatabaseConnection _dbConnection;

        public ReportsRepo(DatabaseConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        // Add a new report
        public async Task AddReportAsync(string linkId, string reportType, string reporterUid)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                INSERT INTO Reports (LinkId, ReportType, ReporterUid, Timestamp)
                VALUES (@LinkId, @ReportType, @ReporterUid, @Timestamp);";

            await connection.ExecuteAsync(sql, new
            {
                LinkId = linkId,
                ReportType = reportType,
                ReporterUid = reporterUid,
                Timestamp = DateTime.UtcNow
            });
        }

   public async Task<List<Report>> GetAllReportsAsync()
{
    using var connection = _dbConnection.CreateConnection();

    string sql = @"
        SELECT ReporterUid, ReportType, Timestamp
        FROM Reports;";

    var reportData = await connection.QueryAsync<(string ReporterUid, string ReportType, DateTime Timestamp)>(sql);

    var reports = reportData
        .Select(data => new Report(data.ReporterUid, data.ReportType) { Timestamp = data.Timestamp })
        .ToList();

    return reports;
}
        // Get all reports for a specific linkId
        public async Task<Reports> GetReportsAsync(string linkId)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT ReportType, ReporterUid, Timestamp
                FROM Reports
                WHERE LinkId = @LinkId;";

            var reportData = await connection.QueryAsync<(string ReportType, string ReporterUid, DateTime Timestamp)>(
                sql, 
                new { LinkId = linkId }
            );

            var reports = new Reports { LinkId = linkId };
            
            foreach (var (reportType, reporterUid, timestamp) in reportData)
            {
                if (!reports.ReportTypeToReports.TryGetValue(reportType, out var reportList))
                {
                    reportList = [];
                    reports.ReportTypeToReports[reportType] = reportList;
                }
                
                reportList.Add(new Report(reporterUid, reportType) { Timestamp = timestamp });
            }

            return reports;
        }

        // Get reports within a date range
        public async Task<Reports> GetReportsInTimeRangeAsync(string linkId, DateTime startDate, DateTime endDate)
        {
            using var connection = _dbConnection.CreateConnection();

            string sql = @"
                SELECT ReportType, ReporterUid, Timestamp
                FROM Reports
                WHERE LinkId = @LinkId 
                AND Timestamp BETWEEN @StartDate AND @EndDate;";

            var reportData = await connection.QueryAsync<(string ReportType, string ReporterUid, DateTime Timestamp)>(
                sql,
                new { 
                    LinkId = linkId,
                    StartDate = startDate,
                    EndDate = endDate
                }
            );

            var reports = new Reports { LinkId = linkId };
            
            foreach (var (reportType, reporterUid, timestamp) in reportData)
            {
                if (!reports.ReportTypeToReports.TryGetValue(reportType, out var reportList))
                {
                    reportList = [];
                    reports.ReportTypeToReports[reportType] = reportList;
                }
                
                reportList.Add(new Report(reporterUid, reportType) { Timestamp = timestamp });
            }

            return reports;
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