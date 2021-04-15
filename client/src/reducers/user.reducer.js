import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_PSEUDO, UPDATE_DESCRIPTION, UPLOAD_PICTURE, UPDATE_GENDER, UPDATE_FAV_ARTIST1, UPDATE_FAV_ARTIST3, UPDATE_FAV_ARTIST2, UPDATE_SUGGESTIONS } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state, 
                picture: action.payload
            };
        case UPDATE_PSEUDO:
            return {
                ...state, 
                pseudo: action.payload
            };
        case UPDATE_DESCRIPTION: 
            return {
                ...state, 
                description: action.payload
            }; 
        case UPDATE_GENDER: 
        return {
            ...state, 
            gender: action.payload
        };
        case UPDATE_FAV_ARTIST1: 
        return {
            ...state, 
            favArtists: {
                ...state.favArtists, 
                favArtist1: action.payload
            }
        };    
        case UPDATE_FAV_ARTIST2: 
        return {
            ...state, 
            favArtists: {
                ...state.favArtists, 
                favArtist2: action.payload
            }
        };     
        case UPDATE_FAV_ARTIST3: 
        return {
            ...state, 
            favArtists: {
                ...state.favArtists, 
                favArtist3: action.payload
            }
        };  
        case UPDATE_SUGGESTIONS: 
        return {
            ...state, 
            suggestions: action.payload
        };         
        case FOLLOW_USER: 
            return {
                ...state, 
                following: [...state.following, action.payload]
            };
        case UNFOLLOW_USER: 
        return {
            ...state, 
            following: [...state.following].filter( item => item !== action.payload )
        };
        default:
            return state;
    }

}

