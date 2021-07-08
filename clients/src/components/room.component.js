import React,{useState,useEffect} from 'react';
import EnhancedTable from './table/Table'
import {RoomSideBar} from './sidebar.component'
import { Grid ,CircularProgress} from '@material-ui/core';
import {TextField,makeStyles,Box,FormControl,Button,Slide,Select,InputLabel,MenuItem,Paper,Typography } from '@material-ui/core';

import RoomApiCall from '../apiCall/room.api';
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
  flexEnd: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    marginRight: '1rem'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    minWidth: 750,
    padding:'.5rem'
  },
  container:{
    paddingRight :'1rem',
    display: 'flex',
    flexDirection: 'column',
    gap:'1rem'
  }
}));
export default function Rooms(){
    const Headers = ['Category','Floor','Number','Status','Price']
    const [roomRender,setRoomRender] = useState()
    const [selected, setSelected] = useState([]);
    useEffect(() => {
      const dataCalling = async ()  =>{
        try {
            var res = await RoomApiCall.getRoomRender()
            setRoomRender(res)
        } 
        catch (e){
            console.log(e)
        }
    }
    dataCalling()
    clearAll()
    }, [])
    const classes = useStyles()
    const [floor,setFloor]  = useState('')
    const [number,setNumber]  = useState('')
    const [roomInfo,setRoomInfo]  = useState('')
    const [roomInfoE,setRoomInfoE]  = useState('')
    const [openI,setOpenI]  = useState(false)
    const clearAll = () =>{
        setFloor('')
        setNumber('')
        setRoomInfoE('')
    }
    const searchRoom = async evt => {
      clearAll()
      if (floor && number){
        var room = await RoomApiCall.getRoomByFloorNumber(floor,number)
        setRoomInfo(room[0])
      }
      else {
          setRoomInfoE('Thiếu thông tin')
          setTimeout(()=>setRoomInfoE(''), 5000)
        }
      setOpenI(true)
    };
    const handleFloorChange = (e) => {
          setFloor(e.target.value)
    };
    const handleNumberChange = (e) => {
        setNumber(e.target.value)
    };
    const CloseI= ()=>{
      setOpenI(false)
    }
    return (
        <React.Fragment>
          <Grid container item xs={12} sm={2}>
            <RoomSideBar  />
          </Grid>
          <Grid container item xs={12} sm={10} className={classes.container}>
            {
              roomRender ?
              <EnhancedTable data={roomRender} Headers={Headers} tableName='Rooms' selected={selected} setSelected={setSelected} ></EnhancedTable>
              : 
              <CircularProgress />
            }
              <Paper className={classes.paper}>
                <Typography variant='h5' >Tra cứu phòng</Typography>
                <Grid container spacing={3}>
                  <Grid  item xs={10} sm={4}>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="select-floor">Floor</InputLabel>
                          <Select
                          labelId="select-floor"
                          id="simple-select-number"
                          value={floor}
                          onChange={handleFloorChange}
                          >
                          {
                            [1,2,3,4,5,6,7,8,9,10].map((value)=>{
                              return (
                                  <MenuItem key={'selectnumber'+value+1} value={value}>{value}</MenuItem>   
                              )
                            })  
                          }
                          </Select>
                      </FormControl>
                  </Grid>
                  <Grid  item xs={10} sm={4}>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="select-number">Number</InputLabel>
                          <Select
                          labelId="select-number"
                          id="simple-select-number"
                          value={number}
                          onChange={handleNumberChange}
                          >
                          {
                            [1,2,3,4,5,6,7,8,9,10].map((value)=>{
                              return (
                                  <MenuItem key={'selectnumber'+value+1} value={value}>{value}</MenuItem>   
                              )
                            })  
                          }
                          </Select>
                      </FormControl>
                  </Grid>
                  <Grid  item xs={10} sm={4}>
                      <FormControl className={classes.formControl}>
                      <Button variant="contained" color="primary" component="span" className={classes.button} onClick = {searchRoom} >
                          Thông tin
                      </Button>
                      </FormControl>
                  </Grid>
                  {openI?
                    <Grid container item xs={10} sm={12}>
                      <Grid item xs={10} sm={12} className={classes.flexEnd} >
                        <Button variant="contained" color="secondary" component="span" className={classes.button} onClick = {CloseI} >
                            Đóng
                        </Button>
                      </Grid>
                      <Grid item xs={10} sm={7}>
                      <p><b>Mã phòng: &nbsp;</b>{roomInfo.Id_room}</p>
                      <p><b>Lầu: &nbsp;</b>{roomInfo.Floor}</p>
                      <p><b>Số phòng: &nbsp;</b>{roomInfo.Number}</p>
                      </Grid>
                      <Grid item xs={10} sm={5}>
                      <p><b>Loại phòng: &nbsp;</b>{roomInfo.Category}</p>
                      <p><b>Giá: &nbsp;</b>{roomInfo.Price}</p>
                      <p><b>Trạng thái: &nbsp;</b>{roomInfo.Status === 'false' ? 'Đang sử dụng' : 'Còn trống' }</p>
                      </Grid>
                    </Grid>
                    : roomInfoE ?
                      <Typography style={{width:'100%',padding:'.5rem'}} align='center' color='error'>{roomInfoE}</Typography>
                    :null
                  }    
                </Grid>
              </Paper>
          </Grid>
        </React.Fragment>
    )
}