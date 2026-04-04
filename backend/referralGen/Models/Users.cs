namespace referralGen.models
{

    public class Users
    {

        required public string UID { get; set; }

        required public string Name { get; set; }

        public string[]? Friends { get; set; }


    }
}