import productList from "./product"

// Action Types
const WISHLIST_ADD_ITEM = 'wishList/addItem'
const WISHLIST_REMOVE_ITEM = 'wishList/removeItem'

// Action Creators
export function addWishListItem(productId) {
  return { type: WISHLIST_ADD_ITEM, payload: { productId } }
}
export function removeWishListItem(productId) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { productId } }
}

// Reducer
export default function wishListReducer(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const success1 = productList.filter((e)=>{
        return e.id === action.payload.productId
      })
      console.log(state)
      const success2 = state.find((e)=>{
        return e.id === action.payload.productId
      })
      console.log(!success2)
      if(success1 && !success2){

        return [...state, {...success1[0], quantity: action.payload.quantity}]
      }
      else{
        return state
      }

    case WISHLIST_REMOVE_ITEM:
      return state.filter(
        (wishListItem) => wishListItem.id !== action.payload.productId
      )
    default:
      return state
  }
}