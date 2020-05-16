# Welcome to DevOps @ [Nomad House](https://nomad.house)

## Full Ops/Devops platform for startups and digital nomads

So you're building this great project... Now to get it online fast, easily and cheaply without scrimping on security. The less you have studied dev ops the more likely you will have to compromise on one or more of those points. It's not just independent developers, this is an issue that many startups face as well. **This projects is great for both startups that want to focus on product not infrastructure, and independent developers that have client needs to handle, not aws handles that need pulling.**

It's not as easy as it sounds once you start looking at hosting options and scalability, not to mention the fundamentals of all the underlying systems, protocols and encodings. How about getting an SSL certificate to serve your page over https. That should not be an afterthought on today's internet. This is all without thinking about low latency and global distribution to a world audience? Edge caching much... and more setup to handle. Ugh :nauseated_face: Luckily, we have that covered for you in a battle-tested, production setup. :grinning:

There are tons of companies that are more than happy to take your money to set this up for you and for low traffic websites it can be relatively expensive to host customers on WordPress or Heroku. When first starting, and in many other cases, that is WAY overkill on the wallet. By time you pay them retail hosting cost there will little left for profit as gouging will lead to poor customer satisfaction and high customer retention and acquisition costs (ie you will have a hard time competing with other developers). If your client actually grows the costs will go through the roof. That puts you on a cost plus structure and them out of pocket a LOT of money for hosting (few want you to spend their money for them) or worst doing work for free because there is not enough profit built in to the maintenance costs to offset the time lost by not taking new work from other customers. Hours are a limited resource so focussing on what is important is key.

There are also a lot of developer ergonomics things that big companies do to make life less tough when coding.
After all coding is not easy!! Lots of times these can be out of reach when starting. This niceties are often manifest as scripts or templates and code takes time to write. Again, customers are paying for code why would you want to waste time writing plumbing code (unless you are a devOps nerd like [yours truly](https://www.linkedin.com/in/matthew-keil/)).

In specific im talking about little things like when deploying a new feature. You want to show an existing client this great thing they just bought without a huge amount of personal headache... or funky url? Saying, to this kind soul that is giving you their hard earned money, "hey check out your new feature on... `https://feature-branch.example.com` where `feature-branch` is the git branch you are using. Slick... Smooth... Sexy... awww yea!

Professionalism is key in obtaining and retaining the best clients. After all you strive to be the best freelancer you can, right?

This is where utilizing an understanding of ops and devops becomes super critical. [You are welcome!! :) Feel free to ask me questions if you need a hand.](https://www.linkedin.com/in/matthew-keil/) Getting online quickly without the headaches by simply using `npm run deploy client` to stand a stack, or `npm run deploy client devops` to stand a pipeline that deploys each commit to that same stack. Thats what the big guys do and now you can too. Deploying a feature branch is as easy as...

```bash
git branch -b feature-branch
git add -A
git commit -m "shiny new feature"
npm run deploy
```

And the price tag for that sexiness? \$0.90\month for hosting the domain with less than 100,000 requests a month accross all subdomains. [Yes, really.](https://aws.amazon.com/route53/pricing/) Unless you get to a ton of traffic the front-end hosting and edge caching will most likely fall under the free tier. [Yes, really.](https://aws.amazon.com/s3/pricing/) How about your backend? Ahh, the joys of serverless, and yes, that is probably going to be free for you also if you are low on traffic (less than 1,000,000 request/month). [Yes, really.](https://aws.amazon.com/lambda/pricing/) and more of [Yes, really.](https://aws.amazon.com/api-gateway/pricing/) And the cost for a devops pipeline that lasts less than a month? That is free. [Yes, really.](https://aws.amazon.com/codepipeline/pricing/). And what about that build server to do your pipeline builds? Well you guessed it. If you are doing less than 100min/month of build thats free too. [Yes, really.](https://aws.amazon.com/codebuild/pricing)

Everyone loves FREE. As Oprah says... **You get free hosting! You get free hosting! And you get free hosting! Everyone gets free hosting....**

<img src="../.vuepress/images/oprah-get-approval.gif" width="100%">
