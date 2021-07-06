import {Box,List,ListSubheader,ListItem,ListItemIcon,ListItemText,makeStyles} from '@material-ui/core'
import {AttachMoney,MoneyOff,RoomServiceOutlined,BorderColorOutlined,Search} from '@material-ui/icons';
import React,{useState} from 'react';
import AddBookings from './dialog/addBooking';
import EditBookings from './dialog/editBooking';
import Warning from './dialog/warning';
const SideBarStyle = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
      
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    container: {
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        width:'100%',
        minHeight:'100vh',
        height:'100%',
        paddingTop : '.8rem',
    }
  }));
export function BookingSideBar(props){
    const classes = SideBarStyle()
    const {roomSelected,bookingSelected} = props
    const [openAddBooking,setOpenAddBooking] = useState(false)
    const [openEditBooking,setOpenEditBooking] = useState(false)
    const [openWarning,setOpenWarning] = useState(false)
    const AddBookingOpen = () => {
        if (roomSelected.length)
            setOpenAddBooking(true);
        else
            setOpenWarning(true)
        
    };
  
    const AddBookingClose = () => {
        setOpenAddBooking(false);
    };
    const EditBookingOpen = () => {
        if (bookingSelected.length)
            setOpenEditBooking(true);
        else
            setOpenWarning(true)
    };
  
    const EditBookingClose = () => {
        setOpenEditBooking(false);
    };
    const WarningClose = () => {
        setOpenWarning(false);
    };
    return (
        <React.Fragment>
            <Box className={classes.container} boxShadow={2}>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='center' position='sticky' top='0'>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader" style={{'fontSize':'1.2rem'}}>
                            <b>Control</b>
                            </ListSubheader>
                        }
                        className={classes.root}
                        >
                        <ListItem button className='hover_left' onClick={AddBookingOpen} >
                            <ListItemIcon>
                            <AttachMoney />
                            </ListItemIcon>
                            <ListItemText primary="Add Booking" />
                        </ListItem>
                        <ListItem button className='hover_left' >
                            <ListItemIcon>
                            <RoomServiceOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Add service" />
                        </ListItem>
                        <ListItem button className='hover_left' onClick={EditBookingOpen} >
                            <ListItemIcon>
                            <BorderColorOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Update Booking" />
                        </ListItem>
                    </List>
                </Box>
            </Box>
                <AddBookings handleClose={AddBookingClose} roomSelected={roomSelected} open={openAddBooking} />
                <EditBookings handleClose={EditBookingClose}  bookingSelected={bookingSelected} open={openEditBooking} />
                <Warning handleClose={WarningClose} open={openWarning}></Warning>
        </React.Fragment>
    )
}
export function InvoiceSideBar(props){
    const classes = SideBarStyle()
    return (
        <Box className={classes.container} boxShadow={2}>
            <Box width='100%'>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" style={{'fontSize':'1.2rem'}}>
                        <b>Chức năng khác</b>
                        </ListSubheader>
                    }
                    className={classes.root}
                    >
                    <ListItem button className='hover_left'>
                        <ListItemIcon>
                        <AttachMoney />
                        </ListItemIcon>
                        <ListItemText primary="Option 1" />
                    </ListItem>
                    <ListItem button className='hover_left'>
                        <ListItemIcon>
                        <MoneyOff />
                        </ListItemIcon>
                        <ListItemText primary="Option 2" />
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export function RoomSideBar(props){
    const classes = SideBarStyle()
    return (
        <Box className={classes.container} boxShadow={2} >
            <Box width='100%' >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" style={{'fontSize':'1.2rem'}}>
                        <b>Options</b>
                        </ListSubheader>
                    }
                    className={classes.root}
                    >
                    <ListItem button className='hover_left' >
                        <ListItemIcon>
                        <Search />
                        </ListItemIcon>
                        <ListItemText primary="Tìm phòng" />
                    </ListItem>
                    <ListItem button className='hover_left' >
                        <ListItemIcon>
                        <MoneyOff />
                        </ListItemIcon>
                        <ListItemText primary="Category 2" />
                    </ListItem>
                    <ListItem button className='hover_left' >
                        <ListItemIcon>
                        <MoneyOff />
                        </ListItemIcon>
                        <ListItemText primary="Category 3" />
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export function ServiceSideBar(props){
    const classes = SideBarStyle()
    return (
        <Box className={classes.container} boxShadow={2} >
            <Box width='100%' >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" style={{'fontSize':'1.2rem'}}>
                        <b>SERVICE</b>
                        </ListSubheader>
                    }
                    className={classes.root}
                    >
                    <ListItem button className='hover_left' >
                        <ListItemIcon>
                        <AttachMoney />
                        </ListItemIcon>
                        <ListItemText primary="Add" />
                    </ListItem>
                    <ListItem button className='hover_left' >
                        <ListItemIcon>
                        <MoneyOff />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItem>
                    <ListItem button className='hover_left' >
                        <ListItemIcon>
                        <BorderColorOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Update" />
                    </ListItem>
                    <ListItem button className='hover_left' >
                        <ListItemIcon>
                        <MoneyOff />
                        </ListItemIcon>
                        <ListItemText primary="Filter" />
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}