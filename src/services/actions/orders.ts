import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';

export const fetchProfileOrders = createAsyncThunk(
  'orders/fetchProfileOrders',
  getOrdersApi
);
