//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Question{

    uint public id;
    string public question;
    string public option1;
    string public option2;

    address[] public voters;
    mapping(address => uint) public votedFor;

    constructor(uint _id, string memory _question, string memory _option1, string memory _option2){
        id = _id;
        question =_question;
        option1 =_option1;
        option2 =_option2;
    }


    function vote( uint _option) public payable {
        require(votedFor[msg.sender] == 0,"Already voted");
        votedFor[msg.sender] = _option;
        voters.push(msg.sender);
    }
    
}