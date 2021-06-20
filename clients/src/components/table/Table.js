import React, { useState } from 'react';
import TableToolBar from './TableToolBar';
import {TableStyles} from './styles'
import {Paper, TableContainer,Table,TableBody,TableRow,TableCell,Checkbox,TablePagination, FormControlLabel,Switch,Typography, Box} from '@material-ui/core'
import {KeyboardArrowDownOutlined} from '@material-ui/icons';

import TableHeader from './TableHead';
import { generateCellHead,stableSort,getComparator} from './tableFunction';

import InvoiceRow from '../invoice/invoice.row';

const data = [
  {
    "id": 0,
    "published": "2016-02-27T02:19:04 -07:00",
    "staff": "Fields Shepard",
    "start": "2014-01-13T03:52:35 -07:00",
    "checkout": "2015-10-23T05:44:11 -07:00",
    "price": 687691,
    "paid": true,
    "Payee": [
      {
        "name": "Ratliff Witt",
        "email": "ratliffwitt@envire.com",
        "phone": "+1 (872) 415-2603",
        "indentify": 828661
      }
    ]
  },
  {
    "id": 1,
    "published": "2015-04-04T02:30:23 -07:00",
    "staff": "Lawson Fletcher",
    "start": "2020-11-14T12:09:00 -07:00",
    "checkout": "2014-06-29T01:44:55 -07:00",
    "price": 550418,
    "paid": true,
    "Payee": [
      {
        "name": "Leanne Noble",
        "email": "leannenoble@envire.com",
        "phone": "+1 (887) 414-3961",
        "indentify": 778350
      }
    ]
  },
  {
    "id": 2,
    "published": "2018-07-31T12:56:18 -07:00",
    "staff": "Avila Best",
    "start": "2018-01-01T07:27:32 -07:00",
    "checkout": "2014-11-29T10:09:04 -07:00",
    "price": 229915,
    "paid": false,
    "Payee": [
      {
        "name": "Eddie Carroll",
        "email": "eddiecarroll@envire.com",
        "phone": "+1 (911) 594-2098",
        "indentify": 217910
      }
    ]
  },
  {
    "id": 3,
    "published": "2015-10-17T02:59:53 -07:00",
    "staff": "Zimmerman Workman",
    "start": "2016-03-14T10:50:24 -07:00",
    "checkout": "2015-06-08T03:38:19 -07:00",
    "price": 881620,
    "paid": false,
    "Payee": [
      {
        "name": "Houston Goodwin",
        "email": "houstongoodwin@envire.com",
        "phone": "+1 (806) 432-2980",
        "indentify": 737116
      }
    ]
  },
  {
    "id": 4,
    "published": "2015-01-24T06:54:26 -07:00",
    "staff": "Jarvis Delgado",
    "start": "2019-11-27T10:40:31 -07:00",
    "checkout": "2015-04-25T11:05:51 -07:00",
    "price": 403240,
    "paid": false,
    "Payee": [
      {
        "name": "Roseann Sanders",
        "email": "roseannsanders@envire.com",
        "phone": "+1 (945) 508-2596",
        "indentify": 285368
      }
    ]
  }
]

export default function EnhancedTable() {
    const styles = TableStyles()
    const Headers = ['id','published','price','paid']
    const CellHeaders = generateCellHead(data[0],Headers)
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState(Headers[1]);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = data.map((n) => n[Object.keys(n)[1]]);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
    
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
    
      setSelected(newSelected);
    };
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
                <TableToolBar numberSelected={selected.length} ></TableToolBar>
                <TableContainer>
                    <Table className={styles.table} aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
                        <TableHeader 
                          styles = {styles}
                          CellHeaders = {CellHeaders} 
                          numberSelected={selected.length} 
                          numberRow= {data.length} 
                          order={order}
                          orderBy={orderBy}
                          handleRequestSort = {handleRequestSort}
                          handleSelectAllClick={handleSelectAllClick} />
                        <TableBody>
                          {
                            stableSort(data, getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                const isItemSelected = isSelected(row[Object.keys(row)[1]]);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                  <InvoiceRow key={`ROW+${labelId}`} row={row} handleClick={handleClick} isItemSelected={isItemSelected} Headers={Headers} labelId={labelId} />
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
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
        </div>
    )
}