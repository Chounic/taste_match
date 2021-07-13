import React, { useContext, useState } from 'react';
import { Button, Dialog, DialogTitle, Grid, makeStyles, Paper, Slide, TextField } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { UidContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { createReview } from '../../actions/reviews.actions';





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(50),
    },
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '90%',
    },
  },
  customizedButton: {
    position: 'absolute',
    width: '3rem',
    height: '3rem',

    '&:hover': {
      backgroundColor: '#eaeaea',
    },
    color: 'gray',
    right: '10%'
  },
  input: {
    fontSize: 13
  }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});






const ReviewForm = () => {



  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  }

  const handleSubmit = (e) => {

    dispatch(createReview(uid, data));
  }



  const classes = useStyles();

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon fontSize="large" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon fontSize="large" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon fontSize="large" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon fontSize="large" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon fontSize="large" />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other} style={{ marginRight: "1rem" }}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };



  return (
    <>
      {uid &&
        <>
          <Button variant="outlined" className="addReviewButton" size="large" style={{ margin: "4rem 4rem 3rem", width: "30%", fontSize: "1.2em", backgroundColor: "#2f3650", color: "white" }} onClick={handleClickOpen}>
            Ajouter une critique
          </Button>

          <Typography align="center" display="block" variant="overline" style={{ fontSize: "1em", fontStyle: "italic", marginLeft: "10px" }}>( Renseignez les infos du profil et consultez les suggestions d'amis qui partagent les mêmes goûts musicaux que vous)</Typography>
        </>
      }


      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >

        <Paper elevation={3} >

          <Typography variant='h4' component="div" paragraph>

            <DialogTitle id="customized-dialog-title" disableTypography={true}>
              Rédigez une critique

              <CloseIcon onClick={handleClose} className={classes.customizedButton} />

            </DialogTitle>
          </Typography>



          <form action="" onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">



            <TextField

              id="outlined-required"
              label={<Typography variant="h4" color="textPrimary" >Artiste</Typography>}

              variant="outlined"
              name="artist"
              onChange={handleChange}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                shrink: true,
              }}

            />

            <TextField

              id="outlined-required 2"
              label={<Typography variant="h4" color="textPrimary" >Album</Typography>}

              variant="outlined"
              name="album"
              onChange={handleChange}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                shrink: true,
              }}

            />

            <Box component="fieldset" mb={3} borderColor="transparent" width="75%">
              <Typography component="legend" variant="h4">Notez l'album</Typography>
              <Rating
                name="rating"
                defaultValue={2}
                onChange={handleChange}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
              />
            </Box>


            <TextField

              id="outlined-required 3"
              label={<Typography variant="h4" color="textPrimary" >Titre de la critique</Typography>}

              variant="outlined"
              name="title"
              onChange={handleChange}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                shrink: true,
              }}

            />



            <TextField
              id="outlined-multiline-static"
              label={<Typography variant="h4" color="textPrimary" >Critique</Typography>}
              multiline
              rows={10}
              placeholder="Décrivez en quelques lignes ce que vous en pensez"
              variant="outlined"
              name="text"
              onChange={handleChange}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                shrink: true,
              }}

            />


            <Typography align="center" >

              <Button
                type="submit"
                variant="contained"
                color="inherit"
                size="large"
                startIcon={<RateReviewIcon />}
                style={{ margin: "3rem" }}
              >
                Enregistrer
              </Button>

            </Typography>

          </form>


        </ Paper>


      </Dialog>
    </>
  );
};

export default ReviewForm;