import productList from "./product"

// Action Types
const CART_ADD_ITEM = 'cart/addItem'
const CART_REMOVE_ITEM = 'cart/removeItem'
const CART_ITEM_INCREASE_QUANTITY = 'cart/increaseItemQuantity'
const CART_ITEM_DECREASE_QUANTITY = 'cart/decreaseItemQuantity'

// Action Creators
export function addCartItem(productId, quantity = 1) {

  return { type: CART_ADD_ITEM, payload: { productId, quantity } }
}

export function removeCartItem(productId) {
  return { type: CART_REMOVE_ITEM, payload: { productId } }
}

export function decreaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: { productId },
  }
}

export function increaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: { productId },
  }
}

// Reducer

export default function cartReducer(state = [], action) {

  localStorage.setItem("cart", JSON.stringify([]))

  switch (action.type) {
    case CART_ADD_ITEM:
      const success1 = productList.filter((e) => {
        return e.id === action.payload.productId
      })
      // console.log(state)
      const success2 = state.find((e) => {
        return e.id === action.payload.productId
      })
      // console.log(!success2)
      if (success1 && !success2) {
        
        return [...state, { ...success1[0], quantity: action.payload.quantity }]
      }
      else {
        return state.map((e) => {
          if (e.id === action.payload.productId) {
            return { ...e, quantity: e.quantity + 1 }
          }
          else {
            return e
          }
        })
      }

    case CART_REMOVE_ITEM:
      // console.log("remove")
      return state.filter(
        (cartItem) => cartItem.id !== action.payload.productId
      )
    case CART_ITEM_INCREASE_QUANTITY:
      return state.map((cartItem) => {
        if (cartItem.id === action.payload.productId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        }
        return cartItem
      })

    case CART_ITEM_DECREASE_QUANTITY:
      return state
        .map((cartItem) => {
          if (cartItem.id === action.payload.productId) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
          }
          return cartItem
        })
        .filter((cartItem) => cartItem.quantity > 0)
    default:
      return state
  }
}