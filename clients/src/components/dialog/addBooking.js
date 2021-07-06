import React,{ useEffect, useReducer, useState } from 'react';
import {TextField,Grid,makeStyles,Box,Table,TableHead,TableBody,TableRow,TableCell,Button,Dialog,DialogActions,DialogTitle,DialogContent,Slide } from '@material-ui/core';
import {CloseOutlined,MonetizationOnOutlined,BackspaceOutlined} from '@material-ui/icons';
import DatePickers from './DatePickers';
import { ValidateAddBooking,hasError,completeBookData } from '../function/validate.Booking';
import ClientApiCall from '../../apiCall/client.api'
import BookingApiCall from '../../apiCall/booking.api';
import {SuccessSnackbars,FailSnackbars } from "./addBookSuccessAndFail"
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
const getDay = () =>{
  var today = new Date()
  today = today.toISOString().split('.')[0]
  return today.slice(0, today.lastIndexOf(':'))
}
export default function AddBookings(props) {
  const {open,handleClose,roomSelected} = props
  const [openDialogSuccess,setOpenDialogSuccess] =useState(false) 
  const [openDialogFail,setOpenDialogFail] =useState(false) 
  const classes = useStyles()
  const initialState = {
    name: "",
    email: "",
    phone:"",
    identify:"",
    room: "",
    start_at: getDay(),
    check_out_at: getDay()
  }
  const [error,setError] = useState({phone: '',name:'',identify:'',email:'',start_at:'',check_out_at:''})
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  const clearAll = () =>{
    setFormInput({name:''})
    setFormInput({email:''})
    setFormInput({phone:''})
    setFormInput({identify:''})
    setError({phone: '',name:'',identify:'',email:'',start_at:'',check_out_at:''})

  }
  useEffect(()=>{
    clearAll()
  },[open])
  const handleSubmit = async evt => {
    evt.preventDefault();
    const data = {formInput}
    let E = ValidateAddBooking(data.formInput)
    if (Object.keys(E).length) setError({...error,[E.key]:E.value})
    else{
      if(!hasError(error)){
        var newdata = completeBookData(data.formInput,roomSelected[0].id_room)
        var res = await BookingApiCall.addBooking(newdata)
        if (res.status === 400){
            // Lỗi bad request thông báo lỗi
            setOpenDialogFail(true)
        }
        if (res.status === 201){
            // Thông báo đặt phòng thành công
            setOpenDialogSuccess(true)
        }
        
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
    if (name==='start_at'){
      if (new Date(newValue) < new Date()){
        setError({...error,[name]:'Check in must greater than today.'})
      } 
    }
    if (name==='check_out_at'){
      if (new Date(newValue) < new Date()){
        setError({...error,[name]:'Check in must greater than today.'})
      }
      else if (new Date(formInput.start_at) > new Date(newValue)){
        setError({...error,[name]:'Check out must greater or equal today.'})
      } 
    }
    setFormInput({ [name]: newValue })
  }
  
  return (
    <div>
      <Dialog maxWidth='md' open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <SuccessSnackbars open={openDialogSuccess} setOpen={setOpenDialogSuccess}></SuccessSnackbars>
            <FailSnackbars open={openDialogFail} setOpen={setOpenDialogFail}></FailSnackbars>
            <DialogTitle id="alert-dialog-slide-title">
              <Box className={classes.dialogTitle}>
                <b>Add Bookings</b>
                <Button variant="outlined" color="secondary" onClick={clearAll} >Clear&nbsp;&nbsp;<BackspaceOutlined/></Button>
              </Box>
            </DialogTitle>
              <DialogContent dividers={true} className={classes.dialogContent} >
                <form onSubmit={handleSubmit} className={classes.form} >
                  <Grid container spacing={5}>
                    <Grid container item xs={12} sm={6}>
                      <TextField error ={error.phone !== '' ? true : false}
                        label="Phone" id="margin-normal" name="phone"
                        value={formInput.phone} className={classes.textField}
                        onChange={handleInput} helperText={error.phone}
                      />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                      <TextField error={error.email !== '' ? true : false}
                        label="Email" id="margin-normal" name="email"
                        value={formInput.email} className={classes.textField}
                        onChange={handleInput} helperText={error.email}
                      />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                      <TextField error={error.name !== '' ? true : false}
                        label="Name" id="margin-normal" name="name" value={formInput.name}
                        className={classes.textField} onChange={handleInput} helperText={error.name}
                      />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                      <TextField error={error.identify !== '' ? true : false}
                        label="Identify" id="margin-normal" name="identify"
                        value={formInput.identify} className={classes.textField}
                        onChange={handleInput} helperText={error.identify}
                      />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                      <DatePickers label={'Check in'} name='start_at' error={error.start_at} handleChoose={handleChoose} selectedDate={formInput.start_at}/>
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                      <DatePickers label={'Check out'} name='check_out_at' error={error.check_out_at} handleChoose={handleChoose} selectedDate={formInput.check_out_at} />
                    </Grid>
                    <Grid container item xs={12} sm={11}>
                      <Table>
                          <TableHead>
                              <TableRow>
                                <TableCell><b>Category</b></TableCell><TableCell><b>Room</b></TableCell><TableCell><b>Floor</b></TableCell><TableCell><b>Price</b></TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              roomSelected.map((row,index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell>{row.Category}</TableCell><TableCell>{row.Number}</TableCell><TableCell>{row.Floor}</TableCell><TableCell>{row.Price}</TableCell>
                                  </TableRow>
                                )
                              })
                            }
                          </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
        <DialogActions>
            <Grid container item xs={12} >
              <Box display='flex' justifyContent='flex-end' width='100%'>
                <Button type="button" variant="contained" color="secondary" className={classes.button} onClick={handleClose} > 
                  Close <CloseOutlined className={classes.rightIcon} />
                </Button>
                
                <Button type="submit" variant="contained"  color="primary" className={classes.button} onClick={handleSubmit} >
                  Book <MonetizationOnOutlined className={classes.rightIcon}/>
                </Button>
              </Box>
            </Grid>
        </DialogActions>
      </Dialog>
      </div>
  );
}