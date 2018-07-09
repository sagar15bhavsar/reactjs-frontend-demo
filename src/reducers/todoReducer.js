import { ADD_PRODUCTS , CALCULATE_TOTAL, ITEMS_IN_CART} from '../actions/actionTypes';

const initialState = {
  products: [],
  totalPrice: 0,
  inCartItems: []
};


/// 1.0 ADD_PRODUCTS
const addProducts = (state, action) => {
  return { ...state, products: state.products.concat(action.todo) }
}


/// 2.0 CALCULATE_TOTAL
const sumAllByProps = function(items, prop){
  return items.reduce( function(a, b){
      return a + parseFloat(b[prop])*b['itemCount'];
  }, 0);
};

const calculateTotalPrice = (state, action) => {

  return { ...state, totalPrice: sumAllByProps(state.products, 'price')}
}

/// 3.0 ITEMS_IN_CART
const allItemsInCart = (items) => {

  let inCartItems = []

  for (let i = 0; i < items.length; i++) {

    const product = items[i];

    if (product.itemCount > 0) {
      inCartItems.push(product)
    }
  }

  return inCartItems
}

const getInCartItems = (state, action) => {

  return { ...state, inCartItems: allItemsInCart(state.products)}
}


const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCTS: return addProducts(state, action);
    case CALCULATE_TOTAL: return calculateTotalPrice(state, action);
    case ITEMS_IN_CART: return getInCartItems(state, action);
    default: return state;
  }
};

export default todoReducer;
