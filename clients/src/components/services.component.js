import React, { useState,useEffect } from 'react';
import EnhancedTable from './table/Table'
import {ServiceSideBar} from './sidebar.component'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ServiceApiCall from '../apiCall/service.api'
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));
export default function Services(){
    // api call Room Rentals
    const [servicesInfo,setServicesInfo] = useState()
    const dataCalling = async ()  =>{
        try {
            var res = await ServiceApiCall.getAll()
            setServicesInfo(res)
        } 
        catch (e){
            console.log(e)
        }
    }
    useEffect(()=>{
      console.log("successfull")
      dataCalling()
    },[])
    //
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const Headers = ['serviceType','rental','createdAt','isCanceled','quantity','sub_total','detail']
    return (
        <React.Fragment>
          <Grid container item xs={4} sm={2}>
            <ServiceSideBar  />
          </Grid>
          <Grid container item xs={12} sm={10} style={{'paddingRight':'1rem'}}>
            {
              servicesInfo ?
              <EnhancedTable data={servicesInfo} Headers={Headers} tableName='Services' selected={selected} setSelected={setSelected} ></EnhancedTable>
              : 
              <div className={classes.root}>
              <CircularProgress color="secondary" />
            </div>
            } 
          </Grid>
        </React.Fragment>
    )
}