import React,{ useEffect, useReducer, useState } from 'react';
import {TextField,Grid,makeStyles,Box,Typography,Button,Dialog,DialogActions,DialogContent,DialogTitle,Slide} from '@material-ui/core';
import {CloseOutlined,BackspaceOutlined,Update} from '@material-ui/icons';
import DatePickers from './DatePickers';
import { ValidateEditBooking,hasError,completeEditData } from '../function/validate.Booking';
import ClientApiCall from '../../apiCall/client.api'
import BookingApiCall from '../../apiCall/booking.api'
import {SuccessEditBooking,FailEditBooking } from "./addBookSuccessAndFail"

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
  },
  center:{
    display: 'flex',
    justifyContent: 'center'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
var initialState = {
  name: "",
  email: "",
  phone:"",
  identify:"",
  check_out_at: "",
  id_rental: ""
}
export default function EditBookings(props) {
  const [openDialogSuccess,setOpenDialogSuccess] =useState(false) 
  const [openDialogFail,setOpenDialogFail] =useState(false) 
  const {open,handleClose,bookingSelected} = props
  const classes = useStyles()
  const [currentClient,setCurrentClient] = useState()
  const [currentBooked,setCurrentBooked] = useState()
  const [error,setError] = useState({phone: '',name:'',identify:'',email:'',check_out_at:'',empty:''})

  const [openConfirm, setOpenConfirm] = useState(false);

  const OpenConfirmModal = () => {
    setOpenConfirm(true);
    var rental = currentBooked.id_rental
    setFormInput({id_rental:rental})
  };

  const CloseConfirmModal = () => {
    setOpenConfirm(false);
  };

  const clearAll = () =>{
    setFormInput({name:''})
    setFormInput({email:''})
    setFormInput({phone:''})
    setFormInput({identify:''})
    setError({phone: '',name:'',identify:'',email:'',check_out_at:''})
  }
  useEffect(()=>{
    clearAll()
    setError({phone: '',name:'',identify:'',email:'',check_out_at:'',empty:''})
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

  },[bookingSelected])

  useEffect(()=>{
    clearAll()
  },[open])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  const handleSubmit = async evt => {
    evt.preventDefault();
    const data = {formInput}
    let E = ValidateEditBooking(data.formInput)
    if (Object.keys(E).length) {
      setError({...error,[E.key]:E.value})
      if(E.key === 'empty'){
        setTimeout(()=>setError({...error,empty:''}), 5000)
      }
    }
  
    else{
      var newdata = completeEditData(data.formInput,currentClient[0],currentBooked.Check_out_at)
      if(!hasError(error)){
        var res = await BookingApiCall.EditBooking(newdata)
        if (res.status === 204){
          console.log('Edit success') // thông báo thành công
          setOpenDialogSuccess(true)
        }
        else if (res.status === 400){
          console.log('edit failed') // thông báo lỗi
          setOpenDialogFail(true)
        }

        setFormInput({...initialState})
      }
    }
    setOpenConfirm(false)
  };
  const handleInput = async evt => {
    const name = evt.target.name
    setError({...error,[name]:''})
    let newValue = evt.target.value;
    if (name==='phone'){
      // nhập quá 10 số hoặc có kí tự, báo lỗi
      if (newValue.length > 10 | !newValue.match(/\d/g)){
        setError({...error,[name]:'Invalid phone number.'})
      } 
      // nhập xong số điện thoại (10 số) -> kiểm tra xem khách hàng đã từng đặt chưa
      if(newValue.length === 10){
        var customer = await ClientApiCall.getClientInfoByPhone(newValue)
        // nếu có thì auto điền những field còn lại
        if (customer.length){
          setFormInput({name:customer[0].fullname})
          setFormInput({email:customer[0].email})
          setFormInput({identify:customer[0].identify})
        }
      }
    }
    if (name==='identify'){
      // nhập quá 9 số hoặc có kí tự, báo lỗi
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
      if (new Date(newValue) < new Date(currentBooked.Start_at)){
        setError({...error,[name]:'Check in must greater than check out.'})
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
          <SuccessEditBooking open={openDialogSuccess} setOpen={setOpenDialogSuccess}></SuccessEditBooking>
            <FailEditBooking open={openDialogFail} setOpen={setOpenDialogFail}></FailEditBooking>
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
                    <Grid container spacing={4}>
                      <Grid container item xs={12} sm={12} className={classes.center}  ><Typography><b>Infomation</b></Typography></Grid>
                      <Grid container item xs={12} sm= {6} className={classes.center} >
                        <Grid container item xs={6} sm={3}><Typography><b>Name:</b></Typography></Grid>
                        <Grid container item xs={6} sm={3}><Typography>{currentClient[0].fullname}</Typography></Grid>
                      </Grid>
                      <Grid container item xs={12} sm= {6} className={classes.center} >
                        <Grid container item xs={6} sm={3}><Typography><b>Phone:</b></Typography></Grid>
                        <Grid container item xs={6} sm={3}><Typography>{currentClient[0].phone}</Typography></Grid>
                      </Grid>
                      <Grid container item xs={12} sm= {6} className={classes.center} >
                        <Grid container item xs={6} sm={3}><Typography><b>Email:</b></Typography></Grid>
                        <Grid container item xs={6} sm={3}><Typography>{currentClient[0].email}</Typography></Grid>
                      </Grid>
                      <Grid container item xs={12} sm= {6}className={classes.center}  >
                        <Grid container item xs={6} sm={3}><Typography><b>Identify:</b></Typography></Grid>
                        <Grid container item xs={6} sm={3}><Typography>{currentClient[0].identify}</Typography></Grid>
                      </Grid>
                      <Grid container item xs={12} sm= {6} className={classes.center} >
                        <Grid container item xs={6} sm={3}><Typography><b>Check in:</b></Typography></Grid>
                        <Grid container item xs={6} sm={3}><Typography>{currentBooked.Start_at}</Typography></Grid>
                      </Grid>
                      <Grid container item xs={12} sm= {6} className={classes.center} >
                        <Grid container item xs={6} sm={3}><Typography><b>Check out:</b></Typography></Grid>
                        <Grid container item xs={6} sm={3}><Typography>{currentBooked.Check_out_at}</Typography></Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                  : null
                }
              </Box>
              <form onSubmit={handleSubmit} className={classes.form} >
                <Grid container spacing={5}>
                    <Grid container item xs={12} sm={12} className={classes.center}  ><Typography><b>Edit</b></Typography></Grid>
                    {/* ------------------------------------------------- */}
                    <Grid container item xs={12} sm={6}>
                      <TextField error ={error.phone !== '' ? true : false}
                        label="Phone"       id="margin-normal-phone"       name="phone"
                        className={classes.textField}     onChange={handleInput}
                        helperText={error.phone}      value={formInput.phone}
                      />
                    </Grid>
                    {/* ------------------------------------------------- */}
                    <Grid container item xs={12} sm={6}>
                      <TextField error={error.email !== '' ? true : false}
                        label="Email"   id="margin-normal-email"    name="email"
                        className={classes.textField}   onChange={handleInput}
                        helperText={error.email}    value={formInput.email}
                      />
                    </Grid>
                    {/* ------------------------------------------------- */}
                    <Grid container item xs={12} sm={6}>
                      <TextField error={error.name !== '' ? true : false}
                        label="Name" id="margin-normal-name" name="name"
                        className={classes.textField} onChange={handleInput}
                        helperText={error.name}  value={formInput.name}
                      />
                    </Grid>
                    {/* ------------------------------------------------- */}
                    <Grid container item xs={12} sm={6}>
                      <TextField  error={error.identify !== '' ? true : false}
                        label="Identify" id="margin-normal-identify"  name="identify"
                        className={classes.textField} onChange={handleInput}
                        helperText={error.identify} value={formInput.identify}
                      />
                    </Grid>
                    {/* ------------------------------------------------- */}
                    <Grid container item xs={12} sm={6}>
                      <DatePickers label={'Check out'} name='check_out_at' error={error.check_out_at} handleChoose={handleChoose} selectedDate={formInput.check_out_at} />
                    </Grid>
                  </Grid>
              </form>
            </DialogContent>
        <DialogActions>
            <Grid container item xs={12} >
              {
                  error.empty !== '' ? <Grid container item xs={12} sm={12} className={classes.center}  ><Typography color='error'><b>{error.empty}</b></Typography></Grid> : null
                }
              <Box display='flex' justifyContent='flex-end' width='100%'>
                {/* ----------------------Close Button--------------------------- */}
                <Button type="button" variant="contained"color="secondary" className={classes.button} onClick={handleClose}> 
                  Close <CloseOutlined className={classes.rightIcon} /> 
                </Button>
                {/* ----------------------Update button--------------------------- */}
                <Button type="submit" variant="contained" color="primary" className={classes.button} /*onClick={handleSubmit}*/ onClick={OpenConfirmModal}>
                  Update <Update className={classes.rightIcon}/>
                </Button>
                  <Dialog  open={openConfirm} onClose={CloseConfirmModal} aria-labelledby="confim-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="confim-dialog-title">Xác nhận thực hiện những thay đổi</DialogTitle>
                    <DialogActions>
                      <Button onClick={CloseConfirmModal} color="primary">
                        Disagree
                      </Button>
                      <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={handleSubmit} >
                        Agree <Update className={classes.rightIcon}/>
                      </Button>
                    </DialogActions>
                  </Dialog>
              </Box>
            </Grid>
        </DialogActions>
      </Dialog>
      </div>
  );
}