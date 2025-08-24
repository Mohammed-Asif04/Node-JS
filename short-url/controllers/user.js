const User = require('../model/user');
const { v4 : uuidv4 } = require('uuid');
const { setUser, getUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.status(201).json({ message: 'User created successfully' });
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie('uid', sessionID);
    return res.status(200).json({ message: 'User logged in successfully' });
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};