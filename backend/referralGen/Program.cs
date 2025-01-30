using Microsoft.OpenApi.Models;
using referralGen.SQLRepo; 
using dotenv.net;
using referralGen.models;
using referralGen.Models;

var builder = WebApplication.CreateBuilder(args);

DotEnv.Load(options: new DotEnvOptions(envFilePaths: [".env"]));



builder.Configuration.AddEnvironmentVariables();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "referrallGen API", Description = "Generate referral links and share them", Version = "v1" });
});

string connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection") 
                          ?? throw new InvalidOperationException("Connection string not found in environment variables.");
;

// Register database connection using the connection string
builder.Services.AddSingleton(new DatabaseConnection(connectionString));

builder.Services.AddTransient<UsersRepo>();
builder.Services.AddTransient<CompanyRepo>();
builder.Services.AddTransient<LinkRepo>();
builder.Services.AddTransient<ReportRepo>();


builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

    
var app = builder.Build();

app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowAllOrigins");
    
if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI(c =>
   {
      c.SwaggerEndpoint("/swagger/v1/swagger.json", "ReferralGen API V1");
   });
}

    

app.MapGet("/users/links/{userId}", async (string userId, UsersRepo usersRepo) =>
{
    var links = await usersRepo.GetLinksByUserIDAsync(userId);
    return links != null ? Results.Ok(links) : Results.NotFound();
});

app.MapGet("/company/links/{company}-{product}", async (string company, string product, CompanyRepo companyRepo) =>
{
    var links = await companyRepo.GetCompanyLinks(company, product);
    return links != null ? Results.Ok(links) : Results.NotFound();
});

app.MapGet("/company/", async (CompanyRepo companyRepo) =>
{
    var links = await companyRepo.GetCompanies();
    return links != null ? Results.Ok(links) : Results.NotFound();
});

app.MapPost ("/links/new", async (Link link, LinkRepo linkRepo) =>
{
    var res = await linkRepo.AddNewLink(link);

    if (res != null){
         if (res == "The RefLink is not unique") {
            return Results.BadRequest(res);
        }
        else{
            return Results.Ok(res);
        }
    }
    else {
        return Results.NotFound(new { Message = "Link creation failed." });
    }
});

app.MapPut("/links/edit", async (Link link, LinkRepo linkRepo) =>
{
    // Call the EditLink method to update the link
    var result = await linkRepo.EditLink(link);

    // Check the result and return appropriate HTTP response
    if (result == "Link updated successfully.")
    {
        // If the link was successfully updated, return 200 OK
        return Results.Ok(new { Message = result });
    }
    else if (result == "The link does not exist.")
    {
        // If the link does not exist, return 404 Not Found
        return Results.NotFound(new { Message = result });
    }
    else
    {
        // For any other case, return a 400 Bad Request with the result message
        return Results.BadRequest(new { Message = result });
    }
});

app.MapDelete( "/links/delete/{Id}", async(LinkRepo linkRepo, string Id)=>
{
 try
    {
        var result = await linkRepo.DeleteLink(Id);
        return Results.Ok(result);
    }

    catch (Exception ex)
    {
        // For all other errors, return a 400 Bad Request
        return Results.BadRequest(ex);
    }

});

app.MapPatch ("links/edit/activate", async(LinkRepo linkRepo, string id) =>
{
    try{
        var result = await linkRepo.ActivateLink(id);
        return Results.Ok(result);
    }
    catch(Exception ex)
    {
        return Results.BadRequest(ex);
    }
});

app.MapPatch ("links/update/seen", async(LinkRepo linkRepo,string id) =>
{
    try{
        var result = await linkRepo.AddSeenAsync(id);
        return Results.Ok(result);
    }
    catch(Exception ex)
    {
        return Results.BadRequest(ex);
    }
});

app.MapPatch ("links/update/used", async(LinkRepo linkRepo,string id) =>
{
    try{
        var result = await linkRepo.AddUsedAsync(id);
        return Results.Ok(result);
    }
    catch(Exception ex)
    {
        return Results.BadRequest(ex);
    }
});


