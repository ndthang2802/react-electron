
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EventNoteIcon from '@material-ui/icons/EventNote';
import WidgetsOutlinedIcon from '@material-ui/icons/WidgetsOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import PersonIcon from '@material-ui/icons/Person';
import React,{useState,useEffect} from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthApiCall from '../apiCall/auth.api';
import { makeStyles,Box,} from '@material-ui/core';
import logo from '../logo/Full.svg'
const useStyles = makeStyles(theme => ({
  logo:{
    height: '70px',
    width:'auto',
    justifyContent:'center',
  }
}));
export default function Dashboard(props){
    const classes = useStyles()
    const [staff, setStaff] = useState()
    useEffect(() => {
        const getStaffInfo = async () =>{
            try {
                var res = await AuthApiCall.getStaffInfo()
                setStaff(res[0])
            }
            catch(e){
                console.log(e)
            }
        }
        getStaffInfo()
    }, [])

    const Clicked = (e) => {
        if (props.render){
            document.getElementById(`${props.render}`).classList.remove('dashboard_focus')
        }
        props.setRender(e.target.id);
        document.getElementById(e.target.id).classList.add('dashboard_focus')
    }
    const logout = async ()=>{
        var res = await AuthApiCall.logOut()
    }
    return (
        <Box display='flex' flexDirection='row' flexWrap='wrap' width='100%' boxShadow={2}>
            <Box width='15%' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center'>
                <img src={logo} className={classes.logo} ></img>
            </Box>
            <Box id='dashboard' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <WidgetsOutlinedIcon className='negativeZIndex' />
                <span className='negativeZIndex'>&nbsp;&nbsp;Dashboard</span>
            </Box>
            <Box id='bookings' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom dashboard_focus' onClick={Clicked}>
                <VpnKeyIcon className='negativeZIndex' />
                <span className='negativeZIndex' >&nbsp;&nbsp;Bookings</span>
            </Box>
            <Box id='room' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <EventNoteIcon className='negativeZIndex' />
                <span className='negativeZIndex'>&nbsp;&nbsp;Room</span>
            </Box>
            <Box id='service' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <LocalAtmOutlinedIcon className='negativeZIndex' />
                <span className='negativeZIndex' >&nbsp;&nbsp;Service</span>
            </Box>
            <Box id='invoice' width='auto' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' className='hover_bottom' onClick={Clicked}>
                <DescriptionOutlinedIcon className='negativeZIndex' />
                <span className='negativeZIndex' >&nbsp;&nbsp;Invoices</span>
            </Box>
            <Box width='15%' display='flex' flexWrap='wrap' alignItems='center' justifyContent='flex-end'>
                <PersonIcon />
                {staff ? <span>&nbsp;&nbsp;{staff.Staff}</span>:null}
            </Box>
            <Box width='6%' display='flex' flexWrap='wrap' alignItems='center' justifyContent='flex-end' className='hover_bottom' onClick={logout} >
                <ExitToAppIcon />
                {staff ? <span>&nbsp;&nbsp;Logout</span>:null}
            </Box>
        </Box>

    )


}