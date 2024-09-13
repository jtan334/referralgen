import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div>
      <div className="hero bg-gradient-to-r from-ymblue via-mpink to-customwhite min-h-screen background-animate">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-7xl font-bold text-ymblue font-sans">
              ReferralGen
            </h1>
            <p className="text-3xl px-4 py-12 text-customwhite ">
              Save money using referral links. <br />
              <br /> Make money sharing them.
            </p>
            <Link href ="#info"  scroll={true}>
            <button className="btn btn-primary text-lg bg-saffron outline-none hover:bg-ymblue hover:text-white">
              <p>How It Works</p>
            </button>
            </Link>
          
          </div>
        </div>
      </div>



      <div id = "info" className="flex w-full justify-center py-11 px-11">
  <div className="flex items-center justify-between w-full max-w-6xl">
    <div className="card bg-ymblue rounded-box grid h-32 w-full md:w-1/2 flex-grow place-items-center text-white text-xl md:text-2xl lg:text-3xl mx-5 p-5">
      Generate Referral Links
    </div>
    <div className="divider divider-horizontal border-gray"></div>
    <div className="card bg-mpink rounded-box grid h-32 w-full md:w-1/2 flex-grow place-items-center text-white text-xl md:text-2xl lg:text-3xl mx-5 p-5">
      Sharing Your Referral Links
    </div>
  </div>
</div>

<div className="flex w-full justify-center px-11">
  <div className="flex items-center justify-between w-full max-w-6xl">
    <div className="card border-ymblue rounded-box grid h-auto w-full md:w-1/2 place-items-center text-black text-lg md:text-xl lg:text-2xl p-5 mx-5">
      <p>
        Signing up for a new product or service? Many companies offer refer a friend bonuses, where the person signing up for the service can receive discounts or credits. 
        <br/><br/>Don't have a friend's link? That's where ReferralGen can help! Look up the company in ReferralGen and find a referral code for the company you are signing up with in seconds.
      </p>
    </div>
    <div className="divider divider-horizontal"></div>
    <div className="card border-mpink rounded-box grid h-auto w-full md:w-1/2 place-items-center text-black text-lg md:text-xl lg:text-2xl p-5 mx-5">
      <p>Businesses pay users who get people to use their referral link for sign ups. Have a lot of them laying around and don't know what to do with them? Upload them to Referralgen
        and turn them into true passive income streams!
      </p>
    </div>
  </div>
</div>

<div className="flex justify-center py-8">
  <div className="text-center  rounded-lg p-5 w-full max-w-4xl mx-5 text-2xl md:text-3xl lg:text-4xl">
    <p className= "text-black font-sans  text-4xl">Sign up for ReferralGen to save and gain money with a click of a button!</p>
  </div>
</div>

<div className="flex justify-center py-8">
 <Link href={`/signup`}>
 <button className="btn btn-primary text-lg bg-saffron outline-none px-9 hover:bg-ymblue hover:text-white">
              <p>Sign Up</p>
    </button>

 </Link> 

</div>

    </div>
  );
};

export default Landing;
