import { GET_REVIEWS, UNLIKE_REVIEW, LIKE_REVIEW, DISLIKE_REVIEW, UNDODISLIKE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from "../actions/reviews.actions";


const initialState = {};

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.payload;
        case LIKE_REVIEW: 
            return state.map( review => {
                if (review._id === action.payload.reviewId) {

                    return {
                        ...review, 
                        likers: [...review.likers, action.payload.likerId]
                    }
                }
                return review;
            });
        case UNLIKE_REVIEW: 
            return state.map( review => {
                if (review._id === action.payload.reviewId) {

                    return {
                        ...review, 
                        likers: [...review.likers].filter( id => id !== action.payload.likerId)
                    }
                }
                return review;
            });
        case DISLIKE_REVIEW: 
            return state.map( review => {
                if (review._id === action.payload.reviewId) {

                    return {
                        ...review, 
                        dislikers: [...review.dislikers, action.payload.dislikerId]
                    }
                }
                return review;
            });
        case UNDODISLIKE_REVIEW: 
            return state.map( review => {
                if (review._id === action.payload.reviewId) {

                    return {
                        ...review, 
                        dislikers: [...review.dislikers].filter( id => id !== action.payload.dislikerId)
                    }
                }
                return review;
            });
        case UPDATE_REVIEW: 
            return state.map( review => {
                if (review._id === action.payload._id) {

                    return action.payload ;
                }
                return review;
            });
        case DELETE_REVIEW: 
            return state.filter( review => review._id !== action.payload );
              
        default:
            return state;
    }

}