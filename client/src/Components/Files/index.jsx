import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Icon,
  Popover,
  Switch,
  Button,
  LinearProgress,
} from '@material-ui/core';
import { 
  createStyles, 
  makeStyles, 
} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { getFiles, deleteFile } from '../../store/actions/fileActions';


const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem'
    },
    paper: {
        padding: '0.5rem',
        fontFamily: 'roboto'
    },
    uploadSection: {
        padding: '0.5rem',
        margin: '0.5rem auto',
        boxShadow: theme.shadows[2],
        textAlign: 'center'
    },
    listItem: {
        boxShadow: theme.shadows[2]
    },
    fileInput: {
        display: 'block',
        width: '60%',
        borderRadius: '4rem',
        backgroundColor: '#eee',
        padding: '1em',
        margin: '1rem auto'
    },
    btn: {
        margin: '1rem auto'
    },
    alert: {
        width: '50%',
        margin: '1rem auto',
        justifyContent: 'center'
    }
  }),
);

 function Files({ isAuthenticated, files, getFiles, deleteFile}) {

    useEffect(()=> {
        getFiles();
    }, [getFiles])


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [checked, setChecked] = useState(false);
    const handleSharePopup = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSharePopupClose = () => {
        setAnchorEl(null);
    };

    const handleShareToggle = () => {
        setChecked(!checked)
    };
    const handleDeleteFile = (id) => {
        deleteFile(id);
    }
    const open = Boolean(anchorEl);
    return (
        <>
            {files && files.map(file=>(
                <Grid key={file._id} item xs={12}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar><Avatar src={file.user.avatar_url}></Avatar></ListItemAvatar>
                            <ListItemText primary={file.original_name} secondary={file.uploaded_date.toLocaleString()}/>
                            <IconButton>
                                <Icon>cloud_download</Icon>
                            </IconButton>
                            <IconButton onClick={handleSharePopup}>
                                <Icon>share</Icon>
                            </IconButton>
                            <IconButton onClick={() => handleDeleteFile(file._id)}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </ListItem>
                        <Popover 
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleSharePopupClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            >
                            <Paper className={classes.paper}>
                                <span>Public Sharing:</span> 
                                <Switch
                                    checked={checked}
                                    onChange={handleShareToggle}
                                    color="success"
                                    name="shareToggler"
                                />
                            </Paper>
                        </Popover>
                    </List>
                </Grid>
            ))}
        </>
    )
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth,
        isAuthenticated: state.auth.isAuthenticated,
        files: state.files.files
      })
};

export default connect(mapStateToProps, {getFiles, deleteFile})(Files);
