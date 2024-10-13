using Microsoft.OpenApi.Models;
using referralGen.SQLRepo; 
using dotenv.net;
using referralGen.models;

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

app.MapPut ("links/edit/activate", async(LinkRepo linkRepo, int id) =>
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






    
app.Run();