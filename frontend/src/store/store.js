import { combineReducers, createStore } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';
import { loadState, saveState } from './localStorage'; // Import localStorage utilities

// Combine your reducers
const reducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
});

// Load persisted state from localStorage (if available)
const persistedState = loadState();

// Create the Redux store, using the persisted state as the initial state if available
export const store = createStore(
  reducer,
  persistedState, // Set the initial state from localStorage
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Subscribe to store updates and save the relevant parts of the state to localStorage
store.subscribe(() => {
  saveState({
    cartItems: store.getState().cartItems, // Persist cartItems state
    wishList: store.getState().wishList,   // Persist wishList state
  });
});


// console.log(store)
// store.subscribe(()=>{

//     console.log(store.getState())
// })

// store.dispatch(addCartItem(1))
// store.dispatch(addCartItem(12))

// store.dispatch(increaseCartItemQuantity(12))

// store.dispatch(decreaseCartItemQuantity(12))
// store.dispatch(decreaseCartItemQuantity(12))

// store.dispatch(addWishListItem(18))
// store.dispatch(addWishListItem(11))

// store.dispatch(removeWishListItem(11))
// store.dispatch(removeWishListItem(18))