# Editor
Tested with VS code (https://code.visualstudio.com/download) and Atom (https://atom.io)

# Prerequisite(s) for Windows
Install node.js from https://nodejs.org/en/download.
While installing the msi, install chiockolayey as well.

# Prerequisite(s) for MacOS
Install homebrew

# install backend npm modules of kickstart
cd <kickstart directory>
run following npm installation command in terminal (macos) or powershell (windows) -
	"npm install ganache-cli mocha solc@0.8.9 fs-extra web3@1.6.0 @truffle/hdwallet-provider@1.6.0"

# compile smart contract of kickstart
Open terminal in VS code (seperate terminal or powershell can be used as well) and run following npm command -
	"cd .\ethereum; node .\compile.js"
It'll generate "Campaign.json" and "CampaignFactory.json" inside "kickstart/ethereum" directory. They contain abi and bytecode.

# run unit tests of kickstart
Open terminal and run following npm command -
	"npm run test"
All tests should pass.

# deploy kickstart
Open terminal and run following npm command -
	"cd .\ethereum; node .\deploy.js"
Put the deployed address on "ADDRESS" file for future reference.

# check out kickstart contract online
Check deployment details in https://rinkeby.etherscan.io/address/<contract address>.
To play with the contract go to https://remix.ethereum.org
Replace content of "3_Ballot.sol" in remix with thant of "ethereum/contracts/Campaign.sol"
Go to "Deploy & run transactions" tab.
Select "Injected Web3" and "CampaignFactory" in " Environment" and Contract" dropdown list respectively.
Put <contract address> at "Load contract from Address" input box and click on "At Address" button.

# install frontend npm modules of kickstart
cd <kickstart directory>
run following npm installation command in terminal (macos) or powershell (windows) -
	"npm install next@12.0.3 react@17.0.2 react-dom@17.0.2"

# launch kickstart server
cd <kickstart directory>
run following command in terminal (macos) or powershell (windows) -
	"npm run dev"