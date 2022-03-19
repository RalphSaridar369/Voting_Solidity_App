import './App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { MainContext } from './MainContext';
import Header from './Components/Header/Header';
import Drawer from './Components/Drawer/Drawer';
import Home from './Screens/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Help from './Screens/Help/Help';
import Dashboard from './Screens/Dashboard/Dashboard';
import VotingGame from './abis/VotingGame.json';
import Create from './Screens/Create/Create';

function App() {
  const [account, setAccount] = useState(); // state variable to set account.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contract, setContract] = useState();
  const [owner, setOwner] = useState();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const VotingGameData = VotingGame.networks[networkId];

      if (VotingGameData) {
        const VotingGameContract = new web3.eth.Contract(VotingGame.abi, VotingGameData.address);
        const owner = await VotingGameContract.methods.owner().call()
        setContract(VotingGameContract);
        setOwner(owner);
      }
    }

    load();
  }, []);



  return (
    <div className="App">
      <MainContext.Provider value={{ account, drawerOpen, contract, owner, setOpenDrawer: (val) => setDrawerOpen(val) }}>
        <Router>
          <Header />
          <div className="App__content">
            <Drawer />
            <div className="App__content__inner"
              style={{ marginLeft: drawerOpen ? "290px" : "0px" }}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/help">
                  <Help />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/create">
                  <Create />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </MainContext.Provider>
    </div>
  );
}

export default App;
