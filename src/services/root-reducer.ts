import { combineReducers } from '@reduxjs/toolkit';

import { constructorReducer } from './slices/constructor-slice';
import { feedReducer } from './slices/feed-slice';
import { ingredientsReducer } from './slices/ingredients-slice';
import { ordersReducer } from './slices/orders-slice';
import { userReducer } from './slices/user-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  orders: ordersReducer
});
