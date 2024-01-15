require("dotenv").config();
const express = require('express');
const { tweetPost } = require("./tweetPost");
const CronJob = require("cron").CronJob;

const app = express();
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/create', async (req, res) => {
    const result = await tweetPost();
    res.json({ result: result });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});



// const cronTweet = new CronJob("0 */3 * * *", async () => {
//     tweet();
// });

// cronTweet.start();