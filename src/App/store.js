import { configureStore } from "@reduxjs/toolkit";
import adminAuthSlice from "./features/adminAuthSlice";
import bannerSlice from "./features/bannerSlice";
import cartSlice from "./features/cartSlice";
import categorySlice from "./features/categorySlice";
import couponSlice from "./features/couponSlice";
import customerAuthSlice from "./features/customerAuthSlice";
import customersSlice from "./features/customersSlice";
import frontendProductsSlice from "./features/frontendProductsSlice";
import ordersSlice from "./features/ordersSlice";
import productsSlice from "./features/productsSlice";
import usersSlice from "./features/usersSlice";


const store = configureStore({
    reducer: {
        adminAuth: adminAuthSlice,
        customerAuth: customerAuthSlice,
        banner: bannerSlice,
        category: categorySlice,
        coupon: couponSlice,
        users: usersSlice,
        customers: customersSlice,
        products: productsSlice,
        frontendProducts: frontendProductsSlice,
        orders: ordersSlice,
        cart: cartSlice,
    }
})

export default store