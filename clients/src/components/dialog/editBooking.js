import React,{ useEffect, useReducer, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField,Grid,makeStyles,Box,Typography,TableHead,TableBody,TableRow,TableCell,Divider } from '@material-ui/core';
import {CloseOutlined,MonetizationOnOutlined,BackspaceOutlined} from '@material-ui/icons';
import DatePickers from './DatePickers';
import { ValidateAddBooking,hasError } from '../function/validate.addBooking';
import ClientApiCall from '../../apiCall/client.api'
import BookingApiCall from '../../apiCall/booking.api';
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
var initialState = {
  name: "",
  email: "",
  phone:"",
  identify:"",
  check_out_at: ""
}
export default function EditBookings(props) {
  const {open,handleClose,bookingSelected} = props
  const classes = useStyles()
  const [currentClient,setCurrentClient] = useState()
  const [currentBooked,setCurrentBooked] = useState()

  const clearAll = () =>{
    setFormInput({name:''})
    setFormInput({email:''})
    setFormInput({phone:''})
    setFormInput({identify:''})
  }
  useEffect(()=>{
    clearAll()
    const getCurrentClient= async (phone)=>{
      try{
        var res = await ClientApiCall.getClientInfoByPhone(phone)
        setCurrentClient(res)
      } 
      catch(e){
        console.log(e)
      }
    }
    if (bookingSelected.length){
      const fetchData = async()=>{
        await getCurrentClient(bookingSelected[0].phone)
      }
      setCurrentBooked(bookingSelected[0])
      fetchData()
    }

  },[open,bookingSelected])
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  const [error,setError] = useState({phone: '',name:'',identify:'',email:'',check_out_at:''})
  const handleSubmit = async evt => {
    evt.preventDefault();
    const data = {formInput}
    let E = ValidateAddBooking(data)
    if (E.length) setError({...error,[E.key]:E.value})
    else{
      if(!hasError(error)){
        
        
        setFormInput({...initialState})
      }
    }
  };
  const handleInput = async evt => {
    const name = evt.target.name
    setError({...error,[name]:''})
    let newValue = evt.target.value;
    if (name==='phone'){
      if (newValue.length > 10 | !newValue.match(/\d/g)){
        setError({...error,[name]:'Invalid phone number.'})
      } 
      if(newValue.length === 10){
        var customer = await ClientApiCall.getClientInfoByPhone(newValue)
        if (customer.length){
          setFormInput({name:customer[0].fullname})
          setFormInput({email:customer[0].email})
          setFormInput({identify:customer[0].identify})
        }
      }
    }
    if (name==='identify'){
      if (newValue.length > 9 | !newValue.match(/\d/g)){
        setError({...error,[name]:'Invalid identify.'})
      } 
    }
    setFormInput({ [name]: newValue });
  };
  const handleChoose = (e) => {
    const name = e.target.name
    setError({...error,[name]:''})
    const newValue = e.target.value
    if (name==='check_out_at'){
      if (new Date(newValue) < new Date()){
        setError({...error,[name]:'Check in must greater than today.'})
      }
    }
    setFormInput({ [name]: newValue })
  }
  
  return (
    <div>
      <Dialog
        maxWidth='md' open={open}
        TransitionComponent={Transition} keepMounted
        onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description"
      >
            <DialogTitle id="alert-dialog-slide-title">
              <Box className={classes.dialogTitle}>
                <b>Edit Bookings</b>
                <Button variant="outlined" color="secondary" onClick={clearAll} >Clear&nbsp;&nbsp;<BackspaceOutlined/></Button>
              </Box>
            </DialogTitle>
            <DialogContent dividers={true} className={classes.dialogContent} >
            <Box>
              {
                currentClient ? 
                <React.Fragment>
                  <Typography><b>Infomation</b></Typography>
                  <Grid container spacing={4}>
                    <Grid container item xs={12} sm= {6}>
                      <TextField
                        label="Name"
                        id="margin-normal"
                        className={classes.textField}
                        value={currentClient[0].fullname}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid container item xs={12} sm= {6}>
                      <TextField
                        label="Phone"
                        id="margin-normal"
                        className={classes.textField}
                        value={currentClient[0].phone}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid container item xs={12} sm= {6}>
                      <TextField
                        label="Email"
                        id="margin-normal"
                        className={classes.textField}
                        value={currentClient[0].email}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid container item xs={12} sm= {6}>
                      <TextField
                        label="Identify"
                        id="margin-normal"
                        className={classes.textField}
                        value={currentClient[0].identify}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid container item xs={12} sm= {6}>
                      <TextField
                        label="Check in "
                        id="margin-normal"
                        className={classes.textField}
                        value={currentBooked.Start_at}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid container item xs={12} sm= {6}>
                      <TextField
                        label="Identify"
                        id="margin-normal"
                        className={classes.textField}
                        value={currentBooked.Check_out_at}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
                : null
              }
            </Box>
            <Divider />
            <form onSubmit={handleSubmit} className={classes.form} >
              <Typography>Edit</Typography>
              <Grid container spacing={5}>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error ={error.phone !== '' ? true : false}
                    label="Phone"
                    id="margin-normal"
                    name="phone"
                    className={classes.textField}
                    onChange={handleInput}
                    helperText={error.phone}
                    value={formInput.phone}

                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error={error.email !== '' ? true : false}
                    label="Email"
                    id="margin-normal"
                    name="email"
                    className={classes.textField}
                    onChange={handleInput}
                    helperText={error.email}
                    value={formInput.email}

                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error={error.name !== '' ? true : false}
                    label="Name"
                    id="margin-normal"
                    name="name"
                    className={classes.textField}
                    onChange={handleInput}
                    helperText={error.name}
                    value={formInput.name}

                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    error={error.identify !== '' ? true : false}
                    label="Identify"
                    id="margin-normal"
                    name="identify"
                    className={classes.textField}
                    onChange={handleInput}
                    helperText={error.identify}
                    value={formInput.identify}

                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <DatePickers label={'Check out'} name='check_out_at' error={error.check_out_at} handleChoose={handleChoose} selectedDate={formInput.check_out_at} />
                </Grid>
              </Grid>
            </form>
            <Box></Box>
            </DialogContent>
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
                Update <MonetizationOnOutlined className={classes.rightIcon}/>
              </Button>
              </Box>
            </Grid>
        </DialogActions>
      </Dialog>
      </div>
  );
}