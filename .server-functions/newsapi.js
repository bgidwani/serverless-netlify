const req = require('request');

exports.handler = (event, context, callback) => {
    const baseUrl = 'https://newsapi.org/v2';
    const { category } = JSON.parse(event.body);

    const newsApiKey = process.env.NEWS_API_KEY;
    const params = {
        url: ''
    };

    if (!category) {
        params.url = `${baseUrl}/top-headlines?language=en&country=us&apiKey=${newsApiKey}`
    } else {
        params.url = `${baseUrl}/top-headlines?category=${category}&language=en&country=us&apiKey=${newsApiKey}`
    }

    req.get(params, (err, res, body) => {
        if (err) {
            console.log('------ Error ------', err);
            callback('Error occurred', null);
        }
        else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(body)
            });
        }
    })
};
