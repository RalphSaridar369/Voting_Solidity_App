import React, {useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Web3 from 'web3';
import VotingGame from '../../abis/VotingGame.json';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

      const networkId = await web3.eth.net.getId();
      const VotingGameData = VotingGame.networks[networkId];

      if (VotingGameData) {
        const VotingGameContract = new web3.eth.Contract(VotingGame.abi, VotingGameData.address);
        const dataArray = await VotingGameContract.methods.returnBidders().call();
        let dataarray = [];
        dataArray.map(async(item)=>{
          let bids = await VotingGameContract.methods.bidders(item).call();
          dataarray.push({
            account:item,
            bids
          })
        })
        setData(dataarray);
        console.log(dataArray);
      }
      else{
        alert ("please switch network")
      }
    }
      load()
  },[])
  return (
    <div className="dashboard" style={{display:'flex',justifyContent:'center'}}>
        <div className="dashboard__content">
            <h1 style={{textAlign:'center'}}>Most bidded addresses</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} lg={{ maxWidth: 1000}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell align="right">Bids</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data?.sort((a,b)=>a.bids<b.bids?1:-1)?.map((item,index)=><TableRow key={index}> 
                  <TableCell>{item.account}</TableCell>
                  <TableCell align="right">{item.bids}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
    </div>
  )
}

export default Dashboard