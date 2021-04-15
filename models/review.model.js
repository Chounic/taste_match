const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        reviewerId: {
            type: String, 
            required: true
        }, 
        artist: {
            type: String, 
            required: true, 
            maxlength: 100
        }, 
        album: {
            type: String, 
            required: true, 
            maxlength: 100
        }, 
        title: {
            type: String, 
            maxlength: 100
        }, 
        text: {
            type: String, 
            trim: true, 
            maxlength: 5000
        }, 
        rating: {
            type: Number, 
            required: true, 
            max: 5
        }, 
        picture: {
            type: String, 
            default: './uploads/reviews/default_review_image.png'
        }, 
        likers: {
            type: [String], 
            required: true
        }, 
        dislikers: {
            type: [String], 
            required: true
        }
    }, 
    {
        timestamps: true
    }
); 

module.exports = mongoose.model('review', ReviewSchema);