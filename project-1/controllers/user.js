const User = require('../models/user');

async function handleGetAllUsers(req, res){
     const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}
async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }
        return res.json(user);
}
async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, { last_name: 'Changed' });
        return res.json({ status: 'Success' });
}
async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id);
        return res.json({ status: 'Success' });
}
async function handleCreateUser(req, res){
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender
    ) {
        return res.status(400).json({ status: 'Error', message: 'Please provide all the required fields' });
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender
    })
    return res.status(201).json({ msg: 'Success' , id: result._id })
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}