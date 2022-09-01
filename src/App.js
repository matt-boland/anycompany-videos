import logo from './logo.svg';
import './App.css';
import { Flex } from '@aws-amplify/ui-react';
import { Ampligram, NavBar, SideBar } from './ui-components';


function App() {
  return (
    <div className="App">
      <NavBar overrides={{"Logo29767075": {children: "Any Company"}}} />
      <Flex direction="row">
        <SideBar />
        <Ampligram />
      </Flex>
    </div>
  );
}

export default App;
