const express = require('express');
const bcrypt = require('bcryptjs');  //lib for encoding in hash
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); //jwt
const mailer = require('../../modules/mailer')

const authConfig = require('../../config/auth.json');

const User = require('../models/user')

const router = express.Router();

//function to generate tokens
function generateToken(params = {}){

    return jwt.sign( params , authConfig.secret, {

        expiresIn: 86400,
    });
}

// route to register user
router.post('/register', async (req, res) => {

    const { email } = req.body;

    try{
        //checking if the email is already registered
        if (await  User.findOne({ email })){
            return res.status(400).send({error: 'User already exists'})
        }

        const user = await User.create(req.body);  //creating new user with the attributes passed in req.body

        user.password = undefined; //making the password undefined so it doesn't come back in response to the request

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    }
    catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})

//route to authenticate/login user
router.post('/authenticate' , async(req, res) => {
    const { email, password } = req.body; //getting the email and password to login

    const user = await  User.findOne({ email }).select('+password');

    //checking if the user exists in the db
    if(!user){
        res.status(400).send({error: 'User not found'});
    }

    //checking if the password provided is correct with the db
    if(! await  bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid Password'});
    }

    user.password = undefined;

    //sending the user and token
    res.send({
        user,
        token: generateToken({ id: user.id })
    });
})

//route forgot_password
router.post('/forgot_password', async (req, res) =>{

    const { email } = req.body; //email from which he wants to recover the password

    try{
        const user = await User.findOne({ email });

        //checking if the email exists in the db
        if(!user)
            return res.status(400).send({ erro: 'user not found'})

        //generating the token
        const token = crypto.randomBytes(20).toString('hex');

        // time for token to expire
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set' : {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        //nodemailer
        mailer.sendMail({
            to: email,
            from: 'marlon@mail.com',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if(err)
                return res.status(400).send({ erro: 'Cannot send forgot password email'})

            return res.send();
        })
    }
    catch (err) {
        res.status(400).send({ error: 'Erro on forgot password, try again'})
    }

});

//route to reset password
router.post('/reset_password', async (req, res) =>{
    const { email, token, password } = req.body;

    try{
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        //checking if the user exists in the db
        if(!user)
            return res.status(400).send({ error: 'user not found'});

        //checking if the tokens are the same
        if(token !== user.passwordResetToken)
            return res.status(400).send({ error: 'token invalid'});

        const now = new Date();

        //checking if the token has expired
        if(now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one'});

        user.password = password;

        await user.save();

        res.send();

    }
    catch (err){
        res.status(400).send({ error: 'Cannot reset password, try again' });
    }

});

module.exports = app => app.use('/auth', router)  //routes prefixed with /auth

