import React from 'react';
import { Toolbar,Typography,Tooltip, IconButton } from '@material-ui/core';
import {FilterList} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableToolBarStyles } from './styles';
import propTypes from 'prop-types'
import clsx from 'clsx';
export default function TableToolBar(props){
    const {numberSelected,tableName} = props
    const header_styles = TableToolBarStyles()
    return (
        <Toolbar className={clsx(header_styles.root,{[header_styles.highlight]: numberSelected > 0})}>
            {
                numberSelected > 0 ?
                (<Typography  className={header_styles.title} color="inherit" variant='h5' component='div' >1 row selected</Typography>) 
                :
                (<Typography  className={header_styles.title} variant='h5' component='div' >{tableName}</Typography>)
            }
            {numberSelected > 0 ? 
                (
                    <Tooltip title='delete' >
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                    </Tooltip>
                )
                :
                (
                    <Tooltip title='filter list' >
                            <IconButton>
                                <FilterList />
                            </IconButton>
                    </Tooltip>
                )
            }
        </Toolbar>
    )
}

TableToolBar.propTypes = {
    numberSelected: propTypes.number.isRequired
}