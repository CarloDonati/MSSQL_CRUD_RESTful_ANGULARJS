var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp) { 
    db.executeSql("SELECT * FROM movies", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);

        }
    });
};


 exports.get = function (req, resp, id) {  
    db.executeSql("SELECT *  FROM movies WHERE _id=" + id, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson2(req, resp, data );
        }
    });
};


exports.add = function (req, resp, reqBody) {  
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {//add more validations if necessary
            var sql = "INSERT INTO movies (title, releaseYear, director, genre) VALUES ";
            sql += util.format("('%s', '%s', '%s', '%s') ", data.title, data.releaseYear, data.director, data.genre);
	    console.log(sql);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
    
};

exports.update = function (req, resp, reqBody) {  
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data._id) throw new Error("Id not provided");

            var sql = "UPDATE movies SET ";
            
            var isDataProvided = false;
            if (data._id) { 
                sql += "releaseYear = '" + data.releaseYear + "',";
                isDataProvided = true;
            }
            if (data.title) {
                sql += "title = '" + data.title + "',";
                isDataProvided = true;
            }
            if (data.director) {
                sql += "director = '" + data.director + "',";
                isDataProvided = true;
            }
             if (data.genre) {
                sql += "genre = '" + data.genre + "',";
                isDataProvided = true;
            }
            if (!isDataProvided) throw new Error("No data provided to update");

            sql = sql.slice(0, -1); //remove last comma
            sql += " WHERE _id = " + data._id;
            console.log(sql);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, id) { 
	db.executeSql("DELETE FROM movies WHERE _id=" + id, function (data, err) {
	        if (err) {
	            httpMsgs.show500(req, resp, err);
	        }
	        else {
	            httpMsgs.send200(req, resp);
	        }
    	});
};


 