const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('100').send({
    from: accounts[0], gas: '1000000'
  });

  // taking 1st element
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaign', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('mark caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
        value: '200',
        from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    success = false;

    try {
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1]
      });
      success = true;
    } catch (e) {
    }

    assert(!success);
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('buy batteries', '100', accounts[1]).send({
      from: accounts[0], gas: '1000000'
    });
    const request = await campaign.methods.requests(0).call();

    assert.equal('buy batteries', request.description);
  });

  it('processes requests', async() => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1]).send({
      from: accounts[0], gas: '1000000'
    });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0], gas: '1000000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0], gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    
    assert(balance > 104);
  });
});
