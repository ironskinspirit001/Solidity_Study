async function main() {

    const solData = require('../build/contracts/AuctionV1.json');
    const abi = solData.abi;

    const contractAddr = '0x3F8EcC4D7B57b2FC2D97b6636505AE533A2E8ED8';

    var accountFrom1='0x1509f8f1994Fd3BdC484e579d62A0270dc1189C6';

    const { Web3 } = require("web3");

    // set the provider you want from Web3.providers
    const web3 = new Web3("http://127.0.0.1:7545");
    try{
        var myContract = new web3.eth.Contract(abi, contractAddr);

        let a = myContract.methods.auctionEnd().send({
            from: accountFrom1,
            gas: 1500000,
            data: "end",
            value: web3.utils.toWei('0', 'ether')
        });
        console.log("auctionEnd", a);

    }catch(res){
        console.log(res);
    }
        
}

main();
