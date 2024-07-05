import { configureStore } from "@reduxjs/toolkit";
import { userApis } from "./services/userApis";
import { emailApis } from "./services/emailApis";
import { filesApis } from "./services/filesApi";

export const store = configureStore({
    reducer:{
        [userApis.reducerPath]: userApis.reducer,
        [emailApis.reducerPath]: emailApis.reducer,
        [filesApis.reducerPath]: filesApis.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          userApis.middleware,
          emailApis.middleware,
          filesApis.middleware
    ),
});