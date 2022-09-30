import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// imports from Amplify library
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Videos from "./routes/videos";
import Player from "./routes/player";

// import query definition
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

class App extends React.Component {

render() {
  return (
    <Router>

      <div className='navbar'>
        <div className='authContainer'>
          <Authenticator>
            {({ signOut, user }) => (
              <button className='signOutButton' onClick={signOut}>Sign out</button>
            )}
          </Authenticator>
        </div>
        <h1>Any Company</h1>
        <ul>
          <li>
            <Link to="/">Videos</Link>
          </li>
          <li>
            <Link to="/video-player">Video Player</Link>
          </li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="" element={<Videos /> } />
          <Route path="video-player" element={<Player />} />
        </Routes>
      </div>
      <div className='footer'>Privacy | Site terms | Cookie policy</div>
    </Router>
  );}
}

export default withAuthenticator(App);
