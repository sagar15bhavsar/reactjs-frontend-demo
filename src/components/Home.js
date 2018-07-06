import React from 'react'
import { apiFetch } from "../utils/api-fetch";
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import store from "../store";
import { addProducts, totalPrice, itemsInCart } from "../actions/todoActions";

class Home extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      filterText: '',
      products: [],
      totalPrice: 0,
    };
  }

  componentWillMount() {

    console.log('products', store.getState())

    if (store.getState()['products'].length > 0) {

      this.setState({ products: store.getState()['products'] })

    } else {
      this.loadData()
    }
  }

  async loadData() {

    this.setState({ isPreloader: true })

    const res = await apiFetch('http://5b3f10ccc3c3fb001474285e.mockapi.io/products')

    this.setState({ products: res })

    this.addTodo();
  }

  addTodo = () => {
    store.dispatch(
      addProducts(this.state.products)
    );
  }

  handleRowDel(product) {

  };

  handleAddEvent(evt) {

  }

  handleProductTable(evt) {

  };

  buyClicked(e) {

    if (this.props.inCartItems.length < 1) {
      alert('Please add atlease 1 item in you cart to continue.')
      return 
    }

    this.props.history.push('/cart');
  }

  render() {
    return (
      <div style={{ 'marginLeft': 20 }}>

        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText} />

        <div align="right" style={{ width: '80%' }}>
          <div >
            <label style={{ width: '100px', height: '32px', margin: '8px', 'font-size': '20px' }}>{this.props.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} €</label>
          </div>
          <div >
            <button onClick={e => this.buyClicked(e)} style={{ width: '100px', height: '32px', 'box-sizing': 'border-box', 'border-radius': '4px', border: '1px solid #BBBBBB', margin: '8px' }}>BUY</button>
          </div>
        </div>
      </div>
    );
  }
}

class ProductTable extends React.Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function (product) {
      if (product.productname.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id} />)
    });

    return (
      <div >
        <table className="table table-bordered" style={{ width: '80%' }}>
          <tbody>
            {product}
          </tbody>
        </table>
      </div>
    );
  }
}

class ProductRow extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

    };
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }

  getItemCount = () => {

    if (!this.props.product.itemCount) {
      this.props.product.itemCount = 0
    }

    return ' ' + this.props.product.itemCount + ' '
  }

  onIncreaseCartItems = () => {

    if (!this.props.product.itemCount) {
      this.props.product.itemCount = 0
    }

    this.props.product.itemCount = this.props.product.itemCount + 1


    store.dispatch(
      totalPrice(this.state.products)
    );

    store.dispatch(
      itemsInCart(this.state.products)
    );

    this.setState({ product: this.props.product })
  }

  onDecreseCartItems = () => {

    if (!this.props.product.itemCount) {
      this.props.product.itemCount = 0
    }

    if (this.props.product.itemCount > 0) {
      this.props.product.itemCount = this.props.product.itemCount - 1
    }

    store.dispatch(
      totalPrice(this.state.products)
    );

    store.dispatch(
      itemsInCart(this.state.products)
    );

    this.setState({ product: this.props.product })
  }

  render() {

    return (
      <tr className="eachRow" style={{ alignItems: 'center', justifyContent: 'center' }}>

        <td>
          <div class="cell">
            <img style={{ 'border-radius': '8px', 'width': 70, 'height': 70 }} src="https://placekitten.com/200/300" alt="Cheetah!" />
          </div>
        </td>

        <td>
          <label style={{ 'font-weight': 'bold' }}>{this.props.product.productname}</label> <br></br>
          <label>{this.props.product.producdesc + this.props.product.producdesc + this.props.product.producdesc}</label>
        </td>

        <td style={{ 'width': 100 }} >
          <button onClick={e => this.onDecreseCartItems(e)} >-</button>
          {this.getItemCount()}
          <button disabled= { this.props.product.itemCount > 99 } onClick={e => this.onIncreaseCartItems(e)} >+</button>
        </td>

        <td align="right" style={{ 'width': 100 }}>

          <tr></tr>

          <tr>
            <label>{this.props.product.price}€</label>
          </tr>

        </td>

      </tr>
    );
  }
}

const mapStateToProps = store => {
  return {
    products: store.products,
    totalPrice: store.totalPrice,
    inCartItems: store.inCartItems,
  };
};

export default connect(mapStateToProps)(Home);
