
exports.handler = function (event, context, callback) {
    const { name } = JSON.parse(event.body);

    const newsApiKey = process.env.NEWS_API_KEY;

    console.log('News API Key', newsApiKey);

    return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: `Thanks for visiting ${name}` })
    });
}