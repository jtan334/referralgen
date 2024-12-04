namespace referralGen.Models
{
    public class Reports
    {
        required public string LinkId { get; set; }

        public Dictionary<string, List<string>> ReportTypeToReporters { get; set; }

        public int NumberReports { get; private set; } // Private setter to prevent external manipulation

        public Reports()
        {
            ReportTypeToReporters = new Dictionary<string, List<string>>();
            NumberReports = 0;
        }

        // Method to add a report
        public void AddReport(string reportType, string reporterUid)
        {
            if (!ReportTypeToReporters.ContainsKey(reportType))
            {
                ReportTypeToReporters[reportType] = new List<string>();
            }

            ReportTypeToReporters[reportType].Add(reporterUid);
            NumberReports++; // Update count whenever a new report is added
        }
    }
}
