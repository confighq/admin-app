import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

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
  ruleDelete: {
    marginTop: '15px',
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
  cardTitle: {
    fontSize: 12,
  },
  responseInput: {
    margin: theme.spacing(1),
    width: '250px',
    align: 'center',
  }
}));

const default_schema = {
  name: "",
  combinator: "AND",
  groups: [],
  default: {
    type: "",
    value: ""
  },
  match: {
    type: "",
    value: ""
  }
}

const CreateQuery = () => {
  const classes = useStyles();
  const [query, setQuery] = useState(default_schema);

  const handleChangeName = (value)  => {
    let q = { ...query };
    q.name = value;
    setQuery({ ...q })
  }

  const addRule = (group) => {
    let q = { ...query };
    q.groups[group].rules.push({
      parameter: "",
      operator: "",
      value: ""
    })
    setQuery({ ...q })
  };

  const addGroup = () => {
    let q = { ...query };
    q.groups.push({
      combinator: "AND",
      rules: []
    })
    setQuery({ ...q })
  };

  const removeGroup = (group) => {
    let q = { ...query };
    q.groups.splice(group, 1);
    setQuery({ ...q })
  }

  const removeRule = (group_index, rule_index) => {
    let q = { ...query };
    q.groups[group_index].rules.splice(rule_index, 1);
    setQuery({ ...q })
  };

  const clearConfig = () => {
    let q = { ...query };
    q.groups = [];
    q.combinator = "AND";
    setQuery({ ...q })
  };

  const handleChangeParameter = (group_index, rule_index, rule_value) => {
    let q = { ...query };
    q.groups[group_index].rules[rule_index].parameter = rule_value;
    setQuery({ ...q })
  }

  const handleChangeOperator = (group_index, rule_index, rule_value) => {
    let q = { ...query };
    q.groups[group_index].rules[rule_index].operator = rule_value;
    setQuery({ ...q })
  }

  const handleChangeValue = (group_index, rule_index, rule_value) => {
    let q = { ...query };
    q.groups[group_index].rules[rule_index].value = rule_value;
    setQuery({ ...q })
  }

  const handleGroupsCombinators = (event, value)  => {
    let q = { ...query };
    q.combinator = value;
    setQuery({ ...q })
  }

  const handleRulesCombinators = (event, group_index, value)  => {
    let q = { ...query };
    q.groups[group_index].combinator = value;
    setQuery({ ...q })
  }

  const handleChangeDefaultValue = (value)  => {
    let q = { ...query };
    q.default.value = value;
    setQuery({ ...q })
  }

  const handleChangeMatchValue = (value)  => {
    let q = { ...query };
    q.match.value = value;
    setQuery({ ...q })
  }

  const handleCreate = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/query`, JSON.stringify(query))
    .then(response => {
      console.log(response.status);
    });
  }

  return (
    <Container
      maxWidth="md"
    >
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <TextField
            value={query.name}
            id="standard-basic-value"
            label="Lookup Name"
            style ={{width: '250px'}}
            onChange={(e) => handleChangeName(e.target.value)}
          />
          <br/>
          <p></p>
          <ToggleButtonGroup
           value={query.combinator}
           exclusive
           onChange={(e, val) => handleGroupsCombinators(e, val)}
           aria-label="text"
           className={classes.toggleGroup}
         >
           <ToggleButton value="AND" color="primary" className={classes.toggle}>
             AND
           </ToggleButton>
           <ToggleButton value="OR" color="primary" className={classes.toggle}>
             OR
           </ToggleButton>
         </ToggleButtonGroup>
         <Fab size="small" aria-label="add" className={classes.groupAdd} onClick={addGroup}>
          <AddIcon />
         </Fab>
         {query.groups.map((group, group_index) => (
           <p>
             <Card className={classes.root} variant="outlined" key={'group_' + group_index}>
               <CardContent>
                <form className={classes.root} noValidate autoComplete="off">
                  <div>
                    <ToggleButtonGroup
                      value={query.groups[group_index].combinator}
                      exclusive
                      onChange={(e, val) => handleRulesCombinators(e, group_index, val)}
                      aria-label="text"
                      className={classes.toggleGroup}
                    >
                      <ToggleButton value="AND" color="primary" className={classes.toggle}>
                        AND
                      </ToggleButton>
                      <ToggleButton value="OR" color="primary" className={classes.toggle}>
                        OR
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <Fab size="small" aria-label="add" className={classes.groupAdd} onClick={() => addRule(group_index)}>
                      <AddIcon />
                    </Fab>
                    <Fab size="small" aria-label="add" className={classes.groupDelete} onClick={() => removeGroup(group_index)}>
                      <DeleteIcon />
                    </Fab>
                  </div>
                </form>
                {group.rules.map((rule, rule_index) => {
                  const fieldName = `rules[${rule_index}]`;
                  const fieldName1 = JSON.stringify({'id': rule_index, 'field': 'logic'})

                  return (
                    <fieldset name={fieldName} key={fieldName}>
                      <TextField
                        id="standard-basic"
                        label="Parameter"
                        type="text"
                        value={query.groups[group_index].rules[rule_index].parameter}
                        name={`${fieldName}.parameter`}
                        onChange={(e) => handleChangeParameter(group_index, rule_index, e.target.value)}
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name={fieldName1}
                          value={query.groups[group_index].rules[rule_index].operator}
                          onChange={(e) => handleChangeOperator(group_index, rule_index, e.target.value)}
                        >
                          <MenuItem key={'EQUAL'} value={'EQUAL'}>EQUAL TO</MenuItem>
                          <MenuItem key={'NOT_EQUAL'} value={'NOT_EQUAL'}>NOT EQUAL TO</MenuItem>
                          <MenuItem key={'LESS_THAN'} value={'LESS_THAN'}>LESS THAN</MenuItem>
                          <MenuItem key={'GREATER_THAN'} value={'GREATER_THAN'}>GREATER THAN</MenuItem>
                          <MenuItem key={'LESS_THAN_EQUAL'} value={'LESS_THAN_EQUAL'}>LESS THAN OR EQUAL TO</MenuItem>
                          <MenuItem key={'GREATER_THAN_EQUAL'} value={'GREATER_THAN_EQUAL'}>GREATER THAN OR EQUAL TO</MenuItem>
                          <MenuItem key={'CONTAINS'} value={'CONTAINS'}>CONTAINS</MenuItem>
                          <MenuItem key={'NOT_CONTAINS'} value={'NOT_CONTAINS'}>NOT CONTAINS</MenuItem>
                          <MenuItem key={'IN'} value={'IN'}>IN</MenuItem>
                          <MenuItem key={'NOT_IN'} value={'NOT_IN'}>NOT IN</MenuItem>
                          <MenuItem key={'BEGINS_WITH'} value={'BEGINS_WITH'}>BEGINS WITH</MenuItem>
                          <MenuItem key={'ENDS_WITH'} value={'ENDS_WITH'}>ENDS WITH</MenuItem>
                          <MenuItem key={'EQUNOT_BEGINS_WITHAL'} value={'NOT_BEGINS_WITH'}>NOT BEGINS WITH</MenuItem>
                          <MenuItem key={'NOT_ENDS_WITH'} value={'NOT_ENDS_WITH'}>NOT ENDS WITH</MenuItem>
                          <MenuItem key={'IS_NULL'} value={'IS_NULL'}>IS NULL</MenuItem>
                          <MenuItem key={'IS_NOT_NULL'} value={'IS_NOT_NULL'}>IS NOT NULL</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField id="standard-basic-value" label="Value"
                        onChange={(e) => handleChangeValue(group_index, rule_index, e.target.value)}
                        value={query.groups[group_index].rules[rule_index].value}
                      />
                      <IconButton aria-label="upload picture" component="span" className={classes.ruleDelete} onClick={() => removeRule(group_index, rule_index)}>
                        <DeleteIcon />
                      </IconButton>
                    </fieldset>
                  );
                })}
              </CardContent>
            </Card>
          </p>
        ))}
        <p></p>
        <Card className={classes.root} variant="outlined" key={''}>
          <CardContent>
            <Typography className={classes.cardTitle} color="textSecondary">
              Response Values
            </Typography>
            <TextField
              value={query.default.value}
              id="standard-basic-value"
              label="Default Value"
              style ={{width: '250px'}}
              onChange={(e) => handleChangeDefaultValue(e.target.value)}
            />
            <TextField
              value={query.match.value}
              id="standard-basic-value"
              label="Match Value"
              style ={{width: '250px'}}
              onChange={(e) => handleChangeMatchValue(e.target.value)}
            />
          </CardContent>
        </Card>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" className={classes.createButton} onClick={() => handleCreate()}>Create</Button>
        <Link
         component="button"
         variant="body2"
         onClick={() => clearConfig()}
       >
         Clear
       </Link>
      </CardActions>
    </Card>
  </Container>
  );
};

export default CreateQuery;
