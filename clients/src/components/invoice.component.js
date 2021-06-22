import React,{useState}  from 'react';
import EnhancedTable from './table/Table'
import {InvoiceSideBar} from './sidebar.component'
import { Grid } from '@material-ui/core';
const data = [
    {
      "id": 0,
      "published": "2016-02-27T02:19:04 -07:00",
      "staff": "Fields Shepard",
      "start": "2014-01-13T03:52:35 -07:00",
      "checkout": "2015-10-23T05:44:11 -07:00",
      "price": 687691,
      "paid": true,
      "Payee": 
        {
          "name": "Ratliff Witt",
          "email": "ratliffwitt@envire.com",
          "phone": "+1 (872) 415-2603",
          "indentify": 828661
        }
      
    },
    {
      "id": 1,
      "published": "2015-04-04T02:30:23 -07:00",
      "staff": "Lawson Fletcher",
      "start": "2020-11-14T12:09:00 -07:00",
      "checkout": "2014-06-29T01:44:55 -07:00",
      "price": 550418,
      "paid": true,
      "Payee": 
        {
          "name": "Leanne Noble",
          "email": "leannenoble@envire.com",
          "phone": "+1 (887) 414-3961",
          "indentify": 778350
        }
      
    },
    {
      "id": 2,
      "published": "2018-07-31T12:56:18 -07:00",
      "staff": "Avila Best",
      "start": "2018-01-01T07:27:32 -07:00",
      "checkout": "2014-11-29T10:09:04 -07:00",
      "price": 229915,
      "paid": false,
      "Payee": 
        {
          "name": "Eddie Carroll",
          "email": "eddiecarroll@envire.com",
          "phone": "+1 (911) 594-2098",
          "indentify": 217910
        }
      
    },
    {
      "id": 3,
      "published": "2015-10-17T02:59:53 -07:00",
      "staff": "Zimmerman Workman",
      "start": "2016-03-14T10:50:24 -07:00",
      "checkout": "2015-06-08T03:38:19 -07:00",
      "price": 881620,
      "paid": false,
      "Payee": 
        {
          "name": "Houston Goodwin",
          "email": "houstongoodwin@envire.com",
          "phone": "+1 (806) 432-2980",
          "indentify": 737116
        }
      
    },
    {
      "id": 4,
      "published": "2015-01-24T06:54:26 -07:00",
      "staff": "Jarvis Delgado",
      "start": "2019-11-27T10:40:31 -07:00",
      "checkout": "2015-04-25T11:05:51 -07:00",
      "price": 403240,
      "paid": false,
      "Payee": 
        {
          "name": "Roseann Sanders",
          "email": "roseannsanders@envire.com",
          "phone": "+1 (945) 508-2596",
          "indentify": 285368
        }
      
    }
  ]

export default function Invoice(){
    const Headers = ['id','published','price','paid']
    const [filter,setFilter] = useState('')
    const [selected, setSelected] = useState([]);
    return (
        <React.Fragment>
          <Grid container item xs={4} sm={2}>
            <InvoiceSideBar setFilter={setFilter} />
          </Grid>
          <Grid container item xs={12} sm={10}>
            <EnhancedTable data={data} Headers={Headers} tableName='Invoices' selected={selected} setSelected={setSelected} ></EnhancedTable>
          </Grid>
        </React.Fragment>
    )
}