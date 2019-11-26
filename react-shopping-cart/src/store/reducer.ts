import {
  FETCH_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  AddProductToCartAction,
  AppActions,
  REMOVE_PRODUCT_FROM_CART,
  RemoveProductFromCartAction,
  EMPTY_CART,
  UPDATE_CURRENCY,
  UpdateCurrencyAction,
} from './actions'
import {
  StoreState,
  ProductType,
  CartProductType,
  TaxeType,
  CurrencyType,
  CurrencyRateType,
} from './types'

// Initial state of store
const initialState: StoreState = {
  products: [],
  cart: {
    items: [],
    taxes: [
      {
        name: 20,
        value: 20,
      },
    ],
    totalAmountIncludingTaxes: 0,
  },
  currency: {
    base: 'EUR',
    selected: {
      name: 'EUR',
      symbol: '€',
      value: 1,
      showSymbolAtLeft: false,
    },
    rates: [
      {
        name: 'EUR',
        symbol: '€',
        value: 1,
        showSymbolAtLeft: false,
      },
      {
        name: 'CAD',
        symbol: 'CA$',
        value: 1.4648,
        showSymbolAtLeft: true,
      },
      {
        name: 'HKD',
        symbol: 'HK$',
        value: 8.6164,
        showSymbolAtLeft: true,
      },
      {
        name: 'USD',
        symbol: '$',
        value: 1.1008,
        showSymbolAtLeft: true,
      },
      {
        name: 'GBP',
        symbol: '£',
        value: 0.85515,
        showSymbolAtLeft: true,
      },
    ],
  },
}

// Calculate total price
const calculateTotalPrice = (
  cartProducts: CartProductType[],
  products: ProductType[]
): number => {
  let priceHT = 0
  cartProducts.forEach(_ => {
    const product = products.find(__ => __.id === _.productId) as ProductType

    priceHT += product.price * _.qte
  })

  return priceHT
}

// Apply taxes
const applyTaxes = (priceHT: number, taxes: TaxeType[]): number => {
  let priceTTC = 0

  taxes.forEach(_ => {
    priceTTC += priceHT * (1 + _.value / 100)
  })

  return priceTTC
}

const reducer = (
  state: StoreState = initialState,
  action: AppActions
): StoreState => {
  switch (action.type) {
    // Fetch products
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [
          {
            id: 1,
            name: 'Xiaomi Redmi Note 7 4Go 64Go Bleu Smartphone',
            description:
              'Double Caméra arrière 48 MP avec IA - Écran 6.3" avec encoche en forme de goutte.',
            price: 156.8,
            tax: 0,
          },
          {
            id: 3,
            name: 'Pocophone F1 Dual SIM 128GB 6GB RAM Noir',
            description:
              'Ecran: Type: IPS LCD écran tactile capacitif, 16 millions de couleurs Taille: 6.18 inches, 96.2 cm2',
            price: 295.0,
            tax: 0,
          },

          {
            id: 5,
            name: 'Apple iPhone 8 - 64 Go - Or',
            description:
              "Un design tout de verre vêtu. L'appareil photo encore amélioré. La puce plus puissante et plus intelligente. Résolution de l'appareil photo arrière: 12 MP",
            price: 408.0,
            tax: 0,
          },
          {
            id: 6,
            name: 'Apple iPhone 11 - 64 Go - Noir',
            description:
              "Conçu pour élargir vos horizons, l'iPhone 11 d'Apple vous séduira en un rien de temps. Arborant des matériaux de haute qualité. Résolution de l'appareil photo arrière: 12 MP",
            price: 687.99,
            tax: 0,
          },
          {
            id: 7,
            name: 'Apple iPhone 11 Pro - 64 Go - Gris sidéral',
            description:
              "Appareils photo. Écran. Performances. Tout d’un Pro. Tout nouveau triple appareil photo ultra grand‐angle, grand‐angle. Reconnaissance faciale. Lecteur d'empreintes digitales",
            price: 589.9,
            tax: 0,
          },
          {
            id: 10,
            name: 'Huawei P30 Pro - Double SIM - 128 Go - Noir',
            description:
              "Faites un zoom avant pour explorer le mystère de la nuit céleste, observez un aigle au-dessus des arbres ou examinez les fins. Résolution de l'appareil photo arrière: 40 MP. 4G LTE",
            price: 149,
            tax: 0,
          },
        ],
      }

    // Add a product to the cart
    case ADD_PRODUCT_TO_CART:
      // If the product was already in the cart => inc(qte)
      // Else add it
      const addAction = action as AddProductToCartAction
      let alreadyInCart = false
      const updatedItems = [...state.cart.items].map(_ => {
        if (_.productId === addAction.payload.productId) {
          alreadyInCart = true
          _.qte += addAction.payload.qte
        }

        return _
      })

      if (!alreadyInCart) {
        updatedItems.push(addAction.payload)
      }

      // Calculate the totals
      // Not sure this is the right way to calculate it
      let totalAmountIncludingTaxes = applyTaxes(
        calculateTotalPrice(updatedItems, state.products),
        state.cart.taxes
      )

      return {
        ...state,
        cart: {
          ...state.cart,
          totalAmountIncludingTaxes,
          items: updatedItems,
        },
      }

    // Remove a product from the cart
    case REMOVE_PRODUCT_FROM_CART:
      // dec product quantity in the cart
      // If, after that, the quantity is lower or eq to 0, remove it
      const removeAction = action as RemoveProductFromCartAction
      totalAmountIncludingTaxes = 0
      const newItems = [...state.cart.items]
        .map(_ => {
          if (_.productId === removeAction.payload) {
            --_.qte
          }

          return _
        })
        .filter(_ => _.qte)

      // Calculate the totals
      // Not sure this is the right way to calculate it
      totalAmountIncludingTaxes = applyTaxes(
        calculateTotalPrice(newItems, state.products),
        state.cart.taxes
      )

      return {
        ...state,
        cart: {
          ...state.cart,
          totalAmountIncludingTaxes,
          items: newItems,
        },
      }

    // Empty the cart simply
    case EMPTY_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [],
          totalAmountIncludingTaxes: 0,
        },
      }

    // Updates the selected currency
    case UPDATE_CURRENCY:
      const updateCurrencyAction = action as UpdateCurrencyAction
      const selectedCurrency = state.currency.rates.find(
        _ => _.name === updateCurrencyAction.payload
      ) as CurrencyRateType

      return {
        ...state,
        currency: {
          ...state.currency,
          selected: selectedCurrency,
        },
      }

    // By default, if not action, return state unchanged
    default:
      return state
  }
}

export default reducer
