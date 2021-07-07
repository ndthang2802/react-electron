import React from 'react';
import {TableRow,TableCell,Checkbox,Typography,makeStyles} from '@material-ui/core'


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
export default function CommonRow(props){
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
            keys={row.Id_room}
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
                                    <Typography component={'div'} >
                                    {
                                        row[Header].toString().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/) ?
                                        row[Header].toString().replace('T','  ').replace('Z',' ') 
                                        : row[Header].toString() 
                                     }
                                    </Typography>
                            </TableCell>
                    )
                    
                })
            }
        </TableRow>
        </React.Fragment>
    )
}