using System.Reflection;
using Microsoft.OpenApi.Models;
using referralGen.SQLRepo; 
using dotenv.net;
using referralGen.models;
using System.Drawing.Printing;

var builder = WebApplication.CreateBuilder(args);


DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { ".env" }));




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


builder.Services.AddEndpointsApiExplorer();



    
var app = builder.Build();

app.UseAuthorization();
app.MapControllers();
    
if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI(c =>
   {
      c.SwaggerEndpoint("/swagger/v1/swagger.json", "ReferralGen API V1");
   });
}

    
app.MapGet("/", () => "Hello World!");

app.MapGet("/users/links/{userId}", async (string userId, UsersRepo usersRepo) =>
{
    var links = await usersRepo.GetLinksByUserIDAsync(userId);
    return links != null ? Results.Ok(links) : Results.NotFound();
});

app.MapGet("/company/{company}", async (string company, CompanyRepo companyRepo) =>
{
    var links = await companyRepo.GetCompanyLinks(company);
    return links != null ? Results.Ok(links) : Results.NotFound();
});

app.MapPost ("/links/new", async (Link link, LinkRepo linkRepo) =>
{
    var res = await linkRepo.AddNewLink(link);

    if (res != null){
         if (res == "The RefLink is not unique") {
            Console.WriteLine("reaches the if");
            return Results.BadRequest(res);
        }
        else{
            Console.WriteLine("reached the else");
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



    
app.Run();