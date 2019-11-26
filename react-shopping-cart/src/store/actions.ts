export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const EMPTY_CART = 'EMPTY_CART'
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY'

// Available actions in the store
export type AppActions =
  | AddProductToCartAction
  | RemoveProductFromCartAction
  | FetchProductsAction
  | UpdateCurrencyAction

// Add product to cart action
export interface AddProductToCartAction {
  type: string
  payload: {
    productId: number
    qte: number
  }
}
export const addProductToCart = (
  productId: number,
  qte: number
): AddProductToCartAction => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: { productId, qte },
  }
}

// Remove product from cart action
export interface RemoveProductFromCartAction {
  type: string
  payload: number
}
export const removeProductFromCart = (
  productId: number
): RemoveProductFromCartAction => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId,
  }
}

// Empty the cart
export interface EmptyCart {
  type: string
}
export const emptyCart = (): EmptyCart => {
  return {
    type: EMPTY_CART,
  }
}

// Fetch products action
export interface FetchProductsAction {
  type: string
}
export const fetchProducts = (): FetchProductsAction => {
  return {
    type: FETCH_PRODUCTS,
  }
}

// Update currency action
export interface UpdateCurrencyAction {
  type: string
  payload: string
}
export const updateCurrency = (name: string): UpdateCurrencyAction => {
  return {
    type: UPDATE_CURRENCY,
    payload: name,
  }
}
