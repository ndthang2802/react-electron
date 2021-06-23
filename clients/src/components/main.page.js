import {Box,Grid} from '@material-ui/core'
import Dashboard from './dashboard.component'
import React, { useState} from 'react';
import Bookings from './booking.component'
import Rooms from './room.component'
import Services from "./services.component"
import Invoice from './invoice.component'
export default function MainPage(){
    
    const [render,setRender] = useState('bookings')

    const list = {
        'bookings' : <Bookings />,
        'invoice' : <Invoice />,
        'room'    : <Rooms />,
        'service' : <Services/>
    }
    return (
        <Box>
            <Grid container spacing={1} >
                <Grid container item xs={12}>
                    <Dashboard render={render} setRender={setRender} ></Dashboard>
                </Grid>
                {list[render]}
            </Grid>
        </Box>
    )
}