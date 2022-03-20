import React, { useEffect, useContext, useState } from 'react';
import './Home.css';
import { MainContext } from '../../MainContext';
import Web3 from 'web3';
import Questions from '../../abis/Question.json';
import { divideBy, multiplyBy } from '../../helpers';

const Home = () => {
  
  const [data, setData] = useState([]);
  const { contract, account, price } = useContext(MainContext)

  useEffect(() => {
    const getData = async () => {
      
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

      const networkId = await web3.eth.net.getId();
      // const QuestionsData = Questions.networks[networkId];

      let questions = await contract.methods.getQuestions().call();
      let array = [];
      await questions.map(async(item,index)=>{
        console.log("questions: ", item)
        const QuestionContract = new web3.eth.Contract(Questions.abi, item);
        let votes = await QuestionContract.methods.votes().call();
        let id = await QuestionContract.methods.id().call();
        let ques = await QuestionContract.methods.question().call();
        let option1 = await QuestionContract.methods.option1().call();
        let option2 = await QuestionContract.methods.option2().call();
        let votedFor = await QuestionContract.methods.checkVote(account).call();


        let payload =
        {
          id:id,
          question:ques,
          option1,
          option2,
          votedFor,
          votes
        }
        console.log("Name: ",ques);
        array.push(payload)
      })
      await   setData(array)
      await console.log("data:",array)
    }
    getData()
  }, [])
  
  const vote = async(id,val)=>{
    console.log("Fee",price.fee,"bid",price.bid)
    let total = parseInt(price.fee) + parseInt(price.bid);
    console.log("total",total)
    await contract.methods.vote(id,val).send({from:account, value:(parseInt(price.fee) + parseInt(price.bid)).toString()})
    .once('receipt',(rec)=>{
      alert("Voted successfully");
    })
  }

  return (
    <div>
      {data?.map((item, index) => {
        return <div className="question" key={index}>
          <h2>{item.votes} voted so far</h2>
          <h1 className='question__header'>{item.question}</h1>
          <div className="question__option__container">
            <p>{item.option1}</p>
            <p>{item.option2}</p>
          </div>
          <div className="question__option__container">
           {item.votedFor == "0" ?
           <><button onClick={()=>vote(item.id,1)}>Vote {item.option1}</button>
            <button onClick={()=>vote(item.id,2)}>Vote {item.option2}</button>
          </>:
          <p>You already voted for this question: {item.votedFor=="1"?item.option1:item.option2}</p>}
          </div>
        </div>
      })}
    </div>
  )
}

export default Home