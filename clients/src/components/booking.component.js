import React, { useState,useEffect } from 'react';
import EnhancedTable from './table/Table'
import {BookingSideBar} from './sidebar.component'
import { Grid ,CircularProgress} from '@material-ui/core';
import BookingApi from '../apiCall/booking.api'
import RoomApiCall from '../apiCall/room.api';

export default function Bookings(){
    const [rentalInfo,setRentalInfo] = useState()
    const [emptyRoomInfo,setEmptyRoomInfo] = useState()
    const dataCalling = async ()  =>{
        try {
            var res = await BookingApi.getAll()
            setRentalInfo(res)
        } 
        catch (e){
            console.log(e)
        }
    }
    const emptyRoomCalling = async () => {
      try {
        var res = await RoomApiCall.getAllEmptyRoom()
        setEmptyRoomInfo(res)
      } 
      catch (e){
          console.log(e)
      }
    }
    useEffect(()=>{
      dataCalling()
      emptyRoomCalling()
    },[])
    //
    const [selected, setSelected] = useState([]);
    const [emptySelected, setEmptySelected] = useState([]);
    const Headers = ['client','StartAt','checkOutAt','room']
    const RoomHeaders = ['category','status','floor','room']
    return (
        <React.Fragment>
          <Grid container item xs={4} sm={2}>
            <BookingSideBar roomSelected = {emptySelected} bookingSelected = {selected} />
          </Grid>
          <Grid container item xs={12} sm={10} style={{'paddingRight':'1rem'}}>
            {
              rentalInfo ?
              <EnhancedTable data={rentalInfo} Headers={Headers} tableName='Bookings' selected={selected} setSelected={setSelected} ></EnhancedTable>
              : 
              <CircularProgress />
            }
            {
              emptyRoomInfo ?
              <EnhancedTable data={emptyRoomInfo} Headers={RoomHeaders} tableName='Empty Room' selected={emptySelected} setSelected={setEmptySelected} ></EnhancedTable>
              : 
              <CircularProgress />
            }
          </Grid>
        </React.Fragment>
    )
}