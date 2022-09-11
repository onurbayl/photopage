import User from "../models/User.js"
import Photo from "../models/Photo.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const createUser = async (req, res) => {
    try {
        if(req.body.password !== req.body.rePassword){
            return res.status(400).json({password: 'sifreler ayni değil'})
        } 
        const user = await User.create(req.body);
        //res.status(201).redirect('/login') script kontrolden sonra oto location.assign('login') yapıyor.
        res.status(201).json({user:user._id});
    } catch (error) {
        let errors = {};

        
        if(error.code === 11000){
            errors.email = 'mail zaten var';
        }

        if(error.name){
            if(error.name === 'ValidationError'){
                Object.keys(error.errors).forEach(key => {
                    errors[key] = error.errors[key].message;
                })
                
            }
        }

        

        res.status(400).json(errors)
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

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({user: res.locals.user._id});
    const user = await User.findOne({_id: res.locals.user._id}).populate(['followers','followings']);
    res.status(200).render('dashboard', {user, photos, link: 'dashboard'});
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({_id: {$ne: res.locals.user._id}});
        res.status(200).render('users', {users, link: 'users'})
    } catch (error) {
        res.status(500).send('Hata!')
    }
}

const getAUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        const photos = await Photo.find({user: req.params.id});
        const inFollowers = user.followers.some(follower => {
            return follower.equals(res.locals.user._id);
        })
        res.status(200).render('user', {inFollowers, user, photos, link: 'users'})
    } catch (error) {
        res.status(500).send('Hata!')
    }
}

const follow = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate({_id: req.params.id}, {$push:{followers: res.locals.user._id}}, {new:true});
        user = await User.findOneAndUpdate({_id: res.locals.user._id}, {$push:{followings: req.params.id}}, {new:true});
        res.status(200).redirect('back');
    } catch (error) {
        res.status(500).send('Follow API Error');
    }
}

const unfollow = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate({_id: req.params.id}, {$pull:{followers: res.locals.user._id}}, {new:true});
        user = await User.findOneAndUpdate({_id: res.locals.user._id}, {$pull:{followings: req.params.id}}, {new:true});
        res.status(200).redirect('back');
    } catch (error) {
        res.status(500).send('Follow API Error');
    }
}


export {createUser, loginUser, getDashboardPage, getAllUsers, getAUser, follow, unfollow}