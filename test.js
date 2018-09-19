const Web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
var fs = require('fs');
var jsonFile = "./FCoinToken.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
console.log(abi);
// connect to any peer; using infura here
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/c8699afda34149dcb69a909b91dfb9a7"));

// contents of keystore file, can do a fs read
var contractABI =abi;
var contractAddress ="0x60946076e0b519ec2343a792b3fb6b52e817b657";
//creating contract object
var contract = new web3.eth.Contract(contractABI,contractAddress);
const rawTransaction = {
"from": "0x69955BF5ca02B833B0C600194f15EB260b0D4EcF",
  "to": contractAddress,
  "value": web3.utils.toHex(web3.utils.toWei("1", "ether")),
  "gas": 2000000,
  "gasPrice":web3.utils.toHex(20* 1e9),
  "chainId": 3,
  "value":"0x0",
  "data":contract.methods.transfer("0xa950a3ad39fabb866052e6ded3180beaedb5c36a",10).encodeABI(),
  "nonce":web3.utils.toHex(118)
};

var transaction = new Tx(rawTransaction);
transaction.sign(Buffer.from('e2065af8e1edc6240674a43f7e77723e0b35399adfb9c7e8a91e6819e2a11c47', 'hex'));
            //sending transacton via web3js module
web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex')).on('transactionHash',console.log);;
console.log('hah');
