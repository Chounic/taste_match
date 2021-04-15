import axios from 'axios';


export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_GENDER = "UPDATE_GENDER";
export const UPDATE_FAV_ARTIST1 = "UPDATE_FAV_ARTIST1";
export const UPDATE_FAV_ARTIST2 = "UPDATE_FAV_ARTIST2";
export const UPDATE_FAV_ARTIST3 = "UPDATE_FAV_ARTIST3";
export const UPDATE_SUGGESTIONS = "UPDATE_SUGGESTIONS";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";


export const GET_UPLOAD_ERRORS = "GET_UPLOAD_ERRORS";
export const GET_UPDATE_ERROR = "GET_UPDATE_ERROR";






export const getUser = (uid) => {
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then( (res) => {
            dispatch({ type: GET_USER, payload: res.data})
        })
        .catch( (err) => console.log(err));
    }
}


export const uploadPicture = (data, uid) => {


    return (dispatch) => {
        return axios.post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
        .then( res => { 
            if (res.data.errors) {

                dispatch({ type: GET_UPLOAD_ERRORS, payload: res.data.errors});
            } else {

                axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
                .then( res => {
                    dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture})
                })
            }
        })
        .catch( (err) => console.log(err));
    }
}


export const updateProfil = (data, uid) => {

    return (dispatch) => {
        return axios.put(`${process.env.REACT_APP_API_URL}api/user/${uid}`, data)
        .then( res => {

            if (res.data.errors) {
                dispatch({ type: GET_UPDATE_ERROR, payload: res.data.errors});
            } else {

                if (data.pseudo) dispatch({ type: UPDATE_PSEUDO, payload: data.pseudo}) ;
                if (data.description) dispatch({ type: UPDATE_DESCRIPTION, payload: data.description}) ;
                if (data.gender) dispatch({ type: UPDATE_GENDER, payload: data.gender}) ;
                if (data.favArtists) {
                    if (data.favArtists.favArtist1) dispatch({ type: UPDATE_FAV_ARTIST1, payload: data.favArtists.favArtist1}) ;
                    if (data.favArtists.favArtist2) dispatch({ type: UPDATE_FAV_ARTIST2, payload: data.favArtists.favArtist2}) ;
                    if (data.favArtists.favArtist3) dispatch({ type: UPDATE_FAV_ARTIST3, payload: data.favArtists.favArtist3}) ;
                }
                if (data.favArtists) dispatch({ type: UPDATE_SUGGESTIONS, payload: res.data.suggestions}) ;
            }
            })
            .catch( (err) => console.log(err));
    }
}


export const followUser = (idToFollow, uid) => {
    return (dispatch) => {
        return axios.patch(`${process.env.REACT_APP_API_URL}api/user/followUser/${uid}`, {idToFollow})
        .then( res => {
                dispatch({ type: FOLLOW_USER, payload: idToFollow })
            })
        .catch( (err) => console.log(err));
    }
}


export const unfollowUser = (idToUnfollow, uid) => {
    return (dispatch) => {
        return axios.patch(`${process.env.REACT_APP_API_URL}api/user/unfollowUser/${uid}`, {idToUnfollow})
        .then( res => {
                dispatch({ type: UNFOLLOW_USER, payload: idToUnfollow })
            })
        .catch( (err) => console.log(err));
    }
}