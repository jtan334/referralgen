# ReferralGen

## What it is:
Are you using credit cards, mobile plans, or a financial account offering refer-a-friend programs but don't want to push these links to your network actively? Are you signing up for a service but don't have any friends using it but still 
want to get the bonus for signing up with a referral link?
ReferralGen provides a service for users to share their referral links, these are refer-a-friend type promotions that services and products promote. Think credit cards, mobile phone plans, and many others where the referrer
and referee get service credit or other compensation. All they have to do is sign up, upload their links, and profit! On the other side of the interaction, sign up, search for the company and product, and generate a link to use to sign up!

## How it's made:
ReferralGen uses Next.js with Tailwind.css and Daisy UI for the front end. The backend is using ASP.NET Web API framework and C#. Using SQL for databasing and docker for containerization. The algorithm to decide which links to serve up to the user is a priority queue/min heap that balances
the seen and used rates of the links, if there are problems with the link, it will be flagged for review if there is a discrepancy with the used and seen rates.

## System Design Considerations:
Security and user management are handled with Firebase, with SSO to provide security and efficiency. To prevent SQL injections, user input will be sanitized in the front end and parameterized on the backend. The link format will be manually checked and approved
on my end to prevent phishing attacks and other malicious actions. To have everyones links be shown evenly, my sorting algorithm is to balance it so all links will have an almost equal seen rate and used rates.

