import React,{ useEffect, useReducer, useState } from 'react';
import {TextField,Grid,makeStyles,Box,FormControl,Button,Dialog,DialogActions,DialogTitle,DialogContent,Slide,Select } from '@material-ui/core';
import {CloseOutlined,MonetizationOnOutlined,BackspaceOutlined} from '@material-ui/icons';
import DatePickers from './DatePickers';
import { ValidateAddBooking,hasError,completeBookData } from '../function/validate.Booking';
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
export default function SearchRoom(props) {
    const {open,handleClose} = props
    const classes = useStyles()
    const [floor,setFloor]  = useState()
    const [number,setNumber]  = useState()
    const clearAll = () =>{
        setFloor('')
        setNumber('')
    }
    useEffect(()=>{
        clearAll()
    },[open])
    const handleSubmit = async evt => {
        evt.preventDefault();
        
        
    };
    const handleChange = (e) => {
        if (e.target.id === 'select-floor'){
          setFloor(e.target.value)
        }
        if (e.target.id === 'select-number'){
          setNumber(e.target.value)
        }
    };
  
  return (
    <div>
      <Dialog maxWidth='md' open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">
              <Box className={classes.dialogTitle}>
                <b>Find room</b>
                <Button variant="outlined" color="secondary" onClick={clearAll} >Clear&nbsp;&nbsp;<BackspaceOutlined/></Button>
              </Box>
            </DialogTitle>
              <DialogContent dividers={true} className={classes.dialogContent} >
                  <Grid container spacing={5}>
                    <Grid container item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-floor">Floor</InputLabel>
                            <Select
                            labelId="select-floor"
                            id="simple-select-number"
                            value={floor}
                            onChange={handleChange}
                            >
                            {
                              [...Array(10).keys()].map((key)=>{
                                return (
                                    <MenuItem value={key+1}>{key+1}</MenuItem>   
                                )
                              })  
                            }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-number">Number</InputLabel>
                            <Select
                            labelId="select-number"
                            id="simple-select-number"
                            value={age}
                            onChange={handleChange}
                            >
                            {
                              [...Array(10).keys()].map((key)=>{
                                return (
                                    <MenuItem value={key+1}>{key+1}</MenuItem>   
                                )
                              })  
                            }
                            </Select>
                        </FormControl>
                    </Grid>
                  </Grid>
              </DialogContent>
        <DialogActions>
            <Grid container item xs={12} >
              <Box display='flex' justifyContent='flex-end' width='100%'>
                <Button type="button" variant="contained" color="secondary" className={classes.button} onClick={handleClose} > 
                  Close <CloseOutlined className={classes.rightIcon} />
                </Button>
                
                <Button type="submit" variant="contained"  color="primary" className={classes.button} onClick={handleSubmit} >
                  Find <MonetizationOnOutlined className={classes.rightIcon}/>
                </Button>
              </Box>
            </Grid>
        </DialogActions>
      </Dialog>
      </div>
  );
}