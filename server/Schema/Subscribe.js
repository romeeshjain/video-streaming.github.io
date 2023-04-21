const mongoose = require("mongoose");

const Subscribe = new mongoose.Schema({
    video_id:{
        require:true,
        type:String,
        trime:true,
    },
    user_id:{
        require:true,
        type:String,
        trime:true,
    }

},
{
    timestamps: true,
}

);
module.exports= mongoose.model("subs",Subscribe);