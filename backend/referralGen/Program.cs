using System.Reflection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<MySqlRepo>(provider =>
    new MySqlRepo(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

    
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



    
app.Run();