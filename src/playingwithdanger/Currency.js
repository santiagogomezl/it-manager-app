import React, { Component } from 'react';

class Currency extends Component {
  render() {
    const money = new Intl
    .NumberFormat(this.props.locale,
        {
          style: 'currency',
          currency: this.props.currency
        })
    .format(this.props.value);
    return (
        <div className="currency">
            { money }
        </div>
    );
  }
}

export default Currency;