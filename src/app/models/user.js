const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

//defining the db user schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,  //mandatory attribute
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,  //when pulling the users, the password is not to come
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
      type: String,
      select: false
    },
    createdAt: {
        type: Date,
        default: Date.now  //get the date the object is created
    }
})

// before saving the user do this
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);  //encrypting user password

    next()
})

const User = mongoose.model('User', UserSchema);  //defining the schema name

module.exports = User;
