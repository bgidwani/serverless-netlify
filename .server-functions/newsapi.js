const req = require('request');

exports.handler = (event, context, callback) => {
    const baseUrl = 'https://newsapi.org/v2';
    console.log(event.httpMethod);
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST'
    };
    switch (event.httpMethod) {
        case 'OPTIONS':
            // To enable CORS
            callback(null, {
                statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
                headers,
                body: 'This was a preflight call!'
            });
            return;
        case 'POST':
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
                        headers,
                        body: JSON.stringify(body)
                    });
                }
            });
            return;
    }

    callback('Internal error occurred - Should not be here', null);
};
