import UserInterface from './components/UserInterface';
import AppBar from './components/AppBar';
import Main from './components/Main';
import { createContext } from "react";
import useLoggedUser from './hooks/useLoggedUser';
import UserPage from './components/UserInterface/UserPage';
import UserSettings from './components/UserInterface/UserSettings';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

export const UserContext = createContext<any | null>(null)

const App = () => {
  const user = useLoggedUser();

  return (
    <Router>
      <div>
        <UserContext.Provider value={user}>
          <UserInterface />
          <AppBar />
        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/*" element={<UserPage />} />

        </Routes>
        </UserContext.Provider>
      </div >
    </Router>
  );
}

export default App;
