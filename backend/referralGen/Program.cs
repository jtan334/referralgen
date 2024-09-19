using System.Reflection;
using Microsoft.OpenApi.Models;
using referralGen.SQLRepo; 
using dotenv.net;

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

app.MapGet("/links/{company}", async (string company, LinkRepo linkRepo) =>
{
    var links = await linkRepo.GetCompanyLinks(company);
    return links != null ? Results.Ok(links) : Results.NotFound();
});



    
app.Run();