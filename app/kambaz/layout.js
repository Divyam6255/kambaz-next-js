"use client";
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store, { setCurrentUser, clearCurrentUser } from './store';
import * as client from './client';

function KambazInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load current user on mount
    const loadCurrentUser = async () => {
      try {
        const user = await client.getCurrentUser();
        if (user) {
          console.log('✅ User loaded in layout:', user.username, 'Role:', user.role);
          dispatch(setCurrentUser(user));
        } else {
          dispatch(clearCurrentUser());
        }
      } catch (error) {
        console.log('Not authenticated or error fetching user');
        dispatch(clearCurrentUser());
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
