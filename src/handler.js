const { nanoid } = require("nanoid");
const {
  loadProducts,
  addProducts,
  isProductSaved,
  loadProductDetail,
  findProductIndex,
  saveProducts,
  deleteProduct,
} = require("./utils/product-helper");

// RENDER VIEW

const renderViewHandler = (request, h) => {
  return h.view("index");
};

// RENDER VIEW

// GET ALL PRODUCT

const getAllProductHandler = () => ({
  status: "success",
  total: loadProducts().length,
  products: loadProducts(),
});

// GET ALL PRODUCT

// ADD PRODUCT

const addProductsHandler = (request, h) => {
  const { title, image, desc, tokopedia, instagram, location, productType } =
    request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newProduct = {
    id,
    title,
    image,
    desc,
    tokopedia,
    instagram,
    location,
    productType,
    insertedAt,
    updatedAt,
  };

  addProducts(newProduct);

  const isSuccess = isProductSaved(id);

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Produk berhasil ditambahkan",
      data: {
        id: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Produk gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// ADD PRODUCT

// GET DETAIL PRODUCT
const getDetailProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const productDetail = loadProductDetail(id);

  if (productDetail !== undefined) {
    return {
      status: "success",
      productDetail,
    };
  }

  const response = h.response({
    status: "fail",
    message: "Produk tidak ditemukan",
  });
  response.code(404);
  return response;
};
// GET DETAIL PRODUCT

// EDIT PRODUCT

const editProductByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, image, desc, tokopedia, instagram, location, productType } =
    request.payload;

  const productIndex = findProductIndex(id);

  if (productIndex === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui produk. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const products = loadProducts();
  products[productIndex] = {
    ...products[productIndex],
    title,
    image,
    desc,
    tokopedia,
    instagram,
    location,
    productType,
    updatedAt,
  };

  saveProducts(products);

  const response = h.response({
    status: "success",
    message: "Produk berhasil diperbarui",
  });
  response.code(200);
  return response;
};

// EDIT PRODUCT

const deleteProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const productIndex = findProductIndex(id);

  if (productIndex !== -1) {
    deleteProduct(id);
    const response = h.response({
      status: "success",
      message: "Produk berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Produk gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  renderViewHandler,
  getAllProductHandler,
  addProductsHandler,
  getDetailProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
};
