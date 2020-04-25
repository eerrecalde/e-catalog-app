import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import RouterSwitch from './Router';
import './App.css';
import useLocalStorage from './hooks/use-localstorage';
import Header from './components/header/header';
import { ThemeContext, AuthContext } from './context';

function App() {
  const [theme, setTheme] = useLocalStorage('theme');
  const [authState, setAuthState] = useState('');

  // const auth = Auth.get
  console.log('Auth', Auth);

  Auth.currentAuthenticatedUser()
    .then((e) => {
      console.log('Auth.currentAuthenticatedUser()', e);
      setAuthState('signedIn');
    })
    .catch((err) => {
      console.log('Auth.currentAuthenticatedUser() err', err);
      setAuthState('signedOut');
    });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <AuthContext.Provider
        value={{
          authState,
          setAuthState,
        }}
      >
        <Router>
          <Header />
          <RouterSwitch />
        </Router>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

// export default withAuthenticator(App, { includeGreetings: true });
export default App;
