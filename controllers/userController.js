import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const createUser = async (req, res) => {
    try {
        if(req.body.password !== req.body.rePassword){
            return res.status(200).send('sifreler uyusmuyor')
        }
        const user = await User.create(req.body);
        res.status(201).redirect('/login')
    } catch (error) {
        res.status(500).send('Error2')
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(500).send('user yok');
        }
        //let a = await bcrypt.compare(req.body.password, user.password) veya böyle
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(!result){
                return res.status(500).send('şifre yanlış');
            }
            const token = createToken(user._id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})

            res.status(200).redirect('/users/dashboard')
        })
    } catch (error) {
        res.status(500).send('Error2')
    }
}

const createToken = userid => {
    return jwt.sign({userid}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

const getDashboardPage = (req, res) => {
    res.status(200).render('dashboard', {link: 'dashboard'});
}


export {createUser, loginUser, getDashboardPage}