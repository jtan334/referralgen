using System.Reflection;
using Microsoft.OpenApi.Models;
using referralGen.SQLRepo; 

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();

builder.Services.AddSingleton(new DatabaseConnection(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient<UsersRepo>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "referrallGen API", Description = "Generate referral links and share them", Version = "v1" });
});



    
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

app.MapGet("/links/{userId}", async (string userId, UsersRepo usersRepo) =>
{
    var links = await usersRepo.GetLinksByUserIDAsync(userId);
    return links != null ? Results.Ok(links) : Results.NotFound();
});



    
app.Run();