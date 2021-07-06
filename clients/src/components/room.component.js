import React,{useState,useEffect} from 'react';
import EnhancedTable from './table/Table'
import {RoomSideBar} from './sidebar.component'
import { Grid ,CircularProgress} from '@material-ui/core';

import RoomApiCall from '../apiCall/room.api';
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
    }, [])
    return (
        <React.Fragment>
          <Grid container item xs={4} sm={2}>
            <RoomSideBar  />
          </Grid>
          <Grid container item xs={12} sm={10} style={{'paddingRight':'1rem'}}>
            {
              roomRender ?
              <EnhancedTable data={roomRender} Headers={Headers} tableName='Rooms' selected={selected} setSelected={setSelected} ></EnhancedTable>
              : 
              <CircularProgress />
            }
          </Grid>
        </React.Fragment>
    )
}