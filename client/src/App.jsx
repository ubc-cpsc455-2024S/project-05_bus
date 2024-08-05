import { useEffect } from 'react';
import './App.css';
import Layout from './Layout';
import { useDispatch } from 'react-redux';
import { getUsersAsync } from './redux/users/thunks';
import { getGroupsAsync } from './redux/groups/thunks';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupsAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <Layout />
  );
}
