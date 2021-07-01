import React,{ useEffect, useReducer, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField,Grid,makeStyles,Box,Typography } from '@material-ui/core';
import {CloseOutlined,MonetizationOnOutlined} from '@material-ui/icons';
import DatePickers from './DatePickers';
import { ValidateAddBooking,hasError } from '../function/validate.addBooking';
import ClientApiCall from '../../apiCall/client.api'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dialogTitle:{
    width:'100%',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dialogContent:{
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minHeight: '40vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'column',
    flexWrap :'wrap',
    gap:'2rem'
  }
}));
export default function EditBookings(props) {
  const {open,handleClose,bookingSelected} = props
  const classes = useStyles()
  const getDay = () =>{
    const today = new Date()
    return today.toISOString().split('T')[0]
  }
  const [clientInfo, setclientInfo] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      phone:"",
      identify:"",
      StartAt:"",
      checkOutAt:""
    }
  );
  const fillIn = async () => {
    if (open) {
      var info = await ClientApiCall.getClientInfoById(bookingSelected[0].client)
      setclientInfo({name:info[0].fullname})
      setclientInfo({email:info[0].emailAddress})
      setclientInfo({identify:info[0].identityCardNo})
      setclientInfo({phone:info[0].phoneNo})
      setclientInfo({StartAt:bookingSelected[0].StartAt})
      setclientInfo({checkOutAt:bookingSelected[0].checkOutAt})
      console.log(clientInfo)
    }
  }
  useEffect(()=>{
    fillIn()
  },[open])
  const [error,setError] = useState({phone: '',name:'',identify:'',email:'',StartAt:'',checkOutAt:''})
  const handleSubmit = evt => {
    evt.preventDefault();
    const data = {clientInfo}
    let E = ValidateAddBooking(data)
    if (E.length) setError({...error,[E.key]:E.value})
    else{
      if(!hasError(error)){
        console.log(data)
        //post here
        Object.keys(clientInfo).map((key)=>{
          if (key === 'StartAt' | key === 'checkOutAt'){
            const newValue = getDay()
            setclientInfo({[key]:newValue})
          }
          else{
            setclientInfo({[key]:''})
          }
        })
      }
    }
  };
  const handleInput = async evt => {
    const name = evt.target.name
    setError({...error,[name]:''})
    let newValue = evt.target.value;
    setclientInfo({ [name]: newValue });
  };
  const handleChoose = (e) => {
    const name = e.target.name
    setError({...error,[name]:''})
    const newValue = e.target.value
    if (name==='StartAt'){
      if (new Date(newValue) < new Date()){
        setError({...error,[name]:'Check in must greater than today.'})
      } 
    }
    if (name==='checkOutAt'){
      if (new Date(newValue) < new Date()){
        setError({...error,[name]:'Check in must greater than today.'})
      }
      else if (new Date(clientInfo.StartAt) > new Date(newValue)){
        setError({...error,[name]:'Check out must greater or equal today.'})
      } 
    }
    setclientInfo({ [name]: newValue })
  }
  
  return (
    <div>
      <Dialog
        maxWidth='md'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      {
        bookingSelected.length ?
        <React.Fragment>
            <DialogTitle id="alert-dialog-slide-title">
              <Box className={classes.dialogTitle}>
              <b>Edit Bookings</b>
              </Box>
            </DialogTitle>
            <DialogContent dividers={true} className={classes.dialogContent} >
            <form onSubmit={handleSubmit} className={classes.form} >
              <Grid container spacing={5}>
              <Grid container item xs={12}>
                <Typography variant='h5' >Client's infomation</Typography>
              </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error ={error.phone !== '' ? true : false}
                    label="Phone"
                    id="margin-normal"
                    name="phone"
                    value={clientInfo.phone}
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error={error.email !== '' ? true : false}
                    label="Email"
                    id="margin-normal"
                    name="email"
                    value={clientInfo.email}
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error={error.name !== '' ? true : false}
                    label="Name"
                    id="margin-normal"
                    name="name"
                    value={clientInfo.name}
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error={error.identify !== '' ? true : false}
                    label="Identify"
                    id="margin-normal"
                    name="identify"
                    value={clientInfo.identify}
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error={error.identify !== '' ? true : false}
                    label="Check in"
                    id="margin-normal"
                    name="StartAt"
                    value={clientInfo.StartAt}
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid container item xs={12}>
                  <Typography variant='h5' >Update</Typography>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <DatePickers label={'Check out'} name='checkOutAt' error={error.checkOutAt} handleChoose={handleChoose} selectedDate={clientInfo.checkOutAt} />
                </Grid>
                <Grid container item xs={12} sm={2}>
                  <TextField
                    error={error.identify !== '' ? true : false}
                    label="Room"
                    id="margin-normal"
                    name="room"
                    value='room'
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </form>
            <Box></Box>
            </DialogContent>
        </React.Fragment>
        :
        <React.Fragment>
          <DialogTitle id="alert-dialog-slide-title"><b>No room selected</b></DialogTitle>
          <DialogContent>Please choose a room</DialogContent>
        </React.Fragment>
      }
        <DialogActions>
        <Grid container item xs={12} >
              <Box display='flex' justifyContent='flex-end' width='100%'>
                <Button
                  type="button"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClose}
                >
                Close <CloseOutlined className={classes.rightIcon} />
                </Button>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
                >
                Book <MonetizationOnOutlined className={classes.rightIcon}/>
              </Button>
              </Box>
            </Grid>
        </DialogActions>
      </Dialog>
      </div>
  );
}