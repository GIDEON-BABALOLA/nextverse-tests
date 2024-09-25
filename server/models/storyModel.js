const mongoose = require('mongoose'); // Erase if already required

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const likeSchema = new mongoose.Schema({
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});
const viewsSchema = new mongoose.Schema({
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});
const bookmarkSchema = new mongoose.Schema({
    bookmarkBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})
const storySchema = new mongoose.Schema({
    author:{
        type:String,
        required:true,
    },
    avatar : {
        type : String,
        required : true,
    },
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase :true
    },
    estimatedReadingTime : {
        minutes: {
            type: String,
            required: true
        },
        seconds: {
            type: String,
            required: true
        }
    },
    caption:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum : ["fiction", "non-fiction", "romance", "adventure", "memoir", "technology"]
    },
    date : {
        month: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        day : {
            type : String,
            required : true
        }
    },
    userId : {
        type : String,
        required : true
    },
    picture : {
        type: Array,
        required : true,
        validate : {
            validator : function(p){
                return p.length <= 2; //Setting The Maximum Length Of The Array Here
            },
            message: props => `The array exceeds the maximum allowed length (2).`
        }
    },
    comments : [commentSchema],
    likes : [likeSchema],
    bookmarks : [bookmarkSchema],
    views : [viewsSchema],
    totalLikes : {
    type : String,
    default : 0
    },
    totalComments : {
    type : String,
    default : 0
    },
    totalViews : {
        type : String,
        default : 0
    },
    totalBookmarks : {
        type : String,
        default : 0
    }
}, {
    timestamps : true
});

storySchema.methods.addComment = async function (comment, userId) {
    this.comments.push({ comment, commentBy: userId });
    this.totalComments = this.comments.length;
    await this.save();
    return this;
};

storySchema.methods.addLike = async function (userId) {
    if (!this.likes.some(like => like.likedBy.toString() === userId.toString())) { //.some works just like .find
        this.likes.push({ likedBy: userId });
        this.totalLikes = this.likes.length;
        await this.save();
    }
    return this;
};


//Export the model
module.exports = mongoose.model('Story', storySchema);