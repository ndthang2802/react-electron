import React,{useState}  from 'react';
import EnhancedTable from './table/Table'
import {InvoiceSideBar} from './sidebar.component'
import { Grid,Typography,makeStyles,TextField,Box,Button,Table,TableCell,TableBody,TableHead,TableRow,Paper } from '@material-ui/core';
import {FindInPageOutlined,ErrorOutlineOutlined,CancelPresentationOutlined,RotateLeft} from '@material-ui/icons';
import invoiceApiCall from '../apiCall/invoice.api';
import {SuccessInvoice,FailInvoice } from "./dialog/addBookSuccessAndFail"
const useStyles = makeStyles(theme => ({
  center:{
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  rowdisplay:{
    display:'flex',
    flexDirection:'row',
    alignContent:'center',
    gap:'3rem',
    boxShadow:'0 1.5px 1px -1px gray',
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor : '#98E6FC',
  },
  alert: {
    padding: '15px',
    backgroundColor : '#f44336', /* Red */
    color: 'white',
    marginBottom: '15px',
    display:'flex',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'space-around',
    gap: '1rem',
    borderRadius:'3%'
  },
  title: {
    flex: '1 1 100%',
    fontSize:'1.5em',
    fontWeight:'bold',
    marginBottom:'5px',
    marginTop:'5px'
  },
  bill:{
    boxShadow:'0 0 1px 1px #ccc;',
    width:'100%',
    padding:'1em',
  },
  end:{
    display:'flex',
    justifyContent:'flex-end'
  },
}));
function validPhone(phone){
  if(!phone){
    return false
  }
  else if (!phone.match(/\d/g)){
    return false
  }
  else if (phone.length <10){
    return false
  }
  return true
}
export default function Invoice(){
    const classes = useStyles()
    const [phone,setPhone] = useState('')
    const [error,setError] = useState()
    const [unpaidBill,setUnpaidBill] = useState("")
    const [openBill,setOpenBill] = useState(false)
    const [billSelected,setBillSelected] = useState(false)
    const [openDialogSuccess,setOpenDialogSuccess] =useState(false) 
    const [openDialogFail,setOpenDialogFail] =useState(false) 

    const phoneChange = (e)=>{
      setError('')
      setPhone(e.target.value)
    }
    const getBill = async () => {
      if (!validPhone(phone)) setError('Số điện thoại không hợp lệ')
      else {
        const data = {'phone':phone}
        var res = await invoiceApiCall.getUnpaidBill(data)
        if (res.status === 400) setError('Số điện thoại không đúng')
        else if (res.status === 200) {
          res = await res.json()
          setUnpaidBill(res)
        }
      }
    }

    const PayInfo = (e)=> {
      for (var b of unpaidBill){
        if (e.currentTarget.value === b.id_rental){
          setBillSelected(b)
          break
        }
      }
      
      setOpenBill(true)
    
    }
    const closeError = ()=>{
      setError('')
    } 
    const Reset = () => {
      setPhone('')
      setUnpaidBill('')
      setOpenBill(false)
      setBillSelected(false)
    }
    const TinhTien = async() =>{
      var data = {'id_rental':billSelected.id_rental}
      var res = await invoiceApiCall.PayBill(data)
      if (res.status === 204){
        console.log('pay success')
        setOpenDialogSuccess(true)
      }
      else {
        console.log('pay fail cmnr')
        setOpenDialogFail(true)
      }
    }
    return (
        <Grid container spacing={3}>
          <SuccessInvoice open={openDialogSuccess} setOpen={setOpenDialogSuccess}></SuccessInvoice>
            <FailInvoice open={openDialogFail} setOpen={setOpenDialogFail}></FailInvoice>
          <Grid item xs={12} sm={2}>
            <InvoiceSideBar  />
          </Grid>
          <Grid container item xs={12} sm={10}>
            <Box width='100%'>
              <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}><b>Kiểm tra thông tin hóa đơn</b></Grid>
                  <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={10} className={classes.rowdisplay}>
                    <Typography component='div' className={classes.center} >Nhập số điện thoại: </Typography>
                    <TextField id="outlined-basic" label="Phone" value={phone} onChange={phoneChange} />
                    <Button type="submit" variant="contained" className={classes.button}  onClick={getBill} >
                      <b>Kiểm tra</b> <FindInPageOutlined className={classes.rightIcon}/>
                    </Button>
                    <Button type="submit" variant="contained" className={classes.button}  onClick={Reset} >
                      <b>Reset</b> <RotateLeft className={classes.rightIcon}/>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={12} className={classes.center} >
                    {
                      error ? 
                        <Box className={classes.alert} >
                          <ErrorOutlineOutlined className={classes.leftIcon} />
                          <b>!Error:&nbsp;</b>{error}
                          <CancelPresentationOutlined onClick={closeError} />
                        </Box> 
                      : unpaidBill ?
                      <Paper style={{width:'100%'}}>
                        <Table>
                          <TableHead>
                              <TableRow><TableCell className={classes.title} colSpan={7} >- Hóa đơn</TableCell></TableRow>
                              <TableRow>
                                <TableCell><b>Tên</b></TableCell><TableCell><b>Phone</b></TableCell>
                                <TableCell><b>Lầu</b></TableCell><TableCell><b>Phòng</b></TableCell>
                                <TableCell><b>Ngày Check in</b></TableCell><TableCell><b>Ngày Check out</b></TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              unpaidBill.map((row,index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell><TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.floor}</TableCell><TableCell>{row.number}</TableCell>
                                    <TableCell>{row.Start_at}</TableCell><TableCell>{row.Check_out_at}</TableCell>
                                    <TableCell>
                                    <Button type="button"  className={classes.button} value={row.id_rental} onClick={PayInfo}  >
                                      Thanh toán <FindInPageOutlined className={classes.rightIcon}/>
                                    </Button>
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            }
                          </TableBody>
                        </Table>
                        </Paper>
                      : null
                    }
                  </Grid>
                  <Grid container item xs={12} sm={12}>
                      {
                        openBill ? 
                        <React.Fragment>
                        <Grid item xs={12} sm={1}></Grid>
                        <Grid item xs={12} sm={10}>
                        <Paper className={classes.bill}>
                          <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} className={classes.end} >
                            <Button variant="outlined" color="secondary" onClick={()=>{setOpenBill(false)}}>
                              X
                            </Button>
                          </Grid>
                            <Grid item xs={12} sm={5}>
                              <h3>Invoice</h3>
                              <p style={{textIndent:'1rem'}}><b>Ngày: </b>5/7/2021</p>
                              <p style={{textIndent:'1rem'}}><b>Mã: </b>{billSelected.id_rental}</p>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <p><b>Nhân viên</b></p>
                              <p style={{textIndent:'1rem'}}><b>Tên: </b>{billSelected.Staff}</p>
                              <p style={{textIndent:'1rem'}}><b>Số điện thoại: </b>{billSelected.Staffphone}</p>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <p><b>Khách hàng</b></p>
                              <p style={{textIndent:'1rem'}}><b>Tên: </b>{billSelected.name}</p>
                              <p style={{textIndent:'1rem'}}><b>Số điện thoại: </b>{billSelected.phone}</p>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <Paper>
                              <Table>
                                <TableHead>
                                    <TableRow>
                                    <TableCell><b>Dịch vụ</b></TableCell>
                                      <TableCell><b>Lầu</b></TableCell><TableCell><b>Phòng</b></TableCell>
                                      <TableCell><b>Ngày Check in</b></TableCell><TableCell><b>Ngày Check out</b></TableCell>
                                      <TableCell><b>Giá</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow>
                                          <TableCell>Thuê phòng</TableCell><TableCell>{billSelected.floor}</TableCell>
                                          <TableCell>{billSelected.number}</TableCell><TableCell>{billSelected.Start_at}</TableCell>
                                          <TableCell>{billSelected.Check_out_at}</TableCell><TableCell>{billSelected.Summary}</TableCell>
                                        </TableRow>
                                </TableBody>
                              </Table>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.end}>
                              <Button type="button"  className={classes.button} onClick={TinhTien}  >
                                      Xác nhận <FindInPageOutlined className={classes.rightIcon}/>
                                </Button>
                            </Grid>
                          </Grid>
                          </Paper>
                          </Grid>
                        <Grid item xs={12} sm={1}></Grid>
                        </React.Fragment>
                        :null
                      }
                    </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
    )
}

