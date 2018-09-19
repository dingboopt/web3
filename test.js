const Web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');

// connect to any peer; using infura here
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/c8699afda34149dcb69a909b91dfb9a7"));

// contents of keystore file, can do a fs read

const rawTransaction = {
"from": "0x69955BF5ca02B833B0C600194f15EB260b0D4EcF",
  "to": "0xa950a3ad39fabb866052e6ded3180beaedb5c36a",
  "value": web3.utils.toHex(web3.utils.toWei("1", "ether")),
  "gas": 2000000,
  "gasPrice":web3.utils.toHex(20* 1e9),
  "chainId": 3,
  "nonce":web3.utils.toHex(117)
};

var transaction = new Tx(rawTransaction);
transaction.sign(Buffer.from('privatekey', 'hex'));
            //sending transacton via web3js module
web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex')).on('transactionHash',console.log);;
console.log('hah');
