import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsersAsync } from './redux/users/thunks.js'
import { getGroupsAsync } from './redux/groups/thunks.js'

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupsAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

 return (
  <Router>
    <Layout />
  </Router>
  );
}
