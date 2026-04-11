//this file contains extra things like error classes and other 
// important in Express apps — it saves you from writing try...catch everywhere.
// important in Express apps — it saves you from writing try...catch everywhere.

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(next);
    }
}


module.exports = wrapAsync;