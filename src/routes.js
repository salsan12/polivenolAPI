const { renderViewHandler, getAllProductHandler, addProductsHandler, getDetailProductByIdHandler, editProductByIdHandler, deleteProductByIdHandler } = require("./handler")

const routes = [
  {
    method: "GET",
    path: "/",
    handler: renderViewHandler,
  },
  {
    method: "GET",
    path: "/products",
    handler: getAllProductHandler,
  },
  {
    method: "POST",
    path: "/products",
    handler: addProductsHandler,
  },
  {
    method: "GET",
    path: "/products/{id}",
    handler: getDetailProductByIdHandler,
  },
  {
    method: "PUT",
    path: "/products/{id}",
    handler: editProductByIdHandler,
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    handler: deleteProductByIdHandler,
  },
];

module.exports = routes;