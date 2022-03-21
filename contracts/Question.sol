//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Question{

    address public owner;
    uint public id;
    uint public votes;
    uint public winner;
    string public question;
    string public option1;
    string public option2;
    bool public closed;
    

    uint private balance;
    uint private votes1;
    uint private votes2;

    address[] public voters;

    mapping(address => uint) public votedFor;

    constructor(uint _id, string memory _question, string memory _option1, string memory _option2){
        owner = msg.sender;
        id = _id;
        question =_question;
        option1 =_option1;
        option2 =_option2;
        closed = false;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Address must be owner");
        _;
    }

    function returnBalance() public view returns(uint){
        return balance;
    }

    function checkVote(address _address) public view returns (uint){
        return votedFor[_address];
    }

    function vote( uint _option, address _address, uint _fee, uint _bid) public payable {
        require(votedFor[msg.sender] == 0,"Already voted");
        votedFor[_address] = _option;
        if(_option==1){
            votes1++;
        }
        else{
            votes2++;
        }
        votes++;
        balance+= _fee + _bid;
        voters.push(msg.sender);
    }

    function closeQuestion() public onlyOwner(){
        closed = true;
        getWinner();
    }

    function getWinner()internal{
        winner = getVotes1()>getVotes2()?2:1;
    }

    function getVotes1() internal view returns(uint){
        return votes1;
    }

    function getVotes2() internal view returns(uint){
        return votes2;
    }

    function getBalance() internal view returns(uint){
        return balance;
    }
    
}