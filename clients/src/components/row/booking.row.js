import React,{useEffect,useState} from 'react';
import {TableRow,TableCell,Checkbox,Collapse,Typography, Box,Table,TableBody,TableHead,makeStyles,CircularProgress} from '@material-ui/core'
import {ExpandLessOutlined,ExpandMoreOutlined} from '@material-ui/icons';
import ClientApi from '../../apiCall/client.api';
import RoomApiCall from '../../apiCall/room.api';
const styles = makeStyles((theme)=> ({
    root: {
        '& > *': {
          borderBottom: 'unset',
        },
    },
    hover:{
        cursor: 'pointer',
    }
})) 

function MoreInfo(props){
    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    const handleStringHeader = (str_)=>{
        if(str_ === "isAvailable"){
            return "Is Available"
        }
        else if(str_ === "fullname"){
            return "Full Name"
        }
        else{
            let str = (' ' + str_).slice(1);
            const h = str.length;
            str = str.toLowerCase()
            str = str.replaceAt(0,str[0].toUpperCase())
            for(let i = 0 ; i< h; ){
                if(str[i] === '_'){
                    str = str.replaceAt(i,' ')
                    if(i+1<h){
                        str = str.replaceAt(i+1,str[i+1].toUpperCase())
                    }
                }
                i++;
            }
            return str 
        }

    }
    const {expanded,style,infoShow} = props
   
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
                                    <TableCell style={{fontWeight: "bold",fontSize :"15px"}}>Key</TableCell>
                                    <TableCell style={{fontWeight: "bold",fontSize :"15px"}}>Value</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    infoShow ? 
                                     Object.keys(infoShow[0]).map((key,index)=>{
                                         return (
                                             <TableRow key={index}>

                                                 <TableCell>{handleStringHeader(key)}</TableCell>

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

    // icon show less and icon show more
    const [clientExpanded,setClientExpanded] = useState(false)
    const [roomExpanded,setRoomExpanded] = useState(false)

    // expand dialog
    const [expanded,setExpanded] = useState(false)
    // parent's prop
    const {row,handleClick,isItemSelected,labelId,Headers} = props
    // used for reduce duplicated calling
    const [dup,setDup] = useState('')
    //api call for more infomation
    const [infoShow,setInfoShow] = useState()


    const onClickShow = (e) =>{
        setExpanded(true)
        if (e.target.parentNode.id === 'Name'){
            setClientExpanded(true)
            setRoomExpanded(false)
        }
        else { 
            setClientExpanded(false)
            setRoomExpanded(true)
        }
        //
        setDup(e.target.parentNode.id)
    }

    // reduce duplicate calling
    useEffect(()=>{
        const getMoreInfo = async(info) =>{
            try {
                if (info === 'Name'){
                    // more client's info
                    var res = await ClientApi.getClientInfoByPhone(row.Phone)
                    setInfoShow(res)
                }
                else if (info === 'Number'){
                    // more room's info
                    res = await RoomApiCall.getRoomById(row.id_room)
                    setInfoShow(res)
                }
            } 
            catch (e){
                console.log(e)
            }
        }
        getMoreInfo(dup)
    },[dup,row.phone,row.id_room])
    const onClickClose = (e) =>{
        if (e.target.parentNode.id === 'Name'){
            setClientExpanded(false)
        }
        else{
            setRoomExpanded(false)
        }
        setExpanded(false)
    }
    return (
        <React.Fragment>
        <TableRow
            hover
            onClick={(event) => handleClick(event, row)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={labelId}
            selected={isItemSelected}
            className = {style.hover}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
            </TableCell>
            {
               Headers.map((Header,index)=>{
                return (
                        <TableCell component="th" id={labelId} scope="row" style={{padding:'1'}} align="right" key={index} >
                            {
                                !['Name','Number'].includes(Header)  ? 
                                <Typography component={'div'} >{row[Header].toString().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/) ? row[Header].toString().replace('T','  ').replace('Z',' ') : row[Header].toString() }</Typography>
                                :
                                <Box display='flex' flexWrap='wrap' justifyContent='flex-end' >
                                    <Typography>{row[Header].toString()}</Typography>
                                    {
                                        Header === 'Name' ?
                                        clientExpanded ?
                                            <span id={Header} ><ExpandLessOutlined onClick={onClickClose} className='icon_hover_bottom'  /></span>
                                            : 
                                            <span id={Header} ><ExpandMoreOutlined onClick={onClickShow} className='icon_hover_bottom'  /> </span>
                                        :
                                        roomExpanded ?
                                            <span id={Header} ><ExpandLessOutlined onClick={onClickClose} className='icon_hover_bottom'  /></span>
                                            : 
                                            <span id={Header} ><ExpandMoreOutlined onClick={onClickShow} className='icon_hover_bottom' /> </span>
                                    }
                                </Box>
                            }
                        </TableCell>
                )
                
            })
            }
        </TableRow>
        {expanded ? <MoreInfo expanded={expanded}  infoShow={infoShow} row={row} style={style} /> : null}
        </React.Fragment>
    )
}