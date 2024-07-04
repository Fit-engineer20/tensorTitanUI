import { configureStore } from "@reduxjs/toolkit";
import { userApis } from "./services/userApis";
import { emailApis } from "./services/emailApis";

export const store = configureStore({
    reducer:{
        [userApis.reducerPath]: userApis.reducer,
        [emailApis.reducerPath]: emailApis.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          userApis.middleware,
          emailApis.middleware
    ),
});