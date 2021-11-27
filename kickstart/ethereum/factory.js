import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xCF6D6fb562F57e3FF226962FF6628f06cD9929fC'
);

export default instance;
