import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Paper,
  Avatar,
  TextField,
  Button
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
       padding: '0.5rem' 
    },
    avatar: {
        boxShadow: theme.shadows[2],
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
  }),
);

const Profile = ({ auth, isAuthenticated }) => {
    const classes = useStyles();
    let name, email;
    if(auth.user && auth.user.name && auth.user.email) {
        name = auth.user.name;
        email = auth.user.email;
    }
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
        <Container className={classes.container} maxWidth="sm">
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar} src={auth.user.avatar_url}></Avatar>
                <TextField
                    id="standard-text-input"
                    label={name}
                    type="text"
                    margin="dense"
                    fullWidth
                />
                <TextField
                    id="standard-email-input"
                    label={email}
                    type="text"
                    margin="dense"
                    fullWidth
                />
                <Button>Save</Button>
              </Paper>
        </Container>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Profile);
