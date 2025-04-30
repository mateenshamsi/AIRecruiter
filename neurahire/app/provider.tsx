'use client'; // important for Next.js app folder

import { UserDetailContext } from '@/context/UserContext';
import { supabase } from '@/services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const createNewUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error getting user:', error);
        return;
      }

      if (!user) {
        console.log('No user found');
        return;
      }

      // Check if user already exists
      const { data: users, error: fetchError } = await supabase
        .from('us')
        .select('*')
        .eq('email', user.email);

      if (fetchError) {
        console.error('Error fetching user:', fetchError);
        return;
      }

      if (users.length === 0) {
        const { data: insertedData, error: insertError } = await supabase
          .from('us')
          .insert([
            {
              name: user.user_metadata?.name || '',
              email: user.email,
              photo: user.user_metadata?.photo || '',
            },
          ])
          .select() // fetch back the inserted user
          .single(); // because only one is inserted

        if (insertError) {
          console.error('Error inserting user:', insertError);
        } else {
          console.log('New user inserted:', insertedData);
          setUser(insertedData);
        }
      } else {
        console.log('User already exists:', users[0]);
        setUser(users[0]);
      }
    };

    createNewUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user,setUser}}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
export const useUser=()=>{
  const context = useContext(UserDetailContext)
  return context 
}