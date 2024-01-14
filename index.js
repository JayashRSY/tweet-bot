require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express')
const axios = require('axios');
const { twitterClient } = require("./twitterClient.js")
const CronJob = require("cron").CronJob;

const app = express();
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/create', async (req, res) => {
    const result = await tweet();
    res.json({ result: result });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const getPost = async () => {
    try {
        let quote = '';
        await axios
            .get("https://stoic.tekloon.net/stoic-quote")
            .then(res => {
                quote = res.data.quote;
            })
            .catch(err => console.error(err));
        let post = `🌟 Thought of the Day 🌟

"${quote}"

What's inspiring you today? Share your thoughts! 💭✨
#ThoughtOfTheDay #Inspiration #DailyReflection`;
        return post;
    } catch (err) {
        console.log("🚀 ~ getPost ~ err:", err);
        return err;
    }
};
const tweet = async () => {
    try {
        let post = await getPost();
        let tweetResponse = await twitterClient.v2.tweet(post);
        return tweetResponse;
    } catch (err) {
        console.log("🚀 ~ tweet ~ err:", err);
        return err;
    }
}

const cronTweet = new CronJob("0 20 * * *", async () => {
    tweet();
});

cronTweet.start();