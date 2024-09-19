namespace referralGen.models
{
 public class Company
 {
    required public string CompanyName {get;set;}

    required public string LinkForamt{get; set;}

    required public string Country {get;set;}

    required public List <Link> Links {get; set;}


 }   
}
