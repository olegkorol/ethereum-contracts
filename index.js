const fs = require('fs');
const path = require('path');
const root = process.cwd() + '/ethereum-contracts/contracts';
const solc = require('solc'); // Solidity compiler

// Export contracts
module.exports = {
  votingContract() {
    const sourceCode = fs.readFileSync(path.join(`${root}/Voting.sol`), 'utf8').toString();
    const compiledCode = solc.compile(sourceCode);
    return {
        abiDefinition: JSON.parse(compiledCode.contracts[':Voting'].interface),
        byteCode: compiledCode.contracts[':Voting'].bytecode
    };
  }
};
