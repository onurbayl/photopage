import User from "../models/User.js"
import jwt from "jsonwebtoken"

const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            res.locals.user = null;
            next();
        }
        else{
            jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
                if(error){
                    res.locals.user = null;
                    next();
                }
                else{
                    const user = await User.findById(decodedToken.userid);
                    res.locals.user = user;
                    next();
                }
            })
        }

    } catch (error) {
        res.status(401).json({
            succeed: false,
            error: 'invalid user'
        })
        res.locals.user = null;
    }
}

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if(!token){
            return res.redirect('/login')
        }

        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err){
                return res.redirect('/login')
            }
            next();
        })
        
    } catch (error) {
        res.status(401).json({
            succeed: false,
            error: 'invalid token'
        })
    }
}


export {authenticateToken, checkUser};