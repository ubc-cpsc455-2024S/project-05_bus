import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAsync } from './redux/users/thunks.js'
import { getGroupsAsync } from './redux/groups/thunks.js'
import { REQUEST_STATE } from "./redux/utils.js"

export default function App() {
  const dispatch = useDispatch();
  const isUsersLoaded = useSelector(state => state.users.getUsers === REQUEST_STATE.FULFILLED);
  const isGroupsLoaded = useSelector(state => state.groups.getGroups === REQUEST_STATE.FULFILLED);

  useEffect(() => {
    if (!isUsersLoaded) {
      dispatch(getUsersAsync());
    }
    if (!isGroupsLoaded) {
      dispatch(getGroupsAsync());
    }
  }, [dispatch, isUsersLoaded, isGroupsLoaded]);

 return (
  <Router>
    <Layout />
  </Router>
  );
}
