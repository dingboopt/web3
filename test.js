const Web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
var fs = require('fs');
var jsonFile = "./FCoinToken.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
//var abi = parsed.abi;
var abi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
//console.log(abi);
// connect to any peer; using infura here
//const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/c8699afda34149dcb69a909b91dfb9a7"));
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/c8699afda34149dcb69a909b91dfb9a7"));

// contents of keystore file, can do a fs read
var contractABI =abi;
var contractAddress ="0xd37532D304214D588aeeaC4c365E8F1d72e2304A";
//var contractAddress ="0x60946076e0b519ec2343a792b3fb6b52e817b657";
//creating contract object
var contract = new web3.eth.Contract(contractABI,contractAddress);
contract.getPastEvents('Transfer',{
    filter: {to: '0x3588C5BDe5499Cb3Ed372F1BdB2ff812354debF4'},
    fromBlock: 0,
    toBlock: 'latest'
	}, function(error, events){
		for (i=0; i<events.length; i++) {
			var eventObj = events[i];
			console.log('from : '+eventObj.returnValues.from+' to'+eventObj.returnValues.to+'amount' +eventObj.returnValues.value);
                        console.log(eventObj);
	}
});
console.log('end');
var ethTx = '0x0df871981d8dcbe99d2df134ec68b237af9a85cc2c2375684a06b46fddfe3a98';
web3.eth.getTransaction(ethTx, function(err, result) { 
	if (!err) {
		console.log('From Address: ' + result.from); 
		console.log('To Address: ' + result.to); 
		console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether')));
                console.log(result);
	}
	else {
		console.log('Error!', err);
	}
});
//const rawTransaction = {
//"from": "0x69955BF5ca02B833B0C600194f15EB260b0D4EcF",
//  "to": contractAddress,
//  "value": web3.utils.toHex(web3.utils.toWei("1", "ether")),
//  "gas": 2000000,
//  "gasPrice":web3.utils.toHex(20* 1e9),
//  "chainId": 3,
//  "value":"0x0",
//  "data":contract.methods.transfer("0xa950a3ad39fabb866052e6ded3180beaedb5c36a",10).encodeABI(),
//  "nonce":web3.utils.toHex(118)
//};
//
//var transaction = new Tx(rawTransaction);
//transaction.sign(Buffer.from('privatekey', 'hex'));
//            //sending transacton via web3js module
//web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex')).on('transactionHash',console.log);;
//console.log('hah');