app.MapPost ("company/add", async(CompanyRepo companyRepo, Company company)=>
{
       var res = await companyRepo.AddCompany(company);

    if (res != null){
         if (res == "The company and product name is not unique") {
            return Results.BadRequest(res);
        }
        else{
            return Results.Ok(res);
        }
    }
    else {
        return Results.NotFound(new { Message = "Company creation failed." });
    }
});

app.MapPatch("/company/{id}/approve", async (CompanyRepo companyRepo, int id) =>
{
    try
    {
        // Call the repository method to approve the company
        var result = await companyRepo.ApproveCompany(id);

        // Return appropriate responses based on the result
        if (result.Contains("not found"))
        {
            return Results.NotFound(new { message = result });
        }

        return Results.Ok(new { message = result });
    }
    catch (Exception ex)
    {
        // Use Results.Object to return a status code with a response body
        return Results.Problem(detail: ex.Message, statusCode: 500, title: "An error occurred while approving the company.");
    }
});



app.MapPost("users/add", async(UsersRepo usersRepo, Users user)=>
{

    var res = await usersRepo.CreateNewUser(user); 

    if (res != null){
        
            return Results.Ok(res);
    }
    else {
        return Results.BadRequest(new { Message = "User creation failed." });
    }
});

app.MapDelete("users/delete/{userId}", async(UsersRepo usersRepo, string userId) =>
{
    var res = await usersRepo.DeleteUser(userId);

    if (res != null){
        
            return Results.Ok(res);
    }
    else {
        return Results.BadRequest(new { Message = "User deletion failed." });
    }
});

app.MapPut("company/edit", async (CompanyRepo companiesRepo, Company updatedCompany) =>
{

    var result = await companiesRepo.EditCompany(updatedCompany);

    if (result.Contains("successfully"))
    {
        return Results.Ok(new { Message = result });
    }
    else
    {
        return Results.BadRequest(new { Message = result });
    }
});


app.MapGet("reports/get/{linkId}", async (ReportRepo reportsRepo, string linkId) =>
{
    try
    {
        var reports = await reportsRepo.GetReportsAsync(linkId);

        if (reports.Any()) // Check if there are any reports
        {
            return Results.Ok(reports);
        }
        else
        {
            return Results.NotFound(new { Message = "No reports found for the given link ID." });
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Message = "Failed to retrieve reports.", Error = ex.Message });
    }
});

// Removed the leading forward slash
app.MapGet("reports/all", async (ReportRepo reportsRepo) =>
{
    try
    {
        var reports = await reportsRepo.GetAllReportsAsync();

        if (reports.Count != 0) // Check if there are any reports
        {
            return Results.Ok(reports);
        }
        else
        {
            return Results.NotFound(new { Message = "No reports found." });
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Message = "Failed to retrieve reports.", Error = ex.Message });
    }
});

app.MapPost("reports/add", async (ReportRepo reportsRepo, Report report) =>
{
    try
    {
        if (report == null || string.IsNullOrEmpty(report.LinkId) || string.IsNullOrEmpty(report.ReportType) || string.IsNullOrEmpty(report.ReporterUid))
        {
            return Results.BadRequest(new { Message = "Invalid request data." });
        }

        // Set the timestamp to the current time
        report.Timestamp = DateTime.UtcNow;

        await reportsRepo.AddReportAsync(report);
        return Results.Ok(new { Message = "Report added successfully." });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Message = "Failed to add report.", Error = ex.Message });
    }
});

app.MapDelete("reports/delete/{linkId}", async (ReportRepo reportsRepo, string linkId) =>
{
    try
    {
        await reportsRepo.DeleteReportsAsync(linkId);
        return Results.Ok(new { Message = "Reports deleted successfully." });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { Message = "Failed to delete reports.", Error = ex.Message });
    }
});









    
app.Run();