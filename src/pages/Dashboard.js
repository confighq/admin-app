import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    fontSize: 18,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container
      maxWidth="md"
    >
      <Card className={classes.root} variant="outlined">
        <CardContent>
        <Typography className={classes.cardTitle} color="textSecondary">
         Dashboard
       </Typography>
       <p>&nbsp;</p>
      </CardContent>
     </Card>
    </Container>
  );
}

export default Dashboard;
