const ReviewModel = require('../models/review.model');
const Usermodel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readReviews = (req, res) => {
    ReviewModel.find((err, data) => {
        if (!err) {
            return res.send(data);
        } else {
            console.log('Error to get data : ' + err)
        }
    }).sort({ createdAt: -1 });
}

module.exports.createReview = async (req, res) => {
    
    const newReview = new ReviewModel({
        reviewerId: req.body.reviewerId, 
        artist: req.body.artist, 
        album: req.body.album, 
        title: req.body.title, 
        rating: req.body.rating, 
        text: req.body.text, 
    });

    try {
        const review = await newReview.save();
        return res.status(201).json(review);
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports.updateReview = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await ReviewModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    artist: req.body.artist, 
                    album: req.body.album, 
                    rating: req.body.rating, 
                    title: req.body.title, 
                    text: req.body.text, 
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err) {
                    return res.send(data);
                }
                if (err) {
                    return res.status(500).send({ message: err });
                }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteReview = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await ReviewModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}


module.exports.likeReview = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await ReviewModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    likers: req.body.id
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                /*if (!err) {
                    return res.send(data);
                } */
                if (err) {
                    return res.status(400).send({ message: err });
                }
            }
        );
        await Usermodel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            (err, data) => {
                if (!err) {
                    return res.send(data);
                } else {
                    return res.status(400).send(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}


module.exports.unlikeReview = async (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await ReviewModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    likers: req.body.id
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                /*if (!err) {
                    return res.send(data);
                } */
                if (err) {
                    return res.status(400).send({ message: err });
                }
            }
        );
        await Usermodel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            (err, data) => {
                if (!err) {
                    return res.send(data);
                } else {
                    return res.status(400).send(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}



module.exports.dislikeReview = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await ReviewModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    dislikers: req.body.id
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                /*if (!err) {
                    return res.send(data);
                } */
                if (err) {
                    return res.status(400).send({ message: err });
                }
            }
        );
        await Usermodel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { dislikes: req.params.id }
            },
            { new: true },
            (err, data) => {
                if (!err) {
                    return res.send(data);
                } else {
                    return res.status(400).send(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}


module.exports.undoDislikeReview = async (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await ReviewModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    dislikers: req.body.id
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                /*if (!err) {
                    return res.send(data);
                } */
                if (err) {
                    return res.status(400).send({ message: err });
                }
            }
        );
        await Usermodel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { dislikes: req.params.id }
            },
            { new: true },
            (err, data) => {
                if (!err) {
                    return res.send(data);
                } else {
                    return res.status(400).send(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}