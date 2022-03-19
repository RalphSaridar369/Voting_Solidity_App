//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract VotingGame{

    address public owner;
    uint public fee;

    struct Question {
        string question;
        string option1;
        string option2;
    }

    Question[] public questions;

    constructor(){
        owner = msg.sender;
        fee = 5 * 10 ** 16;
    }



    modifier onlyOwner(){
        require(msg.sender == owner, "Address must be owner");
        _;
    }

    function createQuestion(string memory _question, string memory _opt1, string memory _opt2) public onlyOwner(){
        Question memory add = Question(_question,_opt1,_opt2);
        questions.push(add);
    }

    function changeFee(uint _fee) public onlyOwner(){
        fee = _fee;
    }
    
    function getQuestions() public view returns (Question[] memory) {
        return questions;
    }
}