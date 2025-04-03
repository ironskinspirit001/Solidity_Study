
const solData = require('../build/contracts/AuctionV1.json');
const abi = solData.abi;

const contractAddr='0x3F8EcC4D7B57b2FC2D97b6636505AE533A2E8ED8'; 
 
const { Web3 } = require("web3"); 
 
// set the provider you want from Web3.providers
const web3 = new Web3("http://127.0.0.1:7545"); 
 
 
var myContract = new web3.eth.Contract(abi, contractAddr); 
 
var accountFrom1='0x1509f8f1994Fd3BdC484e579d62A0270dc1189C6';
var accountFrom2='0xe028Cc31EB7Bb11Ebc57dA4178f22FAE00132b92';

myContract.methods.auctionEndTime().call().then(
    result => { 
        const date = new Date(Number(result) * 1000); 
        console.log( "auctionEndTime: " + date); 
    }
);

myContract.methods.bid().send({
    from: accountFrom1,
    gas: 1500000,
    data: "bid test with 8 ether.",
    value: web3.utils.toWei('8', 'ether')
}).then(function(receipt){
    //console.log("bid result:");
    //console.log(receipt);
    return web3.eth.getBalance(contractAddr);
}).then(balance => {
    console.log('contract balance:', web3.utils.fromWei(balance, 'ether'));
    return myContract.methods.getHighestBidInfo().call();
}).then(result => {  
    //const [addr, amount] = result;
    console.log( "highestBidder: " + result[0] + "  " + result[1]); 
}).catch(error => {
    console.log("bid error:");
    console.log(error);
});



