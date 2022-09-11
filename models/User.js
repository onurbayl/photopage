import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = mongoose.Schema({
    username: { type: String, required: [true, 'username zorunlu'], validate: [validator.isAlphanumeric, 'alfanumeric degil'], unique: true },
    email: { type: String, required: [true, 'email zorunlu'], validate: [validator.isEmail, 'geçersiz mail'], unique: true },
    password: { type: String, required: [true, 'password zorunlu'], minLength: [4, 'en az 4 karrakter']},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    followings: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
}, {timestamps: true})//oto oarak created at ve updated at olarak iki alan ekler.


UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, parseInt(process.env.SALT), (err, hash) => {
        user.password = hash;
        
        next();
    })
})



export default mongoose.model('User', UserSchema);