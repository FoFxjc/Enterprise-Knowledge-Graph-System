import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchBar from './components/search/SearchBar';
import GraphView from './views/GraphView';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [cypher, setCypher] = React.useState("");
  const handleSearchResult = (result) => {
    if(result){
      setCypher(`match(n:Technology{longName:'${result.name}'})-[r]->(m) return *`);
    }
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, {[classes.appBarShift]: open})}
        position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton className={clsx(classes.menuButton, open && classes.hide)}
            aria-label="menu"
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            EKGS
          </Typography>
          <SearchBar onSearchResult={handleSearchResult}/>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
      </Drawer>
      <main className={clsx(classes.content, {[classes.contentShift]: open})}>
        <div className={classes.drawerHeader} />
        <GraphView cypher={cypher}/>
      </main>
    </div>
  );
}