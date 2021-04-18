import axios from 'axios';
import { GET_UPDATE_ERROR, GET_UPLOAD_ERRORS } from './user.actions';


export const GET_REVIEWS = "GET_REVIEWS";
export const LIKE_REVIEW = "LIKE_REVIEW";
export const UNLIKE_REVIEW = "UNLIKE_REVIEW";
export const DISLIKE_REVIEW = "DISLIKE_REVIEW";
export const UNDODISLIKE_REVIEW = "UNDODISLIKE_REVIEW";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";





export const getReviews = () => {
    return (dispatch) => {
        return axios.get(`/api/review`)
        .then( (res) => {
            dispatch({ type: GET_REVIEWS, payload: res.data});
            dispatch({ type: GET_UPDATE_ERROR, payload: ''});
            dispatch({ type: GET_UPLOAD_ERRORS, payload: ''});
        })
        .catch( (err) => console.log(err));
    }
}

export const likeReview = (reviewId, likerId) => {
    return (dispatch) => {
        return axios.patch(`/api/review/like-review/${reviewId}`, {id: likerId})
        .then( res => {
            
            dispatch({ type: LIKE_REVIEW, payload: {reviewId, likerId} })
        })
        .catch( (err) => console.log(err));
    }
}

export const unlikeReview = (reviewId, likerId) => {
    return (dispatch) => {
        return axios.patch(`/api/review/unlike-review/${reviewId}`, {id: likerId})
        .then( res => {
            
            dispatch({ type: UNLIKE_REVIEW, payload: {reviewId, likerId} })
        })
        .catch( (err) => console.log(err));
    }
}

export const dislikeReview = (reviewId, dislikerId) => {
    return (dispatch) => {
        return axios.patch(`/api/review/dislike-review/${reviewId}`, {id: dislikerId})
        .then( res => {
            
            dispatch({ type: DISLIKE_REVIEW, payload: {reviewId, dislikerId} })
        })
        .catch( (err) => console.log(err));
    }
}

export const undoDislikeReview = (reviewId, dislikerId) => {
    return (dispatch) => {
        return axios.patch(`$/api/review/undoDislike-review/${reviewId}`, {id: dislikerId})
        .then( res => {
            
            dispatch({ type: UNDODISLIKE_REVIEW, payload: {reviewId, dislikerId} })
        })
        .catch( (err) => console.log(err));
    }
}


export const createReview = (reviewerId, data) => {

    const params = Object.assign(data, {reviewerId});
    console.log(params);
    return (dispatch) => {
        return axios.post(`/api/review/`, params)
        .then( res => {

            console.log(res);
        })
        .catch( (err) => console.log(err));
    }
}


export const updateReview = (review) => {

    return (dispatch) => {
        return axios.put(`/api/review/${review._id}`, review)
        .then( res => {

            //console.log(review);
            dispatch({ type: UPDATE_REVIEW, payload: review})
        })
        .catch( (err) => console.log(err));
    }
}


export const deleteReview = (reviewId) => {

    return (dispatch) => {
        return axios.delete(`/api/review/${reviewId}`)
        .then( res => {

            dispatch({ type: DELETE_REVIEW, payload: reviewId })
        })
    }

}