import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Host from './host'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const token = JSON.parse(window.localStorage.getItem('token'))
  const [userBlog, setUserBlog] = useState([]);
  const [serachQuery, setSerachQuery] = useState('');
  const [render, setRender] = useState(false)
  const [pageUp, setPageUp] = useState(1);
  const [pageDown, setPageDown] = useState(0);
  const [userData, setUser] = useState({})

  // useEffect(() => {
  //   if(window.localStorage.getItem('token') == null) {
  //     return (
  //       <Redirect to="/" />
  //     )
  //   }
  // },[])


  useEffect(() => {
    axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
    //     axios.get('http://hrishabh.com:5000/')  
    // .then((res) => {
    //     console.log(res)
    //     setUserBlog(res.data)            
    // }).catch((err) => {
    //     console.log(err)
    // })

    const formData = new FormData()
    formData.set('page', pageUp)
    axios({
      method: 'get',
      url: `${Host()}/showPost`,      
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res) => {
      console.log(res)
      setUserBlog(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [pageUp])

  useEffect(() => {
    axios.defaults.headers.common["authentication"] = 'Bearer' + ' ' + token;
    axios.get(`${Host()}/user`, {})
    .then((res) => {
      console.log(res)
      setUser(res.data.data.user)
    }).catch((error) => {
      console.log(error)
    })
  }, [])



  const searchUser = (e) => {
    e.preventDefault()
    window.localStorage.setItem('query', serachQuery)
    props.history.push('/userSearch')
    // console.log(serachQuery)
    // axios.post('http://hrishabh.com:5000/search_user' , {
    //           query: serachQuery
    //       }).then((res) => {
    //           console.log(res)
    //           setSearchUserData(res.data)


    //       }).catch((err) => {
    //           console.log(err)
    //       })
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    props.history.push('login')
  }

  const pageGo = () => {
    setPageUp(Number(pageUp) + 1)
    console.log(pageUp)
  }

  const pageCome = () => {
    setPageUp(Number(pageUp) - 1)
    console.log(pageUp)
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >

          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Blogging
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>

            </div>
            {
              // console.log(userData)
              Object.keys(userData).length > 0 && userData.image ? <Link to='/userProfile'><img className="nav-profile-img rounded-circle img-fluid" src={`${Host()}/${userData.image.substring(6)}`} /></Link> : <p><Link to='/userProfile'><img className="nav-profile-img rounded-circle img-fluid" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' /></Link></p>
            }
            {/* <Link to='/userProfile'><img className="nav-profile-img rounded-circle img-fluid" src={`${Host()}${userData.user.image.substring(6)}`} /></Link> */}
          </div>
          <form onSubmit={searchUser} class="form-inline my-2 my-lg-0">
            <input onChange={(event) => setSerachQuery(event.target.value)} class="form-control mr-sm-2 ml-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0 ml-2" type="submit">Search</button>
          </form>
          <button onClick={logout} className="btn ml-2">Logout</button>
        </Toolbar>
      </AppBar>
      <div class="col-sm-6">        

        {
          userBlog != '' ? userBlog.map(({ title, body, image }) => {
            return (
              <div class="card card-body">
                <div class="card-heading">
                  <div class="media">                    
                    <img alt="" class="media-object img-rounded w-25" src={`${Host()}/${image.substring(6)}`} />

                    <div class="media-body ml-2">
                      <h4 class="media-heading">{title}</h4>
                      <p>{body}</p>
                    </div>
                  </div>

                </div>
              </div>
            )
          }) : <center><h4 className="card-heading">No Post Available</h4></center>
        }

        <br />
        <br />
        <br />

        {
          userBlog.length > 0 ? <>
          <button value={pageUp} onClick={pageCome} className="btn float-left">&larr; Previous</button>
          <button value={pageDown} onClick={pageGo} className="btn float-right">Next &rarr;</button>
          </>: null
        }

      </div>

    </div>
  );
}