const axios = require('axios');

const createPost = async () => {
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

module.exports = { createPost };