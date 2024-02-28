import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture : {
        type:String,
        default:"https://www.google.com/imgres?q=image%20placeholder%20images%20for%20profile%20dummy&imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F05%2F42%2F36%2F11%2F360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dprofile%2Bpicture%2Bplaceholder&docid=QV2_4qKyFTtINM&tbnid=BmKCjrJXPWIK2M&vet=12ahUKEwiL8J_swsuEAxU9X_EDHVN2Ae4QM3oECFUQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwiL8J_swsuEAxU9X_EDHVN2Ae4QM3oECFUQAA"
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)
export default User