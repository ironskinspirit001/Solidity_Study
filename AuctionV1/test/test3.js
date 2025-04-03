async function main() {

    const solData = require('../build/contracts/AuctionV1.json');
    const abi = solData.abi;

    const contractAddr = '0x3F8EcC4D7B57b2FC2D97b6636505AE533A2E8ED8';

    const { Web3 } = require("web3");

    // set the provider you want from Web3.providers
    const web3 = new Web3("http://127.0.0.1:7545");


    var myContract = new web3.eth.Contract(abi, contractAddr);

    //var accountFrom = '0x1509f8f1994Fd3BdC484e579d62A0270dc1189C6';


    const auctionEndTime = await myContract.methods.auctionEndTime().call();
    console.log("auctionEndTime: " + auctionEndTime);

    const balance = await web3.eth.getBalance(contractAddr);
    console.log('contract balance:', web3.utils.fromWei(balance, 'ether'));

    const highestBidder = await myContract.methods.getHighestBidInfo().call();
    console.log('highestBidder:', highestBidder);

    //const memory = await myContract.methods.getAllBidders().call();
    //console.log('Bidders:', memory);

    //const bidders = await myContract.methods.bidders(1).call();
    //console.log('Bidders:', bidders);

    //const bids = await myContract.methods.bids().call();
    //console.log('bids:', bids);

}

main();