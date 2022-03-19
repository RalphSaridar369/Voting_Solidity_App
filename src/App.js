import './App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { MainContext } from './MainContext';
import Header from './Components/Header/Header';
import Drawer from './Components/Drawer/Drawer';
import Home from './Screens/Home/Home';

function App() {
  const [account, setAccount] = useState(); // state variable to set account.
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    }
    
    load();
   }, []);

  
  
  return (
    <div className="App">
      <MainContext.Provider value={{account, drawerOpen, setOpenDrawer:(val)=>setDrawerOpen(val)}}>
        <Header />
        <div className="App__content">
          <Drawer />
          <div class="App__content__inner"
          style={{marginLeft:drawerOpen?"240px":"0px"}}>
            <Home />
          </div>
        </div>
      </MainContext.Provider>
    </div>
  );
}

export default App;
