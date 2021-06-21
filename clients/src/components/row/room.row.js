import React,{useState} from 'react';
import {TableRow,TableCell,Checkbox,Collapse,Typography, Box,Table,TableBody,TableHead,makeStyles,List,ListItem,ListItemText} from '@material-ui/core'
import {ExpandLessOutlined,ExpandMoreOutlined} from '@material-ui/icons';
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
function RoomDetail(props){
    const {expanded,row,style} = props
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
                                    Object.keys(row).map((key)=>{
                                        return (
                                            <TableRow key={row[key]}>
                                                <TableCell><b>{key}</b></TableCell>
                                                {
                                                    typeof(row[key]) !== 'object' ? 
                                                        <TableCell>{row[key].toString()}</TableCell>
                                                    :
                                                        <TableCell>
                                                            <List>
                                                                {
                                                                    Object.keys(row[key]).map((_)=>{
                                                                        return (
                                                                            <ListItem key={_}>
                                                                                <ListItemText>
                                                                                    <b>{_.toString() + ':'}</b>
                                                                                </ListItemText>
                                                                                <ListItemText>
                                                                                    {row[key][_].toString()}
                                                                                </ListItemText>
                                                                            </ListItem>
                                                                        )
                                                                    })
                                                                }
                                                            </List>
                                                        </TableCell>
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default function InvoiceRow(props){
    const style = styles() 
    const [expanded,setExpanded] = useState(false)
    const {row,handleClick,isItemSelected,labelId,Headers} = props
    const onClickShow = (e) =>{
        setExpanded(!expanded)
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
                            <TableCell component="th" id={labelId} scope="row" style={{'padding':'1'}} align="right" key={row[Header]} >
                                {
                                    index !== 0 ? 
                                    <Typography component={'span'}>
                                        {Header === 'category' ? row[Header].name.toString() : Header==='status' ? row[Header].isAvailable.toString() : row[Header].toString() }
                                    </Typography>
                                    :
                                    <Box display='flex' flexWrap='wrap' justifyContent='flex-end' >
                                        <span style={{'padding':'0 1rem'}} >
                                            { Header ==='category' ? row[Header].name.toString() : Header==='status' ? row[Header].isAvailable.toString() : row[Header].toString() }
                                        </span>
                                        {expanded ? 
                                        <ExpandLessOutlined onClick={onClickShow} className={style.hover} /> : 
                                        <ExpandMoreOutlined onClick={onClickShow} className={style.hover} /> }
                                    </Box>
                                }
                            </TableCell>
                    )
                    
                })
            }
        </TableRow>
        <RoomDetail expanded={expanded} row={row} style={style} />
        </React.Fragment>
    )
}