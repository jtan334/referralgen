namespace referralGen.Models
{
    public class Report
    {
        public string ReporterUid { get; set; }
        public string ReportType { get; set; }
        public DateTime Timestamp { get; set; }

        public Report(string reporterUid, string reportType)
        {
            ReporterUid = reporterUid;
            ReportType = reportType;
            Timestamp = DateTime.UtcNow;
        }
    }

    public class Reports
    {
        required public string LinkId { get; set; }

        // Changed to store Report objects instead of just reporter UIDs
        public Dictionary<string, List<Report>> ReportTypeToReports { get; set; }

        public int NumberReports { get; private set; }

        public Reports()
        {
            ReportTypeToReports = [];
            NumberReports = 0;
        }

        public void AddReport(string reportType, string reporterUid)
        {
            var report = new Report(reporterUid, reportType);

            if (!ReportTypeToReports.TryGetValue(reportType, out List<Report>? value))
            {
                value = [];
                ReportTypeToReports[reportType] = value;
            }

            value.Add(report);
            NumberReports++;
        }

        // New methods for timestamp-based operations
        public IEnumerable<Report> GetReportsByTimeRange(DateTime start, DateTime end)
        {
            return ReportTypeToReports
                .SelectMany(x => x.Value)
                .Where(report => report.Timestamp >= start && report.Timestamp <= end);
        }

        public Dictionary<string, int> GetReportCountsByType()
        {
            return ReportTypeToReports.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Count
            );
        }

        public IEnumerable<IGrouping<DateTime, Report>> GetReportsByDay()
        {
            return ReportTypeToReports
                .SelectMany(x => x.Value)
                .GroupBy(report => report.Timestamp.Date);
        }
    }
}