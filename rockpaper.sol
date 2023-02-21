// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RockPaperScissors{

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    address owner; 

    event rockPaper(address player, uint256 amount, uint8 option, uint256 result); 

    constructor() payable {
        owner = msg.sender;
    }

    function rockPaperScissors(uint8 _option) public payable returns (uint256){ 
        require(_option<3, "Please select rock(0), paper(1), scisors(2)");
        require(msg.value>0, "Please add your bet");  
        require(msg.value*2 <= address(this).balance, "Contract balance is insuffieient ");

        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))); 

        bool r0 = random % 3 == 0;
        bool r1 = random % 3 == 1;
        bool r2 = random % 3 == 2;



        if (_option == 0 ) { 
            if (r2) {        
                payable(msg.sender).transfer(msg.value*2);
                random = 1;
            }

            else if (r1){
                random = 2;
            }

            else {
                payable(msg.sender).transfer(msg.value);
                random = 0;

            }

        } 
        else if (_option == 1) {
            if (r0) {
                payable(msg.sender).transfer(msg.value*2);
                random = 1; 

            }
            else if (r2){
                random = 2;
            }
            else {
                payable(msg.sender).transfer(msg.value);
                random = 0;
            }
        
        } else if (_option == 2) {
            if (r1) {
                payable(msg.sender).transfer(msg.value*2);
                random = 1;                
            }
            else if (r0){
                random = 2;
            }
            
            else {
                payable(msg.sender).transfer(msg.value);
                random = 0;
            }
        }
        
        
        
        emit rockPaper(msg.sender, msg.value, _option, random);
    }
        

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

}
