const req = require('request');

exports.handler = (event, context, callback) => {
    const baseUrl = 'https://newsapi.org/v2';
    //console.log(event.httpMethod);
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
            const { category, query, checkeverything } = JSON.parse(event.body);
            const newsApiKey = process.env.NEWS_API_KEY || '8658a63780d54f118cd970007d6baf48';
            let usingEverythingRoute = false;
            const params = {
                url: ''
            };

            let route = 'top-headlines';
            if (checkeverything && query) {
                route = 'everything';
                usingEverythingRoute = true;
            }

            const defaultparams = `language=en&sortBy=popularity&apiKey=${newsApiKey}`;
            params.url = `${baseUrl}/${route}?${defaultparams}`;
            if (!usingEverythingRoute) {
                //append country and category, ONLY if not using everything route
                params.url = `${params.url}&country=us`;

                if (category) {
                    params.url = `${params.url}&category=${category}`;
                }
            } else {
                if (query) {
                    params.url = `${params.url}&q=${query}`
                }
            }

            //console.log(params.url);

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
