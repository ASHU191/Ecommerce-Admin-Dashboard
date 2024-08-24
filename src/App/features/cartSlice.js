import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartFromLocalStorage = localStorage.getItem('myProjectCart')
const cartItem = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
const total = cartItem.length ? Number((cartItem.map(item => item.total).reduce((a, b) => a + b)).toFixed(2)) : 0 ;
const totalProduct = cartItem.length ? Number((cartItem.map(item => item.quantity).reduce((a, b) => a + b)).toFixed(2)) : 0 ;

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items: cartItem,
        total: total,
        totalProduct: totalProduct
    },
    reducers: {

        addToCart: (state, action) => {
            const {id, title, price, image} = action.payload
            const alreadyExists = state.items.find(item => item.id === id)
            
            if(alreadyExists) {
                alreadyExists.quantity ++;
                alreadyExists.total += price;

                toast.dismiss()
                toast.info('Product Quantity Increased in Cart')
            } else {
                state.items.push({id, title, price, image, quantity:1, total: price})

                toast.dismiss()
                toast.success('Product Added to Cart')
            }
            const total = state.items.map(item => item.total).reduce((a, b) => a + b)
            state.total = Number(total.toFixed(2));
            state.totalProduct = state.totalProduct + 1;
            
            localStorage.setItem('myProjectCart', JSON.stringify(state.items))
        },
        
        decrementQuantity: (state, action) => {
            const { id, price } = action.payload;
            const targetItem = state.items.find(item => item.id === id )
            targetItem.quantity -= 1 ;
            targetItem.total -= price ;
            state.total = Number((state.total - price).toFixed(2));
            state.totalProduct = state.totalProduct - 1;
            
            localStorage.setItem('myProjectCart', JSON.stringify(state.items))
        },
        
        incrementQuantity: (state, action) => {
            const { id, price } = action.payload;
            const targetItem = state.items.find(item => item.id === id )
            targetItem.quantity += 1 ;
            targetItem.total += price ;

            state.total = Number((state.total + price).toFixed(2));
            state.totalProduct = state.totalProduct + 1;
            
            localStorage.setItem('myProjectCart', JSON.stringify(state.items))
        },

        removeFromCart: (state, action) => {
            const id = action.payload;

            state.items = state.items.filter(item => item.id !== id);
            localStorage.setItem('myProjectCart', JSON.stringify(state.items))

            if(state.items.length){
                const total = state.items.map(item => item.total).reduce((a, b) => a + b)
                state.total = Number(total.toFixed(2));
                
                const totalProduct = state.items.map(item => item.quantity).reduce((a, b) => a + b)
                state.totalProduct = Number(totalProduct)
            } else {
                state.total = 0;
                state.totalProduct = 0;
            }
        },

        clearCart: (state) => {
           state.items = [];
           state.total = 0;
           state.totalProduct = 0;

           localStorage.setItem('myProjectCart', JSON.stringify(state.items))
        }
    }
})

export const { addToCart, removeFromCart, decrementQuantity, incrementQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer