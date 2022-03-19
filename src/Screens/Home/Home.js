import React, { useEffect, useContext, useState } from 'react';
import './Home.css';
import { MainContext } from '../../MainContext';

const Home = () => {
  
  const [data, setData] = useState([]);
  const { contract, account } = useContext(MainContext)

  useEffect(() => {
    const getData = async () => {
      let questions = await contract.methods.getQuestions().call();
      console.log("questions: ", questions)
      setData(questions)
    }
    getData()
  }, [])
  
  const vote = async(id,val)=>{
    await contract.methods.vote(id,val).send({from:account})
    .once('receipt',(rec)=>{
      alert("Voted successfully");
    })
  }

  return (
    <div>
      {data.map((item, index) => {
        return <div className="question" key={index}>
          <p className='question__header'>{item.question}</p>
          <div className="question__option__container">
            <p>{item.option1}</p>
            <p>{item.option2}</p>
          </div>
          <div className="question__option__container">
            <button onClick={()=>vote(item.id,1)}>Vote {item.option1}</button>
            <button onClick={()=>vote(item.id,2)}>Vote {item.option2}</button>
          </div>
        </div>
      })}
    </div>
  )
}

export default Home