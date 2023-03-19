const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const uploadController = require('../controllers/upload.controller');
import multer from 'multer';
const upload = multer();



router.get("/", reviewController.readReviews);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);
router.patch("/like-review/:id", reviewController.likeReview);
router.patch("/unlike-review/:id", reviewController.unlikeReview);
router.patch("/dislike-review/:id", reviewController.dislikeReview);
router.patch("/undoDislike-review/:id", reviewController.undoDislikeReview);

// upload
router.post('/uploadReview', upload.single('file'), uploadController.uploadReview);



module.exports = router;
