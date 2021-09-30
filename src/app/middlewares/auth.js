const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const {decode} = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //checking if token exists
    if(!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    //separating the token into two parts, Bearer and the hash
    const parts = authHeader.split(' ');

    //checking if the token has two parts
    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error '});

    const [ scheme, token] = parts;

    //checking if the token starts with Bearer
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: ' Token malformatted '});

    //checking if the token is valid
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: ' Token invalid '});

        req.userId = decoded.id;

        return next();

    })
};
