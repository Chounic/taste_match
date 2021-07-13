import { GET_UPDATE_ERROR, GET_UPLOAD_ERRORS } from "../actions/user.actions";


const initialState = {userErrors: []};

export default function errorsReducer (state = initialState, action) {

    switch (action.type) {

        case GET_UPLOAD_ERRORS: 
            return {
                userErrors: action.payload
            };
        case GET_UPDATE_ERROR: 
            return {
                userErrors: action.payload
            };
        
        default: 
        return state;
    } 
}
