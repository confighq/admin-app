import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('geo-service', 159, 6.0, 24, 4.0),
  createData('admin-account', 237, 9.0, 37, 4.3),
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  toggle: {
    thumbOnColor: 'yellow',
    trackOnColor: 'red'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '150px',
      align: 'center',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  groupDelete: {
    marginTop: '15px',
    marginLeft: '10px',
    backgroundColor: '#E74C3C',
  },
  queryEdit: {
    marginLeft: '10px',
    color: '#808080',
    backgroundColor: '#FFFFFF',
  },
  queryView: {
    marginLeft: '10px',
    color: '#808080',
    backgroundColor: '#FFFFFF',
  },
  queryDelete: {
    marginLeft: '10px',
    color: '#E74C3C',
    backgroundColor: '#FFFFFF',
  },
  groupAdd: {
    color: 'white',
    backgroundColor: '#2ECC71',
    margin: theme.spacing(1),
  },
  groupDelete: {
    color: 'white',
    backgroundColor: '#E74C3C',
    margin: theme.spacing(1),
  },
  toggleGroup: {
    thumbOnColor: 'yellow',
    trackOnColor: 'red',
    marginRight: '15px',
  },
  createButton: {
    backgroundColor: '#3498DB',
    color: '#ffffff',
  },
  table: {
    minWidth: 650,
  },
  viewButton: {
    margin: theme.spacing(1),
  },
}))

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/v1/query`)
    .then(response => {
      if (response.data !== null) {
        setQueries(response.data)
      }
    });
  },[])

  return (
    <div>
      <div>
        <Fab size="small" aria-label="add" className={classes.groupAdd} component="a" href="/createquery">
          <AddIcon />
        </Fab>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Query Name</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((query) => (
                <TableRow key={query.name}>
                  <TableCell component="th" scope="row">
                    {query.name}
                  </TableCell>
                  <TableCell align="right">
                  </TableCell>
                  <TableCell align="right">
                  <IconButton aria-label="" component="span" className={classes.queryView} component="a" href={"/query/" + query.name}>
                     <Visibility />
                   </IconButton>
                   <IconButton aria-label="" component="span" className={classes.queryEdit} component="a" href={"/query/" + query.name}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="" component="span" className={classes.queryDelete} onClick={() => console.log()}>
                       <DeleteIcon />
                     </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Queries;
