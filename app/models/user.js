var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	first: {type: String},
	last: {type: String},
	email: {type: String, unique: true},
	password: {type: String},
	phone: {type: String},
	mealPlans: {type: [String], default: []},
	dateCreated: {type: Date, default: Date.now}
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
