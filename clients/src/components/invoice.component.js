import React,{useState}  from 'react';
import EnhancedTable from './table/Table'
import {InvoiceSideBar} from './sidebar.component'
import { Grid,Typography,makeStyles,TextField,Box,Button,Divider } from '@material-ui/core';
import {FindInPageOutlined} from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  center:{
    display: 'flex',
    alignItems:'center'
  },
  rowdisplay:{
    display:'flex',
    flexDirection:'row',
    alignContent:'center',
    gap:'3rem',
    boxShadow:'0 2px 1px -1px gray',
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor : '#98E6FC',
  },
}));
export default function Invoice(){
    const classes = useStyles()
    const [phone,setPhone] = useState('')
    const [error,setError] = useState()
    const phoneChange = (e)=>{
      setPhone(e.target.value)
    }
    const getBill = () => {
      if (phone.length != 10)  setError('Invalid phone')
    }
    return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <InvoiceSideBar  />
          </Grid>
          <Grid container item xs={12} sm={9}>
            <Box width='100%'>
              <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}><b>Kiểm tra thông tin hóa đơn</b></Grid>
                  <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={10} className={classes.rowdisplay}>
                    <Typography component='div' className={classes.center} >Nhập số điện thoại: </Typography>
                    <TextField id="outlined-basic" label="Phone" onChange={phoneChange} />
                    <Button type="submit" variant="contained" className={classes.button}  onClick={getBill} >
                      <b>Kiểm tra</b> <FindInPageOutlined className={classes.rightIcon}/>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={12}>
                    {error ? <p>{error}</p> : null}
                  </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
    )
}