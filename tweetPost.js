const { twitterClient } = require("./twitterClient")
const { createPost } = require('./createPost');
const tweetPost = async () => {
    try {
        let post = await createPost();
        let tweetResponse = await twitterClient.v2.tweet(post);
        return tweetResponse;
    } catch (err) {
        console.log("🚀 ~ tweet ~ err:", err);
        return err;
    }
}

module.exports = { tweetPost };