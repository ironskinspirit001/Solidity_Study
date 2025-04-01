// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract AuctionV1 {
    address payable public beneficiary;
    uint public auctionEndTime;
    address public highestBidder;
    mapping(address => uint) bids;
    address[] bidders;
    bool ended;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(uint _biddingTime, address payable _beneficiary)  {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }
    
    function bid() public payable {
        require(block.timestamp <= auctionEndTime, "Bidding time has expired");
        require(bids[msg.sender] + msg.value > bids[highestBidder], "You must bid more than your current highest bid.");
        if (!(bids[msg.sender] == uint(0))){
            bidders.push(msg.sender);
        } 
        highestBidder = msg.sender;
        bids[msg.sender] += msg.value;
        emit HighestBidIncreased(highestBidder, bids[highestBidder]);
    }

    function auctionEnd() public {
        require(block.timestamp >= auctionEndTime, "Auction has not ended yet.");
        require(!ended, "This auction has already ended");

        beneficiary.transfer(bids[highestBidder]);
        for (uint i = 0; i < bidders.length ; ++i){
            address bidder = bidders[i]; 
            if(bidder == highestBidder) continue;
            payable(bidder).transfer(bids[bidder]);
        }
        ended = true; 
        emit AuctionEnded(highestBidder, bids[highestBidder]);
    }
}