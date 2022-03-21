//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./Question.sol";

contract VotingGame{

    address payable public owner;
    
    uint public fee;
    uint public bid;
    uint public countQuestion;

    mapping(address => uint) public bidders; 
    mapping(uint => uint) public questionBalance;
    
    Question[] public questions;
    
    constructor(){
        owner = payable(msg.sender);
        fee = 5 * 10 ** 16;
        bid = 1 * 10 ** 18;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Address must be owner");
        _;
    }

    function vote(uint _question, uint _option) public payable {
        require(msg.value>=(fee + bid),"Value must be greater than both bid and fee");
        questions[_question].vote(_option,msg.sender,fee,bid);
        uint sum = fee + bid;
        questionBalance[_question]=sum;
        withdrawFee();
    }

    function closeQuestion (uint _id) public {
        questions[_id].closeQuestion();
        questions[_id].closeQuestion();
    }

    function getQuestions() public view returns (Question[] memory) {
        return questions;
    }

    function createQuestion(string memory _question, string memory _opt1, string memory _opt2) public onlyOwner(){
        Question add = new Question(countQuestion,_question,_opt1,_opt2);
        questions.push(add);
        countQuestion++;
    }

    function changeFee(uint _fee) public onlyOwner(){
        fee = _fee;
    }

    function changeBid(uint _bid) public onlyOwner(){
        bid = _bid;
    }

    function withdraw() public onlyOwner() {
        require(address(this).balance>0,"Balance is empty");
        owner.transfer(address(this).balance);
    }

    function withdrawFee() internal {
        owner.transfer(fee);
    }
}