import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { postUserByEmailAsync } from "../redux/users/thunks";
import { unwrapResult } from "@reduxjs/toolkit";
import { setCurrentUserID, setCurrentUserName } from "../redux/users/usersSlice";
import { setSelectedMemberID } from '../redux/groups/groupsSlice';

export function CallbackPage() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      if (!isLoading) {
        try {
          if (isAuthenticated && user) {
            const result = await dispatch(postUserByEmailAsync(user.email));
            const newUser = unwrapResult(result);
            console.log(newUser);
            dispatch(setCurrentUserID(newUser._id));
            dispatch(setSelectedMemberID(newUser._id));
            const name = newUser.firstName + " " + newUser.lastName;
            dispatch(setCurrentUserName(name));
            navigate('/home');
          }
        } catch (error) {
          console.error("Error processing user after login:", error);
        }
      }
    };

    handleAuth();
  }, [isAuthenticated, isLoading, user, dispatch, navigate]);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return <h1>Success</h1>;
}