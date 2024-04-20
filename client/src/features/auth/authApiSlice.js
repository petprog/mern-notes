import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
      query: (credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
      validateStatus: (response) => {
        return response.status === 200;
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginQuery, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
