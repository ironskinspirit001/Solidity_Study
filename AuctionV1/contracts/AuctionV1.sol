// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract AuctionV1 {
    address payable public beneficiary;
    uint public auctionEndTime;
    address public highestBidder;
    mapping(address => uint) public bids;
    address[] public bidders;
    bool ended;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);
    event Bidder(address bidder, uint amount);
    event Log(string message);

    constructor(uint _biddingTime, address payable _beneficiary)  {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    function getHighestBidInfo() public view returns (address, uint) {
        return (highestBidder, bids[highestBidder]);
    }
    
    function getAllBidders() public view returns ( address[] memory) {
        return bidders;
    }

    function bid() public payable {
        //require(block.timestamp <= auctionEndTime, "Bidding time has expired");
        require(bids[msg.sender] + msg.value > bids[highestBidder], "You must bid more than your current highest bid.");
        if (bids[msg.sender] == uint(0)){
            bidders.push(msg.sender);
        } 
        highestBidder = msg.sender;
        bids[msg.sender] += msg.value;
        emit HighestBidIncreased(highestBidder, bids[highestBidder]);
    }

    function auctionEnd() public {
        //require(block.timestamp >= auctionEndTime, "Auction has not ended yet.");
        //require(!ended, "This auction has already ended");
        emit Log("start auctionEnd");
        beneficiary.transfer(bids[highestBidder]);
        emit Log("after beneficiary.transfer");
        for (uint i = 0; i < bidders.length ; ++i){
            address bidder = bidders[i]; 
            if(bidder == highestBidder) continue;
            emit Bidder(bidder, bids[bidder]);
            payable(bidder).transfer(bids[bidder]);
            emit Log("after bidder.transfer");
        }
        ended = true; 
        emit AuctionEnded(highestBidder, bids[highestBidder]);
    }
}