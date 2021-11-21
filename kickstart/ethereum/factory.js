import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xD32920bb10A1FecB922FD67Ae114669aA4E865d3'
);

export default instance;
