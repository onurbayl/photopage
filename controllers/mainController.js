import nodemailer from "nodemailer"
import Photo from "../models/Photo.js"
import User from "../models/User.js"

const getIndexPage = async (req, res) => {
    const photos = await Photo.find().sort({uploadedAt: -1}).limit(3);
    const numOfPhotos = await Photo.countDocuments({});
    const numOfUsers = await User.countDocuments({});
    res.render('index', { link: 'index', photos, numOfPhotos, numOfUsers })
}

const getAboutPage = (req, res) => {
    res.render('about', { link: 'about' })
}

const getRegisterPage = (req, res) => {
    try {
        res.status(200).render('register', { link: 'register' })
    } catch (error) {
        res.status(500).send('Error')
    }
}

const getLoginPage = (req, res) => {
    try {
        res.status(200).render('login', { link: 'login' })
    } catch (error) {
        res.status(500).send('error')
    }
}

const getLogOut = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Error');
    }
}

const getContactPage = async (req, res) => {
    try {
        res.status(200).render('contact', { link: 'contact' })
    } catch (error) {
        res.status(500).send('Contact error')
    }
}

const sendEmail = async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
            },
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: process.env.RECEIVER, // list of receivers
            subject: `Mail from ${req.body.name}`, // Subject line
            html: `<p>Name: ${req.body.name} - email: ${req.body.email}</p><p>${req.body.message}</p>`, // html body
        });

        res.status(200).json({
            succeed: true
        });
    } catch (error) {
        res.status(500).json({
            succeed: false
        })
    }
}

export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogOut, getContactPage, sendEmail };