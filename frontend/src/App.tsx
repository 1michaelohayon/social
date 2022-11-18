import React from 'react';
import useSignIn from './hooks/useSignIn';
import { Credentials } from './types';
import AppBar from './components/AppBar';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';



const App = () => {
  const { signIn, result } = useSignIn();
  const onClick = async (values: Credentials) => {
    try {
      const data = await signIn(values);
      console.log('Data ', data);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div>
      <AppBar />
      <MessagesList />
      <button onClick={() => onClick({ username: "canary@birds.com", password: "lol" })}>click me</button>
      <MessageForm />
    </div >
  );
}

export default App;
