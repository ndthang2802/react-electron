import React,{useState} from 'react';
import {TableRow,TableCell,Checkbox,Collapse,Typography, Box,Table,TableBody,TableHead,makeStyles,List,ListItem,ListItemText} from '@material-ui/core'


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
export default function RoomRow(props){
    const style = styles() 
    const {row,handleClick,isItemSelected,labelId,Headers} = props
  
    return (
        <React.Fragment>
        <TableRow
            hover
            onClick={(event) => handleClick(event, row)}
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
                                    <Typography component={'div'} >{row[Header].toString()}</Typography>
                            </TableCell>
                    )
                    
                })
            }
        </TableRow>
        </React.Fragment>
    )
}