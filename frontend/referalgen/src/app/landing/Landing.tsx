import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="flex-auto">
      <div className="hero bg-gradient-to-r from-ymblue via-mpink to-customwhite min-h-screen background-animate">
        <div className="hero-content text-center">
          <div className="max-w-md mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-ymblue font-sans">
              ReferralGen
            </h1>
            <p className="text-lg md:text-3xl px-4 py-6 md:py-12 text-customwhite">
              Save money using referral links. <br />
              <br /> Make money sharing them.
            </p>
            <Link href="#info" scroll={true}>
              <button className="btn btn-primary text-black text-lg bg-saffron outline-none hover:bg-ymblue hover:text-white">
                <p>How It Works</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        id="info"
        className="flex flex-col items-center justify-center w-full py-6 md:py-11 px-6 md:px-11"
      >
        <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-6xl gap-10">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
            <div className="card bg-ymblue rounded-box text-white text-center text-xl md:text-2xl lg:text-3xl mb-4 p-6 md:p-8 min-h-[7rem] w-full flex items-center justify-center">
              Generate Referral Links
            </div>
            <div className="card border-ymblue rounded-box text-black text-left text-base md:text-xl lg:text-2xl p-5 md:p-7 min-h-[14rem] w-full">
              <p>
                Signing up for a new product or service? Many companies offer
                refer a friend bonuses, where the person signing up for the
                service can receive discounts or credits.
                <br />
                <br />
                Don't have a friend's link? That's where ReferralGen can help!
                Look up the company in ReferralGen and find a referral code for
                the company you are signing up with in seconds.
              </p>
            </div>
          </div>

          <div className="divider md:divider-horizontal"></div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
            <div className="card bg-mpink rounded-box text-white text-center text-xl md:text-2xl lg:text-3xl mb-4 p-6 md:p-8 min-h-[7rem] w-full flex items-center justify-center">
              Sharing Your Referral Links
            </div>
            <div className="card border-mpink rounded-box text-black text-left text-base md:text-xl lg:text-2xl p-5 md:p-7 min-h-[14rem] w-full">
              <p>
                Businesses pay users who get people to use their referral link
                for sign-ups. Have a lot of them laying around and don't know
                what to do with them? Upload them to ReferralGen and turn them
                into true passive income streams!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-6 md:py-8">
        <div className="text-center rounded-lg p-5 w-full max-w-4xl mx-5 text-xl md:text-3xl lg:text-4xl">
          <p className="text-black font-sans text-3xl md:text-4xl">
            Sign up for ReferralGen to save and gain money with a click of a
            button!
          </p>
        </div>
      </div>

      <div className="flex justify-center py-6 md:py-8">
        <Link href={`/signup`}>
          <button className="btn text-black btn-primary text-lg bg-saffron outline-none px-6 md:px-9 hover:bg-ymblue hover:text-white">
            <p>Sign Up</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
