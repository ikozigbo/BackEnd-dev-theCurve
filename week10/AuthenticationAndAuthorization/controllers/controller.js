const userModel = require('../models/model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signUp = async (req, res)=>{
    try {
        const { username, email, password } = req.body
        const isEmail = await userModel.findOne({ email })
        if(isEmail) {
            res.status(400).json({
                message: `User with this Email: ${email} already Exist.`
            })
        } else {
            const saltedRound = 10;
            const hashPassword = await bcrypt.hash(password, saltedRound)
            const data = {
                username,
                email,
                password: hashPassword
            }
            const user = await userModel.create(data);
            // const user = await new userModel(data)
            // const savedUser = await user.save();
            res.status(200).json({
                message: 'User Signed Up Successfully',
                data: user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const signIn = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const isEmail = await userModel.findOne({email});
        if (!isEmail) {
            res.status(404).json({
                message: `User with this email: ${email} does not exist`
            })
        } else {
            const isPassword = await bcrypt.compare(password, isEmail.password);
            if (!isPassword) {
                res.status(400).json({
                    message: 'Incorrect Password'
                });
            } else {
                // const token = await jwt.sign(
                //     {
                //         username,
                //         email,
                //         // password
                //     },
                //     "mySecret",
                //     {expiresIn: '1h'}
                // )

                const realToken = await genToken(isEmail)
                res.status(200).json({
                    message: 'User login Succesfully',
                    // token: token,
                    token: realToken
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// reuse token
const genToken = async (user)=>{
    const token = await jwt.sign(
        {
            userId: user._id,
            username: user.username,
            email: user.email,
            // password
        },
        "mySecret",
        {expiresIn: '1h'}
    );
    return token;
}



 
module.exports = {signUp, signIn}