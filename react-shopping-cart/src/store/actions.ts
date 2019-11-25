export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

// Available actions in the store
export type AppActions =
  | IAddProductToCartAction
  | IRemoveProductFromCartAction
  | IFetchProductsAction

// Add product to cart action
export interface IAddProductToCartAction {
  type: string
  payload: {
    productId: number
    qte: number
  }
}
export const addProductToCart = (
  productId: number,
  qte: number
): IAddProductToCartAction => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: { productId, qte },
  }
}

// Remove product from cart action
export interface IRemoveProductFromCartAction {
  type: string
  payload: number
}
export const removeProductFromCart = (
  productId: number
): IRemoveProductFromCartAction => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId,
  }
}

// Fetch products action
export interface IFetchProductsAction {
  type: string
}
export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS,
  }
}
