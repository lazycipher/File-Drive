import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  IconButton,
  Icon,
  Popover,
  Switch
} from '@material-ui/core';
import { 
  createStyles, 
  makeStyles, 
} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

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
        boxShadow: theme.shadows[2]
    },
    listItem: {
        boxShadow: theme.shadows[2]
    }
  }),
);

const Dashboard = ({ auth, isAuthenticated }) => {
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
    const open = Boolean(anchorEl);

    if(!isAuthenticated){
        return(
            <Container className={classes.container} maxWidth="sm">
              <Paper className={classes.paper}>
                <Alert variant="outlined" severity="error">Please Login to Continue</Alert>
              </Paper>
            </Container>
        )
    }
 
    return(
        <Container className={classes.container} maxWidth="md">
            <Grid container>
                <Grid className={classes.uploadSection} item xs={12}>
                    UPLOAD SECTION
                </Grid>
                <Grid item xs={12}>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem className={classes.listItem}>
                        <ListItemAvatar><Avatar src={auth.user.avatar_url}></Avatar></ListItemAvatar>
                        <ListItemText primary="FileName.pdf" />
                        <IconButton>
                            <Icon>cloud_download</Icon>
                        </IconButton>
                        <IconButton onClick={handleSharePopup}>
                            <Icon>share</Icon>
                        </IconButton>
                        <IconButton>
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
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Dashboard);
