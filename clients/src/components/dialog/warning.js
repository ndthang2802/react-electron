import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Grid,makeStyles,Box } from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    dialogTitle:{
      width:'100%',
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    dialogContent:{
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      minHeight: '40vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems:'center',
      flexDirection: 'column',
      flexWrap :'wrap',
      gap:'2rem'
    }
  }));
export default function Warning(props){
    const {open,handleClose} = props
    const classes = useStyles()
    return (
        <Dialog
        maxWidth='md'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <React.Fragment>
          <DialogTitle id="alert-dialog-slide-title"><b>No room selected</b></DialogTitle>
          <DialogContent>Please choose a room</DialogContent>
        </React.Fragment>
      
        <DialogActions>
        <Grid container item xs={12} >
              <Box display='flex' justifyContent='flex-end' width='100%'>
                <Button
                  type="button"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClose}
                >
                Close <CloseOutlined className={classes.rightIcon} />
                </Button>
              </Box>
            </Grid>
        </DialogActions>
      </Dialog>
    )
}