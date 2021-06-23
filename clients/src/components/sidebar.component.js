import {Box,List,ListSubheader,ListItem,ListItemIcon,ListItemText,makeStyles} from '@material-ui/core'
import {AttachMoney,MoneyOff,RoomServiceOutlined} from '@material-ui/icons';
import React,{useState} from 'react';
import AddBookings from './dialog/addBooking';
const SideBarStyle = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    container: {
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        width:'100%',
        height:'100%',
        paddingTop : '.8rem'
    }
  }));
export function BookingSideBar(props){
    const classes = SideBarStyle()
    const {roomSelected} = props
    const [open,setOpen] = useState(false)
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <React.Fragment>
            <Box className={classes.container} boxShadow={2}>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='center'>
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
                        <ListItem button className='hover_left' onClick={handleClickOpen} >
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
                    </List>
                </Box>
            </Box>
            <AddBookings handleClose={handleClose} roomSelected={roomSelected} open={open} />
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
                        <b>Filter</b>
                        </ListSubheader>
                    }
                    className={classes.root}
                    >
                    <ListItem button className='hover_left'>
                        <ListItemIcon>
                        <AttachMoney />
                        </ListItemIcon>
                        <ListItemText primary="Staff name" />
                    </ListItem>
                    <ListItem button className='hover_left'>
                        <ListItemIcon>
                        <MoneyOff />
                        </ListItemIcon>
                        <ListItemText primary="Date" />
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
                        <AttachMoney />
                        </ListItemIcon>
                        <ListItemText primary="Category 1" />
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
                        <MoneyOff />
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