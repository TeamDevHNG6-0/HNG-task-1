const MongoClient = require('mongodb').MongoClient;

function Db(uri, dbname) {
	var _this = this;
	var options = { useNewUrlParser: true, useUnifiedTopology: true };
	_this.mongoClient = new MongoClient(uri, options);
        
	return new Promise(function(resolve, reject) {
		_this.mongoClient.connect(function(err, client) {
			if(err) reject(err);
			console.log("mongo client successfully connected \n");
			_this.dbConnection = _this.mongoClient.db(dbname);
			resolve(_this);
		});
	});
}

Db.prototype.getAll = function(collectionName) {
    const _this = this;
    return new Promise((resolve, reject)=>{
        _this.dbConnection
        .collection(collectionName).find({})
        .toArray(function(err, arr) {
            if(err) reject(err);
            resolve(arr)
        });
    })
}

Db.prototype.getOne = function(collectionName, filter) {
    const _this = this;
    return new Promise((resolve, reject)=>{
        _this.dbConnection.collection(collectionName).findOne((filter || {}), function(err, result){
            if(err) reject(err);
            resolve(result)
        })
    })
}

Db.prototype.insert = function(collectionName, doc) {
    const _this = this;
    return new Promise((resolve, reject)=>{
        _this.dbConnection.collection(collectionName).insertOne(doc, function(err, result) {
            if(err) reject(err);
            resolve(result)
        });
    })
}

module.exports = Db;