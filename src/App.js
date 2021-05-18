import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import TableChartIcon from '@material-ui/icons/TableChart';
import Link from '@material-ui/core/Link';
import CreateQuery from "./pages/CreateQuery";
import EditQuery from "./pages/EditQuery";
import Queries from "./pages/Queries";
import Dashboard from "./pages/Dashboard";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Router>


      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            configHQ
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
          <ListItem button component="a" href="/dashboard" key={'text'}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem button component="a" href="/queries" key={'text'}>
            <ListItemIcon><TableChartIcon /></ListItemIcon>
            <ListItemText primary={'Queries'} />
          </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem button component="a" href="/" key={'text'}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
          <ListItem button component="a" href="/" key={'text'}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={'Account'} />
          </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route path="/createquery" component={CreateQuery} />
          <Route path="/query/:query_name" component={EditQuery} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/queries" component={Queries} />
        </Switch>
      </main>
      </Router>
    </div>
  )


}

export default App;
