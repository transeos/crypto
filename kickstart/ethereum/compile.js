const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'Campaign.sol': {
        content: source,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  //console.log(output[contract]);
  //console.log('\n\n\n\n\n');
  fs.outputJsonSync(path.resolve(buildPath, contract + '.json'), output[contract]);
}
