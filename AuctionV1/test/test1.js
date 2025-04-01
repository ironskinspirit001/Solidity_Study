
const solData = require('../build/contracts/AuctionV1.json');
const abi = solData.abi;

const contractAddr='0xDcF6b3F48B7f5ad3634B2F1a2b04d4Ad99a7D622'; 
 
const { Web3 } = require("web3"); 
 
// set the provider you want from Web3.providers
const web3 = new Web3("http://127.0.0.1:7545"); 
 
 
var myContract = new web3.eth.Contract(abi, contractAddr); 
 
var accountFrom='0x1509f8f1994Fd3BdC484e579d62A0270dc1189C6';

web3.eth.getBalance(accountFrom).then(balance => {
    console.log('account balance:', web3.utils.fromWei(balance, 'ether'));
});


myContract.methods.auctionEndTime().call().then(
    result => { 
        const date = new Date(Number(result) * 1000); 
        console.log( "auctionEndTime: " + date); 
    }
);

myContract.methods.bid().send({
    from: accountFrom,
    data: "bid test with 10 ether.",
    value: web3.utils.toWei('1', 'ether')
}).then(function(receipt){
    console.log("bid result:");
    console.log(receipt);
});

/*



myContract.methods.store(1888).send({from:accountFrom}, function(error, transactionHash){ });

myContract.
 
console.log(transactionHash);
*/