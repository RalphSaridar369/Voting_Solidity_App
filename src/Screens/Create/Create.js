import React, {useState,useEffect, useContext} from 'react';
import './Create.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {MainContext} from '../../MainContext'
import { multiplyBy } from '../../helpers';

const Create = () => {
    const {account, contract, owner} = useContext(MainContext)
    const [data,setData] = useState({
        question:"",
        option1:"",
        option2:"",
    })
    const [bid,setBid] = useState();
    const [fee,setFee] = useState();

    useEffect(()=>{
        if(owner != account)
            window.location.href="/"
    },[])

    const onChange = (type,value) =>{
        setData({...data,[type]:value})
    }

    const onSubmit = async() =>{
        let valid = true;
        Object.keys(data).map((item,index)=>{
            if(data[item].length<1){
                alert(`${item} is empty`)
                valid=false;
                return
            }
        })
        if(valid){
            console.log(data)
            let {question,option1,option2} = data;
            await contract.methods.createQuestion(question,option1,option2).send({from: account})
            .once('receipt',(receipt)=>{
                alert("Question created successfully");
            });
        }
    }

    const changeFee = async() =>{
        if(fee){
            await contract.methods.changeFee(multiplyBy(fee)+"").send({from: account})
            .once('receipt',(receipt)=>{
                alert("Fee changed successfully");
            });;
        }
    }

    const changeBid = async() =>{
        if(fee){
            await contract.methods.changeBid(multiplyBy(bid)+"").send({from: account})
            .once('receipt',(receipt)=>{
                alert("Bid changed successfully");
            });;
        }
    }

    return (
        <div className='create'>
            <div className='input__container'>
                <h1>Add a question</h1>
                <TextField id="outlined-basic" value={data.question} onChange={(e)=>onChange("question",e.target.value)} label="Question" variant="outlined" className='input' multiline/>
                <TextField id="outlined-basic" value={data.option1} onChange={(e)=>onChange("option1",e.target.value)} label="Option 1" variant="outlined" className="input" />
                <TextField id="outlined-basic" value={data.option2} onChange={(e)=>onChange("option2",e.target.value)} label="Option 2" variant="outlined" className="input" />
                <Button variant="contained" className="button" onClick={onSubmit}>Submit</Button>
            </div>
            <div className='input__container'>
                <h1>Change</h1>
                <TextField id="outlined-basic" value={fee} onChange={(e)=>setFee(e.target.value)} label="Change Fee" variant="outlined" className='input' multiline/>
                <Button variant="contained" className="button" onClick={changeFee}>Change Fee</Button>
                <TextField id="outlined-basic" value={bid} onChange={(e)=>setBid(e.target.value)} label="Change Bid" variant="outlined" className="input" />
                <Button variant="contained" className="button" onClick={changeBid}>Change Bid</Button>
            </div>
        </div>
    )
}

export default Create