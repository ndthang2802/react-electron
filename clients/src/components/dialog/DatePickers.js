import React from "react";
import {Box, TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
  const {label,name,handleChoose,selectedDate} = props
  return (
    <Box className={classes.container} noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        name={name}
        value= {selectedDate}
        className={classes.textField}
        onChange={handleChoose}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}