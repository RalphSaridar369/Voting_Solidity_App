import React, {useState,useEffect} from 'react';
import './Create.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Create = () => {

    const [data,setData] = useState({
        question:"",
        option1:"",
        option2:"",
    })

    const onChange = (type,value) =>{
        setData({...data,[type]:value})
    }

    const onSubmit = () =>{
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
        }
    }

    return (
        <div className='create'>
            <div className='input__container'>
                <TextField id="outlined-basic" value={data.question} onChange={(e)=>onChange("question",e.target.value)} label="Question" variant="outlined" className='input' />
                <TextField id="outlined-basic" value={data.option1} onChange={(e)=>onChange("option1",e.target.value)} label="Option 1" variant="outlined" className="input" />
                <TextField id="outlined-basic" value={data.option2} onChange={(e)=>onChange("option2",e.target.value)} label="Option 2" variant="outlined" className="input" />
                <Button variant="contained" className="button" onClick={onSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default Create