const authenticate = require("./authenticate");

module.exports = (request, response, db) => {
    let { url } = request;

    if(url.startsWith("/api/authenticate")){
        authenticate(request, response, db);
    }else{
        response.json(JSON.stringify({ message:"route not found" }), 404);
    }

}