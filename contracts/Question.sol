//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Question{

    uint public id;
    uint public votes;
    string public question;
    string public option1;
    string public option2;

    uint private votes1;
    uint private votes2;

    address[] public voters;

    mapping(address => uint) public votedFor;

    constructor(uint _id, string memory _question, string memory _option1, string memory _option2){
        id = _id;
        question =_question;
        option1 =_option1;
        option2 =_option2;
    }

    function checkVote(address _address) public view returns (uint){
        return votedFor[_address];
    }

    function vote( uint _option, address _address) public payable {
        require(votedFor[msg.sender] == 0,"Already voted");
        votedFor[_address] = _option;
        if(_option==1){
            votes1++;
        }
        else{
            votes2++;
        }
        votes++;
        voters.push(msg.sender);
    }

    function getVotes1() public view returns(uint){
        return votes1;
    }

    function getVotes2() public view returns(uint){
        return votes2;
    }
    
}