import React from 'react';
import propTypes from 'prop-types'
import { TableHead,TableRow, TableCell, Checkbox,TableSortLabel } from '@material-ui/core';
export default function TableHeader(props){
    const {styles,order,orderBy,numberSelected,numberRow,CellHeaders,handleRequestSort} = props
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
      };
      String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    const handleStringHeader = (str_)=>{
        if(str_ === "isAvailable"){
            return "Available"
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
    return (
        <TableHead>
            <TableRow>
                <TableCell padding= 'checkbox'>
                    <Checkbox 
                        style = {{visibility: "hidden"}}
                        checked = {numberSelected > 0 && numberSelected === numberRow}
                        indeterminate = {numberSelected > 0 && numberSelected < numberRow}
                        inputProps={{ 'aria-label': 'select all' }}
                    />
                </TableCell>
                {
                    CellHeaders ? 
                    CellHeaders.map((CellHeader)=>(
                        
                        <TableCell key={CellHeader.id} 
                                    padding={CellHeader.disablePadding ? 'none' : 'normal'} 
                                    align = {CellHeader.isNumberic ? 'left' : 'right'} 
                                    sortDirection={orderBy === CellHeader.label ? order : false}>
                            <TableSortLabel
                                active={orderBy === CellHeader.label}
                                direction={orderBy === CellHeader.label ? order : "asc"}
                                onClick={createSortHandler(CellHeader.label)}
                                >

                                    
                                <b style={{fontSize :"16px"}}>{handleStringHeader(CellHeader.label) }</b>

                                {orderBy === CellHeader.label ? (
                                    <span className={styles.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))
                    :
                    null
                }
            </TableRow>
        </TableHead>
    )
}
TableHeader.propTypes = {
    styles: propTypes.object.isRequired,
    numberSelected: propTypes.number.isRequired,
    handleRequestSort: propTypes.func.isRequired,
    order: propTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: propTypes.string.isRequired,
    numberRow: propTypes.number.isRequired
  };