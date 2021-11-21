import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  state = {
      loading: false
  };

  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    this.setState( {loading: true} );

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });
    } catch (err) {
      console.log("error in onApprove");
    }

    this.setState( {loading: false} );
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    this.setState( {loading: true} );

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });
    } catch (err) {
      console.log("error in onFinalize");
    }

    this.setState( {loading: false} );
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
          {request.complete ? null : (
            <Button loading={this.state.loading} color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button loading={this.state.loading} color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
