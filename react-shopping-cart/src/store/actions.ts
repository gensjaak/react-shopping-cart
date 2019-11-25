export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export type AppActions =
  | IAddProductToCartAction
  | IRemoveProductFromCartAction
  | IFetchProductsAction

export interface IAddProductToCartAction {
  type: string
  payload: {
    productId: number
    qte: number
  }
}

export interface IRemoveProductFromCartAction {
  type: string
  payload: number
}

export interface IFetchProductsAction {
  type: string
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

export const removeProductFromCart = (
  productId: number
): IRemoveProductFromCartAction => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId,
  }
}

export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS,
  }
}
