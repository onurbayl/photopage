import User from "../models/User.js"
import bcrypt from "bcrypt"


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
            res.status(500).send('doğru');
        })
    } catch (error) {
        
    }
}


export {createUser, loginUser}