const Usermodel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const axios = require('axios');
const { updateErrors } = require('../utils/errors.utils');



module.exports.getAllUsers = async (req, res) => {
    const users = await Usermodel.find({}, {password: 0});
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    Usermodel.findById(req.params.id, {password: 0}, (err, data) => {
        if (!err) {
            return res.send(data);
        } else {
            console.log('ID unknown : '+ err)
        }
    }).select("-password");

}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        let params = {};

        for(let prop in req.body) if(req.body[prop] || req.body[prop] === '') params[prop] = req.body[prop];


            if (params.favArtists) {
                
                    
                    const fav = Object.values(params.favArtists).join(', ');
                    
                    await axios.get(`https://tastedive.com/api/similar?q=${fav}&type=music&k=${process.env.TASTEDIVE_KEY}`).then( res => { 
                        
                        
                        let results = res.data.Similar.Results ;
                        let suggestionsArray = results.map( artist => artist.Name);
                        
                        
                        
                        params.suggestions = suggestionsArray;
                        
                        
                    });

            }
            
console.log(params);

        await Usermodel.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set: params
            }, 
            {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, 
            (err, data) => {
                if (!err) {

                    return res.send(data);
                } 
                if (err) {
                    console.log('pwobleme');
                    const errors = updateErrors(err);
                    return res.status(201).json({ errors });
                    //return res.status(400).send({ message: err });
                }
            }
        )


    } catch (err) {

        //return res.status(400).json({ message: err });
    }

}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await Usermodel.remove({_id: req.params.id});
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}

module.exports.followUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)  ) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {

        // add to following
        await Usermodel.findByIdAndUpdate(
            req.params.id, 
            { $addToSet: { following: req.body.idToFollow }}, 
            { new: true, upsert: true }, 
            (err, data) => {
                if (!err) {
                    res.status(201).json(data);
                } else {
                    return res.status(400).json(err);
                }
            }
        )

        // add to user's followers
        await Usermodel.findByIdAndUpdate(
            req.body.idToFollow, 
            { $addToSet: { followers: req.params.id }}, 
            { new: true, upsert: true }, 
            (err, data) => {
                /*if (!err) {
                    res.status(201).json(data);
                } */
                if (err) {
                    return res.status(400).json(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).json({ message: err});
    }
} 

module.exports.unfollowUser = async (req, res) => {

    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)  ) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {

        // remove from following
        await Usermodel.findByIdAndUpdate(
            req.params.id, 
            { $pull: { following: req.body.idToUnfollow }}, 
            { new: true, upsert: true }, 
            (err, data) => {
                if (!err) {
                    res.status(201).json(data);
                } else {
                    return res.status(400).json(err);
                }
            }
        )

        // remove from user's followers
        await Usermodel.findByIdAndUpdate(
            req.body.idToUnfollow, 
            { $pull: { followers: req.params.id }}, 
            { new: true, upsert: true }, 
            (err, data) => {
                /*if (!err) {
                    res.status(201).json(data);
                } */
                if (err) {
                    return res.status(400).json(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).json({ message: err});
    }

}