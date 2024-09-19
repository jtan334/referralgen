namespace referralGen.models
{
public class Link
    {
    required public string UID{get;set;}

    public int Used {get; set;}

    public int Seen {get; set;}

   required  public string CompanyName {get;set;}

   required  public string Country {get;set;}


   required  public string RefLink {get; set;}

    public Boolean Active {get;set;}

   required  public string Owner {get; set;}



    }

}