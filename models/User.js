import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
}, {timestamps: true})//oto oarak created at ve updated at olarak iki alan ekler.


UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, parseInt(process.env.SALT), (err, hash) => {
        user.password = hash;
        console.log(user.password)
        next();
    })
})



export default mongoose.model('User', UserSchema);