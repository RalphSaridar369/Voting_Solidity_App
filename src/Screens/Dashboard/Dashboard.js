import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Dashboard.css';

const Dashboard = () => {
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
                <TableRow>
                <TableCell>103221x01223</TableCell>
                <TableCell align="right">10</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>103221x01223</TableCell>
                <TableCell align="right">10</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>103221x01223</TableCell>
                <TableCell align="right">10</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </div>
    </div>
  )
}

export default Dashboard