"use client";
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store, { setCurrentUser } from './store';
import * as client from './client';

function KambazInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load current user on mount
    const loadCurrentUser = async () => {
      try {
        const user = await client.getCurrentUser();
        if (user) {
          dispatch(setCurrentUser(user));
        }
      } catch (error) {
        console.log('Not authenticated or error fetching user');
      }
    };
    
    loadCurrentUser();
  }, [dispatch]);

  return <>{children}</>;
}

export default function KambazLayout({ children }) {
  return (
    <Provider store={store}>
      <KambazInitializer>{children}</KambazInitializer>
    </Provider>
  );
}
