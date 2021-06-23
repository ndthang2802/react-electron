import React,{useEffect, useState} from 'react';
import {TableRow,TableCell,Checkbox,Collapse,Typography, Box,Table,TableBody,TableHead,makeStyles,CircularProgress} from '@material-ui/core'
import {ExpandLessOutlined,ExpandMoreOutlined} from '@material-ui/icons';
import BookingApi from '../../apiCall/booking.api';
/*
row = {
    id : int,
    floor: date/time,
    number: string,
    category: {
        id:int,
        name: string,
        price: string,
        notes: string,
    }
    status:{
        id:int,
        title:string,
        isAvailabel: bool,
        notes: string
    }
}
*/
const styles = makeStyles((theme)=> ({
    root: {
        '& > *': {
          borderBottom: 'unset',
        },
    },
    hover:{
        cursor: 'pointer'
    }
})) 
function MoreInfo(props){
    const {expanded,style,info,row} = props
    const [infoShow,setInfoShow] = useState()
    const getMoreInfo = async() =>{
        try {
            if (info === 'client'){
                var res = await BookingApi.getClientInfo(row.id)
                setInfoShow(res)
            }
            else if (info === 'room'){
                var res = await BookingApi.getRoomInfo(row.id)
                setInfoShow(res)
            }
        } 
        catch (e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getMoreInfo()
    },[info])
    return (
        <TableRow className={style.root}>
            <TableCell colSpan='100%' style={{ paddingBottom: 0, paddingTop: 0 }} >
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            Detail
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Key</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    infoShow ? 
                                     Object.keys(infoShow[0]).map((key,index)=>{
                                         return (
                                             <TableRow key={index}>
                                                 <TableCell>{key}</TableCell>
                                                 <TableCell>{infoShow[0][key]}</TableCell>
                                             </TableRow>
                                         )
                                     })
                                    :
                                    <TableRow><TableCell colSpan={2}><CircularProgress/></TableCell></TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default function BookingRow(props){
    const style = styles() 
    const [clientExpanded,setClientExpanded] = useState(false)
    const [roomExpanded,setRoomExpanded] = useState(false)
    const [expanded,setExpanded] = useState(false)
    const [info,setInfo] = useState()
    const {row,handleClick,isItemSelected,labelId,Headers} = props
    const onClickShow = (e) =>{
        setExpanded(true)
        if (e.target.parentNode.id === 'client'){
            setClientExpanded(true)
            setRoomExpanded(false)
        }
        else { 
            setClientExpanded(false)
            setRoomExpanded(true)
        }
        setInfo(e.target.parentNode.id)
    }
    const onClickClose = (e) =>{
        if (e.target.parentNode.id === 'client'){
            setClientExpanded(false)
        }
        else{
            setRoomExpanded(false)
        }
        setInfo('')
    }
    return (
        <React.Fragment>
        <TableRow
            hover
            onClick={(event) => handleClick(event, row[Object.keys(row)[1]])}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row[Object.keys(row)[1]]}
            selected={isItemSelected}
            className = {style.hover}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
            </TableCell>
            {
               Headers.map((Header,index)=>{
                return (
                        <TableCell component="th" id={labelId} scope="row" style={{'padding':'1'}} align="right" key={index} >
                            {
                                !['client','room'].includes(Header)  ? 
                                <Typography component={'div'} >{row[Header].toString()}</Typography>
                                :
                                <Box display='flex' flexWrap='wrap' justifyContent='flex-end' id={Header} >
                                    <Typography>{row[Header].toString()}</Typography>
                                    {
                                        Header === 'client' ?
                                        clientExpanded ?
                                            <span id={Header}><ExpandLessOutlined onClick={onClickClose} className={style.hover} className='icon_hover_bottom' /></span>
                                            : 
                                            <span id={Header}><ExpandMoreOutlined onClick={onClickShow} className={style.hover} className='icon_hover_bottom' /> </span>
                                        :
                                        roomExpanded ?
                                            <span id={Header}><ExpandLessOutlined onClick={onClickClose} className={style.hover} className='icon_hover_bottom' /></span>
                                            : 
                                            <span id={Header}><ExpandMoreOutlined onClick={onClickShow} className={style.hover} className='icon_hover_bottom' /> </span>
                                    }
                                </Box>
                            }
                        </TableCell>
                )
                
            })
            }
        </TableRow>
        {info ? <MoreInfo expanded={expanded}  info={info} row={row} style={style} /> : null}
        </React.Fragment>
    )
}