import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../utils/burger-api';

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);
