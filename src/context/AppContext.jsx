
import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
  cart: [],
  products: [
    {
      id: '1',
      name: 'Fresh Farm Eggs (Dozen)',
      category: 'eggs',
      price: 350,
      unit: 'dozen',
      description: 'Fresh, free-range eggs from our healthy hens. Rich in protein and perfect for your daily nutrition needs.',
      image: 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 50,
      featured: true
    },
    {
      id: '2',
      name: 'Live Broiler Chicken',
      category: 'live-chickens',
      price: 1500,
      unit: 'piece',
      description: 'Healthy, well-fed broiler chickens ready for your farm or table. Raised with natural feed and care.',
      image: 'https://images.pexels.com/photos/840111/pexels-photo-840111.jpeg',
      stock: 25,
      featured: true
    },
    {
      id: '3',
      name: 'Fresh Chicken Meat (1kg)',
      category: 'meat',
      price: 800,
      unit: 'kg',
      description: 'Premium quality chicken meat, freshly processed and ready to cook. Perfect for your favorite recipes.',
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 30,
      featured: true
    },
    {
      id: '4',
      name: 'Organic Brown Eggs (6 pieces)',
      category: 'eggs',
      price: 200,
      unit: '6 pieces',
      description: 'Premium organic brown eggs from free-range hens. Higher in omega-3 fatty acids.',
      image: 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 40
    },
    {
      id: '5',
      name: 'Live Layers (Hen)',
      category: 'live-chickens',
      price: 1200,
      unit: 'piece',
      description: 'Productive laying hens perfect for starting your own egg production.',
      image: 'https://images.pexels.com/photos/840111/pexels-photo-840111.jpeg',
      stock: 15
    },
    {
      id: '6',
      name: 'Chicken Thighs (500g)',
      category: 'meat',
      price: 450,
      unit: '500g',
      description: 'Tender chicken thighs, perfect for grilling or roasting.',
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 20
    },
    {
      id: '7',
      name: 'Fresh Farm Eggs (Dozen)',
      category: 'eggs',
      price: 350,
      unit: 'dozen',
      description: 'Fresh, free-range eggs from our healthy hens. Rich in protein and perfect for your daily nutrition needs.',
      image: 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 50,
      featured: true
    },
    {
      id: '8',
      name: 'Live Broiler Chicken',
      category: 'live-chickens',
      price: 1500,
      unit: 'piece',
      description: 'Healthy, well-fed broiler chickens ready for your farm or table. Raised with natural feed and care.',
      image: 'https://images.pexels.com/photos/840111/pexels-photo-840111.jpeg',
      stock: 25,
      featured: true
    },
    {
      id: '9',
      name: 'Fresh Chicken Meat (1kg)',
      category: 'meat',
      price: 800,
      unit: 'kg',
      description: 'Premium quality chicken meat, freshly processed and ready to cook. Perfect for your favorite recipes.',
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 30,
      featured: true
    },
     {
      id: '10',
      name: 'Fresh Farm Eggs (Dozen)',
      category: 'eggs',
      price: 350,
      unit: 'dozen',
      description: 'Fresh, free-range eggs from our healthy hens. Rich in protein and perfect for your daily nutrition needs.',
      image: 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 50,
      featured: true
    },
    {
      id: '11',
      name: 'Live Broiler Chicken',
      category: 'live-chickens',
      price: 1500,
      unit: 'piece',
      description: 'Healthy, well-fed broiler chickens ready for your farm or table. Raised with natural feed and care.',
      image: 'https://images.pexels.com/photos/840111/pexels-photo-840111.jpeg',
      stock: 25,
      featured: true
    },
    {
      id: '12',
      name: 'Fresh Chicken Meat (1kg)',
      category: 'meat',
      price: 800,
      unit: 'kg',
      description: 'Premium quality chicken meat, freshly processed and ready to cook. Perfect for your favorite recipes.',
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 30,
      featured: true
    },
     {
      id: '13',
      name: 'Fresh Farm Eggs (Dozen)',
      category: 'eggs',
      price: 350,
      unit: 'dozen',
      description: 'Fresh, free-range eggs from our healthy hens. Rich in protein and perfect for your daily nutrition needs.',
      image: 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 50,
      featured: true
    },
    {
      id: '14',
      name: 'Live Broiler Chicken',
      category: 'live-chickens',
      price: 1500,
      unit: 'piece',
      description: 'Healthy, well-fed broiler chickens ready for your farm or table. Raised with natural feed and care.',
      image: 'https://images.pexels.com/photos/840111/pexels-photo-840111.jpeg',
      stock: 25,
      featured: true
    },
    {
      id: '15',
      name: 'Fresh Chicken Meat (1kg)',
      category: 'meat',
      price: 800,
      unit: 'kg',
      description: 'Premium quality chicken meat, freshly processed and ready to cook. Perfect for your favorite recipes.',
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800',
      stock: 30,
      featured: true
    },
  ],
  orders: []
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':{
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };}
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    default:
      return state;
  }
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;