//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract VotingGame{

    address public owner;
    
    uint public fee;
    uint public bid;
    uint public countQuestion;

    mapping(address => uint) public bidders; 

    struct Question {
        uint id;
        string question;
        string option1;
        string option2;
        uint voted1;
        uint voted2;
        mapping(address => bool) voted1Addresses;
        mapping(address => bool) voted2Addresses;
    }

    Question[] public questions;
    
    constructor(){
        owner = msg.sender;
        fee = 5 * 10 ** 16;
        bid = 1 * 10 ** 18;
    }



    modifier onlyOwner(){
        require(msg.sender == owner, "Address must be owner");
        _;
    }

    function vote(uint _question, uint _option) public {
        if(_option == 1){
            questions[_question].voted1++;
            questions[_question].voted1Addresses[msg.sender]=true;
        }
        else{
            questions[_question].voted2++;
            questions[_question].voted2Addresses[msg.sender]=true;
        }
    }

    function createQuestion(string memory _question, string memory _opt1, string memory _opt2) public onlyOwner(){
        Question memory add = Question(countQuestion,_question,_opt1,_opt2,0,0);
        questions.push(add);
        countQuestion++;
    }

    function changeFee(uint _fee) public onlyOwner(){
        fee = _fee;
    }

    function changeBid(uint _bid) public onlyOwner(){
        bid = _bid;
    }
    
    function getQuestions() public view returns (Question[] memory) {
        return questions;
    }
}