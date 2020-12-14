import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './components/home';
import UserProfile from './components/userProfile';
import AddPost from './components/addPost';
import userProfileChange from './components/userProfileChange';
import UserSearch from './components/userSearch';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/userProfile" component={UserProfile} />
      <Route path="/addPost" component={AddPost} />
      <Route path="/changeProfile" component={userProfileChange} />
      <Route path="/userSearch" component={UserSearch} />       
    </BrowserRouter>
  );
}

export default App;
