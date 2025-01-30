namespace referralGen.Models
{
    public class Report
    {
        public required string LinkId { get; set; } 
        public required string ReporterUid { get; set; } 
        public required string ReportType { get; set; } 
        public DateTime Timestamp { get; set; } 
    }
}