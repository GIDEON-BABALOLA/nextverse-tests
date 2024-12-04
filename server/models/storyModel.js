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
            type: Number,
            required: true
        },
        seconds: {
            type: Number,
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
                return p.length <= 3; //Setting The Maximum Length Of The Array Here
            },
            message: props => `The array exceeds the maximum allowed length (2).`
        }
    },
    comments : [commentSchema],
    likes : [likeSchema],
    bookmarks : [bookmarkSchema],
    views : [viewsSchema],
    totalLikes : {
    type : Number,
    default : 0
    },
    totalComments : {
    type : Number,
    default : 0
    },
    totalViews : {
        type : Number,
        default : 0
    },
    totalBookmarks : {
        type : Number,
        default : 0
    }
}, {
    timestamps : true,
    autoIndex: false
});
storySchema.methods.addViews = async function (comment, userId) {
    this.comments.unshift({ comment, commentBy: userId });
    this.totalComments = this.comments.length;
    await this.save();
    return this;
};

storySchema.methods.addComment = async function (comment, userId) {
    this.comments.unshift({ comment, commentBy: userId });
    this.totalComments = this.comments.length;
    await this.save();
    return this;
};

storySchema.methods.removeComment = async function (commentId, userId) {
    const index = this.comments.findIndex(
        comment => comment._id.toString() === commentId.toString() &&
                   comment.commentBy.toString() === userId.toString()
    );
    if (index > -1) {
        this.comments.splice(index, 1);
        await this.save();
    }
    return this;
};


storySchema.methods.addBookmark = async function (userId) {
    if (!this.bookmarks.some(bookmark => bookmark.bookmarkBy.toString() === userId.toString())) { //.some works just like .find
        this.bookmarks.unshift({ bookmarkBy: userId });
        this.totalBookmarks = this.bookmarks.length;
        await this.save();
    }
    return this;
};
storySchema.methods.removeBookmark = async function(userId){
    const initialLength = this.bookmarks.length;
    this.bookmarks = this.bookmarks.filter(
        bookmark => bookmark.bookmarkBy.toString() !== userId.toString()
    );

    // If the length has changed, it means a bookmark was removed
    if (this.bookmarks.length !== initialLength) {
        this.totalBookmarks = this.bookmarks.length;
        await this.save();
    }
    
    return this;
}


storySchema.methods.addLike = async function (userId) {
    if (!this.likes.some(like => like.likedBy.toString() === userId.toString())) { //.some works just like .find
        this.likes.unshift({ likedBy: userId });
        this.totalLikes = this.likes.length;
        await this.save();
    }
    return this;
};
storySchema.methods.removeLike = async function (userId) {
    const initialLength = this.likes.length;
    this.likes = this.likes.filter(
    likes => likes.likedBy.toString() !== userId.toString()
    );
    // If the length has changed, it means a Like was removed
    if (this.likes.length !== initialLength) {
        this.totalLikes = this.likes.length;
        await this.save();
    }
    return this;
};



//Export the model
module.exports = mongoose.model('Story', storySchema);