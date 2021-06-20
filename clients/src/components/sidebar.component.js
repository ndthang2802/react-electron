import {Box} from '@material-ui/core'

export default function SideBar(){

    return (
        <Box display='flex' flexDirection='column' flexWrap='wrap' width='100%' height='100vh' boxShadow={2}>
            <Box width='85%' className='hover_left' display='flex' flexDirection='row' justifyContent='space-between'>
                <span>Unconfirmed bookings</span>
                <span>...</span>
            </Box>
            <Box width='85%' className='hover_left' display='flex' flexDirection='row' justifyContent='space-between'>
                <span>Current bookings</span>
                <span>...</span>
            </Box>
            <Box width='85%' className='hover_left' display='flex' flexDirection='row' justifyContent='space-between'>
                <span>Coming up</span>
                <span>...</span>
            </Box>
            <Box width='85%' className='hover_left' display='flex' flexDirection='row' justifyContent='space-between'>
                <span>Past bookings</span>
                <span>...</span>
            </Box>
            <Box width='85%' className='hover_left' display='flex' flexDirection='row' justifyContent='space-between'>
                <span>Canceled</span>
                <span>...</span>
            </Box>
            <Box width='85%' className='hover_left' display='flex' flexDirection='row' justifyContent='space-between'>
                <span>Reminders/Alerts</span>
                <span>...</span>
            </Box>
        </Box>

    )


}