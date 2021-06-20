import {Box,Grid} from '@material-ui/core'
import Dashboard from './dashboard.component'
import SideBar from './sidebar.component'
import React, { useState} from 'react';
import Bookings from './booking.component'
import Invoice from './invoice.component'
export default function MainPage(){
    
    const [render,setRender] = useState()

    const list = {
        'bookings' : <Bookings />,
        'invoice' : <Invoice />
    }

    return (
        <Box>
            <Grid container spacing={1} >
                <Grid container item xs={12}>
                    <Dashboard render={render} setRender={setRender} ></Dashboard>
                </Grid>
                <Grid container item xs={4} sm={2}>
                    <SideBar></SideBar>
                </Grid>
                <Grid container item xs={12} sm={10}>
                    {list[render]}
                </Grid>
            </Grid>
        </Box>
    )
}