const Web3 = require('web3')
const solc = require('solc')
const fs = require('fs')

// Connection to the testing blockchain
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Compile contract and extract ABI definition
const contractCode = fs.readFileSync('Voting.sol').toString()
const compiledCode = solc.compile(contractCode)
const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)

// Deploy and initiate contract
const VotingContract = web3.eth.contract(abiDefinition)
const byteCode = compiledCode.contracts[':Voting'].bytecode
const deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
const contractInstance = VotingContract.at(deployedContract.address)
