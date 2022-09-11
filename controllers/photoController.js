import Photo from "../models/Photo.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


const createPhoto = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'photopage'
        }
    )
    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            link: result.secure_url,
            public_id: result.public_id
        });
        fs.unlinkSync(req.files.image.tempFilePath);
        res.status(201).redirect('/users/dashboard')
    } catch (error) {
        res.status(500).json({
            succeed: false,
            error
        })
    }
}

const getAllPhotos = async (req, res) => {
    try {
        if(res.locals.user){
            const photos = await Photo.find({user: {$ne: res.locals.user._id}});
            res.status(200).render('photos', {photos, link: 'photos',});
        }
        else{
            const photos = await Photo.find({});
            res.status(200).render('photos', {photos, link: 'photos',});
        }
    } catch (error) {
        res.status(500).json({
            succeed: false,
            error
        })
    }
}

const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findOne({_id: req.params.id}).populate('user');
        res.status(200).render('photo', {photo, link: 'photos'})
    } catch (error) {
        res.status(500).send('Error');
    }
}

export {createPhoto, getAllPhotos, getAPhoto}