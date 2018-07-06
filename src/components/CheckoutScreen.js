import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import store from "../store";

class CheckoutScreen extends Component {
  constructor() {
    super();

    this.state = {
      products: []
    }
  }

  componentDidMount() {

    if (store.getState()) {
      this.setState({ products: store.getState() })
    }
  }

  payClicked = () => {
    alert('Purchase successful...!')
  }

  render() {
    return (
      <div style={{ 'marginLeft': 20 }}>
        <table style={{ height: '200', width: '80%' }}>
          <tbody>
            <tr>
              <td style={{ width: '200' }}>Name*</td>
              <td style={{ width: '300' }}><input style={styles.inputstyle} type="text" name="" defaultValue="" /></td>
            </tr>
            <tr>
              <td style={{ width: '200' }}>Address*</td>
              <td style={{ width: '300' }}><input style={styles.inputstyle} type="text" name="" defaultValue="" /></td>
            </tr>
            <tr>
              <td style={{ width: '200' }}>Phone*</td>
              <td style={{ width: '300' }}><input style={styles.inputstyle} type="text" name="" defaultValue="" /></td>
            </tr>
            <tr>
              <td style={{ width: '200' }}>Email</td>
              <td style={{ width: '300' }}><input style={styles.inputstyle} type="text" name="" defaultValue="" /></td>
            </tr>
            <tr>
              <td style={{ width: '200' }}>Shipping options</td>
              <td style={{ width: '300' }}>
                <select style={styles.inputstyle} >
                  <option value="Cash On Pickup">Cash On Pickup</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Direct Debit">Direct Debit</option>
                  <option value="PayPal">PayPal</option>
                </select></td>
            </tr>
            <td style={{ width: '200' }}></td>
            <td style={{ width: '300' }}>
              <button onClick={e => this.payClicked(e)} style={{ width: '100px', height: '32px', 'box-sizing': 'border-box', 'border-radius': '4px', border: '1px solid #BBBBBB', margin: '8px' }}>PAY</button>
            </td>
          </tbody>
        </table>
      </div>)
  }
}

const styles = {
  inputstyle: {
    width: '300px', height: '32px', 'box-sizing': 'border-box', 'border-radius': '4px', border: '1px solid #BBBBBB', margin: '8px'
  },
  dropdown: {
    width: '300px', height: '32px', 'box-sizing': 'border-box', 'border-radius': '4px', border: '1px solid #BBBBBB', margin: '8px'
  }
}

const mapStateToProps = (store) => {
  return {
    products: store.products
  }
}

export default connect(mapStateToProps)(CheckoutScreen);

