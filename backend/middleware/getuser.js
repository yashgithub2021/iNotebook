var jwt = require('jsonwebtoken');
const JWT_TOKEN = 'Yash';


const fetchuser = (req, res, next) => {
    //Get User form JWT token
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Not Authorized" });
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Not Authorized" });

    }
}

module.exports = fetchuser;