import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetch('https://auth-dhu1.onrender.com/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching message:', error))
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  console.log(session?.user?.email)
  console.log(session?.user?.user_metadata)

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  if (!session) {
    return (
      <>
        {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />; */}
        <button type='button' className='bg-blue-500 text-white p-2 rounded-md' onClick={signUp}>Sign in with Google</button>
      </>
    )
  }
  else {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-2xl font-bold'>Welcome, {session?.user?.user_metadata.name}</h2>
        <p className='text-lg'>Email: {session?.user?.email}</p>
        <p className='text-lg'>server message from hello route: {message}</p>
        <button type='button' className='bg-blue-500 text-white p-2 rounded-md' onClick={signOut}>Sign out</button>
      </div>
    )
  }
}