const express = require('express')
const router = express.Router()
const User = require('../model/user')



router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/', async (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json( {message: err.message });
    }
})

router.get('/:id',getUser, (req,res) => {
    res.send(res.user);
})

router.delete('/:id', getUser, async (req,res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "User Deleted"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);

        if (user == null) {
            return res.status(404).json({ message: "User not Found"});
        }

        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message});
    }

  
}
module.exports = router