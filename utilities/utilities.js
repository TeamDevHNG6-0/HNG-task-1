const { parse } = require('querystring');

module.exports = {
    parseBody(req){
        const FORM_URLENCODED = 'application/x-www-form-urlencoded'
        const isUrlencoded = req.headers['content-type'] === FORM_URLENCODED;  
        console.log("req.headers['content-type']", req.headers['content-type'])
        let body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        return new Promise((resolve)=>{
            req.on('end', () => {
                req.body = isUrlencoded ? parse(body) : JSON.parse(body);
                resolve()
            });
        })
    }
}
