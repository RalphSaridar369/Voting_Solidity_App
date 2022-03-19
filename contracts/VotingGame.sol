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

    constructor(){
        owner = msg.sender;
        fee = 5 * 10 ** 16;
    }


    Question[] public questions;

    modifier onlyOwner(){
        require(msg.sender == owner, "Address must be owner");
        _;
    }

    function createQuestion(string memory _question, string memory _opt1, string memory _opt2) public onlyOwner(){
        questions.push(Question(_question,_opt1,_opt2));
    }

    function changeFee(uint _fee) public onlyOwner(){
        fee = _fee;
    }
}