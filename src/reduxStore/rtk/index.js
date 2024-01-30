import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend.millatsports.com.pk/api",
    // baseUrl: "https://4767-39-49-130-113.ngrok-free.app/api",
    // headers: {
    //     "ngrok-skip-browser-warning": "69420",
    //   },
  }),

  endpoints: (builder) => ({
    getEmcommerceProducts: builder.query({
      query: () => ({
        url: `/EcommerceProduct/GetProducts`,
        
        responseHandler: (response) => response.json(),
      }),
    }),
    getFeaturedProduct: builder.query({
      query: () => ({
        url: `/EcommerceProduct/GetFeatured`,
        responseHandler: (response) => response.json(),
      }),
    }),
    getTopSellingProducts: builder.query({
      query: () => ({
        url: `/EcommerceProduct/GetBestSelling`,
        responseHandler: (response) => response.json(),
      }),
    }),
    getProductById: builder.query({
      query: (userId) => ({
        url: `/EcommerceProduct/GetProductById?id=${userId}`,

        responseHandler: (response) => response.json(),
      }),
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: `/EcommerceProduct/GetProductCategories`,
        responseHandler: (response) => response.json(),
      }),
    }),
    //TopBrands Category
    getProductCategoryById: builder.query({
      query: (idOfCategory) => ({
        url: `/EcommerceProduct/GetProductCategoryById?id=${idOfCategory}`,
        responseHandler: (response) => response.json(),
      }),
    }),
    getProductByCategory: builder.query({
      query: (userId) => ({
        url: `/EcommerceProduct/GetProductByCategory?id=${userId}`,
        responseHandler: (response) => response.json(),
      }),
    }),
    getProductByCategoryName: builder.query({
      query: (categoryName) => ({
        url: `/EcommerceProduct/GetProductByCategoryName?Name=${categoryName}`,
        responseHandler: (response) => response.json(),
      }),
    }),
    getProductByTopBrandCartegoryName: builder.query({
      query: (category) => ({
        url: `/EcommerceProduct/GetProductByParentCategory?id=${category}`,
        responseHandler: (response) => response.json(),
      }),
    }),
    getProductVariations: builder.query({
      query: () => ({
        url: `/EcommerceProduct/GetProductVariations`,
        responseHandler: (response) => response.json(),
      }),
    }),
    getProductByVariations: builder.query({
      query: (Id) => ({
        url: `/EcommerceProduct/GetProductByVariation?id=${Id}`,
        responseHandler: (response) => response.json(),
      }),
    }),
    signupUser: builder.mutation({
      query: (user) => ({
        url: `/EcommerceUser/Post`,
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: `/EcommerceUser/Authenticate`,
        method: "POST",
        body: user,
      }),
    }),
    checkOut: builder.mutation({
      query: (selectedFilter1) => ({
        url: `/EcommerceOrder/Post?userId=${selectedFilter1.UserId}`,
        method: "POST",
        body: selectedFilter1,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (user) => ({
        url: `/EcommerceUser/ForgotPassword?username=${user}`,
        method: "POST",
        // body: user,
      }),
    }),
    ChangePassword: builder.mutation({
      query: (user) => ({
        url: `/EcommerceUser/ChangePassword`,
        method: "POST",
        body: user,
      }),
    }),
    // updateUser: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/user/${id}`,
    //     method: "PATCH",
    //     body: rest,
    //   }),
    // }),
    // deleteUser: builder.mutation({
    //   query: (id) => ({
    //     url: `/user/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useGetEmcommerceProductsQuery,
  useGetFeaturedProductQuery,
  useGetTopSellingProductsQuery,
  useGetProductByIdQuery,
  useGetProductByCategoryNameQuery,
  useGetProductByTopBrandCartegoryNameQuery,
  useGetProductByCategoryQuery,
  useGetProductCategoryByIdQuery,
  useGetProductCategoriesQuery,
  useGetProductVariationsQuery,
  useGetProductByVariationsQuery,

  //POST CALL's APIs
  useSignupUserMutation,
  useLoginUserMutation,
  useCheckOutMutation,
  useForgetPasswordMutation,
  useChangePasswordMutation,
} = userApi;
