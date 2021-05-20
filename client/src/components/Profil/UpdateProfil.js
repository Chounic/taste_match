import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import LeftNav from '../LeftNav';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { updateProfil } from '../../actions/user.actions';
import { dateParser, isEmpty } from '../../utils/utils';
import { UidContext } from '../AppContext';
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import MyReviews from '../Reviews/MyReviews';





const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),

      }, 
      marginBottom: "5rem"
    }, 
    form: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '100%',
        }, 
        margin: '3rem'
    }, 
    input: {
        fontSize: 15 ,
        fontWeight: 'bold'
      }
  }));



const UpdateProfil = () => {



    const classes = useStyles();

    const uid = useContext(UidContext);

    const userData = useSelector( state => state.userReducer);
    const [data, setData] = useState({});
    const errors = useSelector( state => state.errorsReducer.userErrors);

    useEffect( () => {

        setData(userData);
        
    }, [userData]);

    const dispatch = useDispatch();
    console.log(errors);

    const handleChange = (e) => {


        if ( (e.target.name === "favArtist1") || (e.target.name === "favArtist2") || (e.target.name === "favArtist3") ) {
            
            setData({
                    ...data, 
                    favArtists: {
                        ...data.favArtists, 
                        [e.target.name]: e.target.value
                    }
            });

        } else {

            setData({
                ...data, 
                [e.target.name]: e.target.value
            }); 
        }

        
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        await dispatch(updateProfil(data, userData._id));
        await console.log(errors);
    }

        return (
            <div>

            { uid && <LeftNav /> }
            <div style={{ textAlign: "center", zIndex: '1'}}>
                <h1>Profil de {userData.pseudo}</h1>

                <p>Membre depuis le : {dateParser(userData.createdAt)}</p>

                <div className={classes.root}>
                    <Paper elevation={3}>
                    <h2>Photo de profil</h2>
                    <img src={userData.picture} alt="user-pic" style={{ height: "15rem" }}/>
                    <UploadImg />
                    <div>
                        { !isEmpty(errors.format) && <Typography variant="h5" color="error" paragraph>{errors.format}</Typography> }
                        { !isEmpty(errors.maxSize) && <Typography  variant="h5" color="error" paragraph>{errors.maxSize}</Typography> }
                    </div>
                    
                    </ Paper>
                    <Paper elevation={3} >
                        <form onSubmit={handleSubmit} className={classes.form}  key={userData._id}>


                            <TextField
                            id="outlined-multiline-static"
                            label={<Typography variant="h4" >Description</Typography>} 
                            multiline
                            rows={10} 
                            defaultValue={userData.description} 
                            placeholder="Ecrire une description" 
                            variant="outlined" 
                            name="description" 
                            InputProps={{
                                className: classes.input
                            }} 
                            InputLabelProps={{
                                shrink: true, 
                            }} 
                            onChange={handleChange} 
                            />

                            <TextField 
                            id="outlined-static" 
                            label={<Typography variant="h4">Pseudo</Typography>} 
                            defaultValue={userData.pseudo} 
                            variant="outlined" 
                            name="pseudo" 
                            InputProps={{
                                className: classes.input
                            }} 
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            onChange={handleChange} 
                            />
                            <div>
                            { !isEmpty(errors.pseudo) && <Typography  variant="h5" color="error" paragraph>{errors.pseudo}</Typography> }
                            </div>

                            <Grid style={{ marginBottom: "4rem", marginTop: "3rem"}}>
                            
                                <FormControl component="fieldset">
                                <FormLabel component="legend"><Typography variant="h4" paragraph>Genre</Typography></FormLabel>
                                <RadioGroup aria-label="gender" name="gender" defaultValue={userData.gender ? userData.gender : ''} onChange={handleChange}>
                                <FormControlLabel value="female" control={<Radio />} label={<Typography variant="h5">Femme</Typography>} />
                                <FormControlLabel value="male" control={<Radio />} label={<Typography variant="h5">Homme</Typography>} />
                                <FormControlLabel value="other" control={<Radio />} label={<Typography variant="h5">Autre</Typography>} />
                                </RadioGroup>
                                </FormControl>
                                
                            </Grid>
    
                            <InputLabel><Typography variant="h4" paragraph>Artistes favoris</Typography></InputLabel>
                            <TextField 
                            
                            id="outlined-required" 
                            defaultValue={userData.favArtists && userData.favArtists.favArtist1 ? userData.favArtists.favArtist1 : ""} 
                            variant="outlined" 
                            name="favArtist1" 
                            InputProps={{
                                className: classes.input
                            }} 
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            onChange={handleChange} 
                            />
    
                            <TextField 
                            
                            id="outlined-required" 
                            defaultValue={userData.favArtists && userData.favArtists.favArtist2 ? userData.favArtists.favArtist2 : ""} 
                            variant="outlined" 
                            name="favArtist2" 
                            InputProps={{
                                className: classes.input
                            }} 
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            onChange={handleChange} 
                            />
    
                            <TextField 
                            
                            id="outlined-required" 
                            defaultValue={userData.favArtists && userData.favArtists.favArtist3 ? userData.favArtists.favArtist3 : ""} 
                            variant="outlined" 
                            name="favArtist3" 
                            InputProps={{
                                className: classes.input
                            }} 
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            onChange={handleChange} 
                            />

                            <Button 
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={classes.form}
                            startIcon={<SaveIcon />} 
                            >
                            Enregistrer 
                            </Button>

                        </form>
                    
                    </ Paper>
                    
                    <Grid container xs={12} md={9} lg={8} justify="flex-start">

                        <h1>Mes critiques</h1>
                        <MyReviews />

                    </Grid>
                </div>

            </div>
        </div>
    );

};

export default UpdateProfil;