const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
video_id:{
    type:String,
    require:true,
    trime:true,
}
,
user_id:{
type:String,
require:true,
}
,
commentinfo:{
    type:String,
    require:true,
},
username:{
    type:String,

},
images:{
    type:String,
    trime:true
}
},{
    timestamps: true,
}
);

module.exports = mongoose.model("Comment" , CommentsSchema);