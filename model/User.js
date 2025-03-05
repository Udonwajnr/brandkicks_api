const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    name: { type: String,
         required: true
         },
    email: {
         type: String,
         required: true,
         unique: true
         },
    password: { 
        type: String,
         required: true
     },
    isAdmin: { 
        type: Boolean,
         default: false
        },
    phone:{
        type:String,
    }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User
