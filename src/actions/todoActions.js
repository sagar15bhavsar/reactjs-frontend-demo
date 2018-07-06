import { ADD_PRODUCTS,CALCULATE_TOTAL, ITEMS_IN_CART } from './actionTypes';

 const addProducts = (todo) => {
  return {
    type: ADD_PRODUCTS,
    todo: todo
  };
};

const totalPrice = (todo) => {
  return {
    type: CALCULATE_TOTAL,
    todo: todo
  };
};

const itemsInCart = (todo) => {
  return {
    type: ITEMS_IN_CART,
    todo: todo
  };
};

export {addProducts, totalPrice, itemsInCart}
