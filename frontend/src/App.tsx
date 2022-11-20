import UserInterface from './components/UserInterface';
import AppBar from './components/AppBar';
import Main from './components/Main';
import { createContext } from "react";
import useLoggedUser from './hooks/useLoggedUser';


export const UserContext = createContext<any | null>(null)

const App = () => {
  const user = useLoggedUser();

  return (
    <div>
      <UserContext.Provider value={user}>
        <UserInterface />
        <AppBar />
        <Main />
      </UserContext.Provider>

    </div >
  );
}

export default App;
