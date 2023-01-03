// const Web3 = require('web3');
var contractABI = null;
var contractAddress = null;
$.ajax({
  url: "./build/contracts/AssetTracker.json",
  async: false,
  dataType: "json",
  success: function(json) {
    assignVariable(json);
  }
});
function assignVariable(data) {
  console.log(data);
  contractABI = data.abi;
  contractAddress = data.networks[5777].address;
}

// console.log(contractABI);
// console.log(contractAddress);
// console.log(web3);

// if (typeof web3 !== "undefined") {
//   // web3 = new Web3(web3.currentProvider);
//   web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

//   console.log(web3);
// } else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// }
// web3.eth.defaultAccount = web3.eth.accounts[0];
// console.log(web3.eth.defaultAccount);
web3.eth.getAccounts().then(res=> console.log(res));
var fromAddress = "0xeCb7aa6F76F3820Ad0C52EB93C56c0fB320e5322";

const AssetTrackerContract = new web3.eth.Contract(
  contractABI,
  contractAddress,
  { from: fromAddress }
);
// console.log(AssetTrackerContract.methods.getTestNo().call().then(res => {
//   console.log(res);
// }).catch(err => console.log(err)));

