import React,{ useReducer, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField,Grid,makeStyles,Box,Typography,Table,TableHead,TableBody,TableRow,TableCell } from '@material-ui/core';
import {CloseOutlined,MonetizationOnOutlined} from '@material-ui/icons';
import DatePickers from './DatePickers';
import { ValidateAddBooking } from '../function/validate.addBooking';
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
function getRoomFloorBook(listBooked){
    var rooms = []
    for (var item of listBooked){
      rooms.push({
        id : item.id,
        room: item.room,
        floor: item.floor,
        category: item.category
      })
    }
    return rooms
}
export default function AddBookings(props) {
  const {open,handleClose,roomSelected} = props
  const classes = useStyles()
  const roomsBooked = getRoomFloorBook(roomSelected)
  const getDay = () =>{
    const today = new Date()
    return today.toISOString().split('T')[0]
  }
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      phone:"",
      identify:"",
      rooms:{roomsBooked},
      StartAt: getDay(),
      checkOutAt: getDay()
    }
  );
  const [error,setError] = useState([])
  const handleSubmit = evt => {
    evt.preventDefault();
    let data = { formInput };
    let stat = ValidateAddBooking(formInput)
    if (stat[0]){
      console.log(data)
      //call post here
      Object.keys(formInput).map((key)=>{
        if (key === 'StartAt' | key === 'checkOutAt' | key==='rooms'){
          const newValue = getDay()
          setFormInput({[key]:newValue})
        }
        else{
          setFormInput({[key]:''})
        }
      })
    }
    else {
      setError(stat[1])
    }
  };
  const handleInput = evt => {
    setError('')
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };
  const handleChoose = (e) => {
    setError('')
    const name = e.target.name
    const newValue = e.target.value
    setFormInput({ [name]: newValue })
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
        roomSelected.length ?
        <React.Fragment>
            <DialogTitle id="alert-dialog-slide-title"><b>Add Bookings</b></DialogTitle>
            <DialogContent dividers={true} className={classes.dialogContent} >
            <form onSubmit={handleSubmit} className={classes.form} >
              <Grid container spacing={5}>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    id="margin-normal"
                    name="name"
                    value={formInput.name}
                    className={classes.textField}
                    onChange={handleInput}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    id="margin-normal"
                    name="email"
                    value={formInput.email}
                    className={classes.textField}
                    onChange={handleInput}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    id="margin-normal"
                    name="phone"
                    value={formInput.phone}
                    className={classes.textField}
                    onChange={handleInput}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    label="Identify"
                    id="margin-normal"
                    name="identify"
                    value={formInput.identify}
                    className={classes.textField}
                    onChange={handleInput}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <DatePickers label={'Check in'} name='StartAt' handleChoose={handleChoose} selectedDate={formInput.StartAt}/>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <DatePickers label={'Check out'} name='checkOutAt' handleChoose={handleChoose} selectedDate={formInput.checkOutAt} />
                </Grid>
                <Grid container item xs={12} sm={11}>
                  <Table>
                      <TableHead>
                          <TableRow>
                            <TableCell><b>Room</b></TableCell>
                            <TableCell><b>Floor</b></TableCell>
                            <TableCell><b>Category</b></TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                        {roomsBooked.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.room}</TableCell>
                            <TableCell>{row.floor}</TableCell>
                            <TableCell>{row.category}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </form>
            {
              error ? <Typography color='secondary' component='div' >{error}</Typography> : null
            }
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