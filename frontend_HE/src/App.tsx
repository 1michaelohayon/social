import AppBar from './components/AppBar';
import MessagesList from './components/Messages/MessagesList';
import { createContext } from "react";
import useLoggedUser from './hooks/useLoggedUser';
import UserPage from './components/UserInterface/UserPage';
import UserSettings from './components/UserInterface/UserSettings';
import MessagePage from './components/Messages/MessagePage';
import { AppContainer, MainContainer } from './theme';



import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'

export const UserContext = createContext<any | null>(null)

const App = () => {
    const user = useLoggedUser();

    return (
        <Router>
            <AppContainer>
                <UserContext.Provider value={user}>
                    <AppBar />
                    <MainContainer>
                        <Routes>
                            <Route path="/" element={<MessagesList />} />
                            <Route path="/settings" element={<UserSettings />} />
                            <Route path="/message/*" element={<MessagePage />} />
                            <Route path="/*" element={<UserPage />} />
                        </Routes>
                    </MainContainer>
                </UserContext.Provider>
            </AppContainer >
        </Router>
    );
}

export default App;
