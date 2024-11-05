const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

userSchema.plugin(passportLocalMongoose); // why plugin passportLocalMongoose? because it automatically implements --> username,password, hashing & salting.

module.exports = mongoose.model("User", userSchema);
