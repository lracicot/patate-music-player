var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

const SourceAccess = new Schema({
    name: { type: String, required: true },
    accessToken: { type: String, required: true },
});

const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    sources: [SourceAccess]
});


module.exports.SourceAccess = mongoose.model('SourceAccess', SourceAccess);
module.exports.User = mongoose.model('User', User);
