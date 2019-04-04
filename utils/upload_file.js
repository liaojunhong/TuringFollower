var fs = require('fs');
var path = require('path');
var util = require('util'),
    Stream = require('stream').Stream,
    EventEmitter = require('events').EventEmitter;

// function UploadFile(opts) {
//     opts = opts || {};
//     this.error = null;
//     this.uploadDir = opts.uploadDir;
// }
//
// util.inherits(UploadFile, EventEmitter);
//
// UploadFile.prototype.parse = function (req, cb) {
//     req.on('data',function (chunk) {
//         console.log(chunk)
//
//     })
//
//
//
// };
//
// UploadFile.prototype.write = function (buffer) {
//
//
//
// };
function UploadFile(req) {
    let img_buffer = Buffer.from('10000');
    req.on('data',function (chunk) {
        console.log(chunk);

    });
    req.on('end',function () {



    })
}






