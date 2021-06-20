import {Box} from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import WidgetsOutlinedIcon from '@material-ui/icons/WidgetsOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import React, { useState } from 'react';
export default function Dashboard(props){

    const Clicked = (e) => {
        if (props.render){
            document.getElementById(`${props.render}`).classList.remove('dashboard_focus')
        }
        props.setRender(e.target.id);
        document.getElementById(e.target.id).classList.add('dashboard_focus')
    }

    return (
        <Box display='flex' flexDirection='row' flexWrap='wrap' width='100%' boxShadow={2}>
            <Box width='18%' display='flex' flexWrap='wrap' alignItems='center'>
                Flopspy
            </Box>
            <Box id='dashboard' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <WidgetsOutlinedIcon className='negativeZIndex' />
                <span className='negativeZIndex'>&nbsp;&nbsp;Dashboard</span>
            </Box>
            <Box id='bookings' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <VpnKeyIcon className='negativeZIndex' />
                <span className='negativeZIndex' >&nbsp;&nbsp;Bookings</span>
            </Box>
            <Box id='calendar' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <EventNoteIcon className='negativeZIndex' />
                <span className='negativeZIndex'>&nbsp;&nbsp;Calendar</span>
            </Box>
            <Box id='rate' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <TrendingUpOutlinedIcon className='negativeZIndex' />
                <span className='negativeZIndex' >&nbsp;&nbsp;Rates</span>
            </Box>
            <Box id='unit' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <LocalAtmOutlinedIcon className='negativeZIndex' />
                <span className='negativeZIndex' >&nbsp;&nbsp;Units</span>
            </Box>
            <Box id='invoice' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <DescriptionOutlinedIcon className='negativeZIndex' />
                <span className='negativeZIndex' >&nbsp;&nbsp;Invoices</span>
            </Box>
            <Box width='18%' display='flex' flexWrap='wrap' alignItems='center' justifyContent='flex-end'>
                Riswell Hotel
            </Box>
        </Box>

    )


}