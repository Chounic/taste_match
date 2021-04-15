const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const { updateErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
    try {
        if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg") {
            throw Error("invalid file");
        }
        if (req.file.size > 500000) {
            throw Error('max size');
        }
    } catch (err) {
        const errors = updateErrors(err);
        return res.status(201).json({ errors });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream, 
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId, 
            { $set : { picture: "./uploads/profil/" + fileName }}, 
            { new: true, upsert: true, setDefaultsOnInsert: true}, 
            (err, data) => {
                if (!err) {
                    return res.send(data);
                } else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

module.exports.uploadReview = async (req, res) => {
    try {
        if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg") {
            throw Error("invalid file");
        }
        if (req.file.size > 1000000) {
            throw Error('max size');
        }
    } catch (err) {
        const errors = updateErrors(err)
        return res.status(201).json(errors);
    }

    const fileName = req.body.reviewId + ".jpg";

    await pipeline(
        req.file.stream, 
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/reviews/${fileName}`
        )
    );

    try {
        await UserModel.findByIdAndUpdate(
            req.body.reviewId, 
            { $set : { picture: "./uploads/reviews/" + fileName }}, 
            { new: true, upsert: true, setDefaultsOnInsert: true}, 
            (err, data) => {
                if (!err) {
                    return res.send(data);
                } else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}