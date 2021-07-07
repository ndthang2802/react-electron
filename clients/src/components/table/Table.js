import React, { useState } from 'react';
import TableToolBar from './TableToolBar';
import {TableStyles} from './styles'
import {Paper, TableContainer,Table,TableBody,TableRow,TableCell,TablePagination, FormControlLabel,Switch} from '@material-ui/core'

import TableHeader from './TableHead';
import { generateCellHead,stableSort,getComparator} from './tableFunction';

import CommonRow from '../row/common.row';
import BookingRow from '../row/booking.row';


export default function EnhancedTable(props) {
    const styles = TableStyles()
    const {data,Headers,tableName,selected,setSelected} = props 
    const CellHeaders = generateCellHead(data[0],Headers)
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState(Headers[0]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const handleClick = (event, name) => {
      if (selected[0] === name)
      {
        setSelected([]);
      }
      else{
        setSelected([name]);
      }
      
    }
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
    return (
        <div className ={styles.root}>
            <Paper className={styles.paper}>
                <TableToolBar numberSelected={selected.length} tableName={tableName}  ></TableToolBar>
                <TableContainer>
                    <Table className={styles.table} aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
                        <TableHeader 
                          styles = {styles}
                          CellHeaders = {CellHeaders} 
                          numberSelected={selected.length} 
                          numberRow= {data.length} 
                          order={order}
                          orderBy={orderBy}
                          handleRequestSort = {handleRequestSort} />
                        <TableBody>
                          {
                            stableSort(data, getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                const isItemSelected = isSelected(row);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                  tableName === 'Rooms' ?
                                    <CommonRow key={`ROW+${index}`} row={row} handleClick={handleClick} isItemSelected={isItemSelected} Headers={Headers} labelId={labelId} />
                                  : tableName === 'Services' ?
                                    <CommonRow key={`ROW+${index}`} row={row} handleClick={handleClick} isItemSelected={isItemSelected} Headers={Headers} labelId={labelId} />  
                                  :
                                    <BookingRow key={`ROW+${labelId}`} row={row} handleClick={handleClick} isItemSelected={isItemSelected} Headers={Headers} labelId={labelId} />
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
        </div>
    )
}