namespace referralGen.Models
{
    public class Report(string linkId, string reporterUid, string reportType)
    {
        public string LinkId { get; set; } = linkId;
        public string ReporterUid { get; set; } = reporterUid;
        public string ReportType { get; set; } = reportType;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}