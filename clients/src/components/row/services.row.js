import React, { useEffect, useState } from "react";
import {TableRow,TableCell,Checkbox,Collapse,Typography,Box,Table,TableBody,TableHead,makeStyles,} from "@material-ui/core";

import { ExpandLessOutlined, ExpandMoreOutlined } from "@material-ui/icons";
import ServiceApiCall from "../../apiCall/service.api";

const styles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  hover: {
    cursor: "pointer",
  },
}));
function MoreInfo(props) {
  const { expanded, style, info, row } = props;
  const [infoShow, setInfoShow] = useState();

  
  useEffect(()=>{
    const getMoreInfo = async() =>{
      try {
          if (info === 'serviceType'){
              let res = await ServiceApiCall.getServiceTypeInfo(row.id)
              console.log(res)
              setInfoShow(res)
          }
          else if (info === 'rental'){
              let res = await ServiceApiCall.getRoomInfo(row.id)
              console.log(res)
              setInfoShow(res)
          }
      } 
      catch (e){
          console.log(e)
      }
    }
    getMoreInfo()
  },[info,row.id])
return (
    <TableRow className={style.root}>
        <TableCell colSpan='100%' style={{ paddingBottom: 0, paddingTop: 0 }} >
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        Detail
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>Key</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                infoShow ? 
                                 Object.keys(infoShow[0]).map((key,index)=>{
                                     return (
                                         <TableRow key={index}>
                                             <TableCell>{key}</TableCell>
                                             <TableCell>{infoShow[0][key]}</TableCell>
                                         </TableRow>
                                     )
                                 })
                                :
                                <TableRow><TableCell>waiting....</TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
)
}

export default function ServiceRow(props) {
  const style = styles();
  const [expanded, setExpanded] = useState(false);
  const [info, setInfo] = useState();
  const { row, handleClick, isItemSelected, labelId, Headers } = props;
  const onClickShow = (e) => {
    setExpanded(!expanded);
    console.log(e.target.parentNode.id)
    if (e.target.id === "open") setInfo(e.target.parentNode.id);
  
  };
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
        className={style.hover}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>
        {Headers.map((Header, index) => {
          return (
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              style={{ padding: "1" }}
              align="right"
              key={index}
            >
              {!["serviceType", "rental"].includes(Header) ? (
                <Typography component={"div"}>
                  {row[Header].toString()}
                </Typography>
              ) : (
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="flex-end"
                  id={Header}
                >
                  <span style={{ padding: "0 1rem" }}>
                    {row[Header].toString()}
                  </span>
                  {expanded ? (
                    <ExpandLessOutlined
                      onClick={onClickShow}
                      className={style.hover}
                      id="close"
                    />
                  ) : (
                    <ExpandMoreOutlined
                      onClick={onClickShow}
                      className={style.hover}
                      id="open"
                    />
                  )}
                </Box>
              )}
            </TableCell>
          );
        })}
      </TableRow>
      <MoreInfo expanded={expanded} info={info} row={row} style={style} />
    </React.Fragment>
  );
}
