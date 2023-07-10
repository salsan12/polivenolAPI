const fs = require('fs');

const dataPath = './src/data/products.json';

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadProducts = () => {
  const fileBuffer = fs.readFileSync("./src/data/products.json", "utf-8");
  const products = JSON.parse(fileBuffer);
  return products;
};

const saveProducts = (products) => {
  fs.writeFileSync("./src/data/products.json", JSON.stringify(products));
};

const addProducts = (product) => {
  const products = loadProducts();
  products.push(product);
  saveProducts(products);
};

const isProductSaved = (id) => {
  const products = loadProducts();
  return products.filter((product) => product.id === id).length > 0;
};

const loadProductDetail = (id) => {
  const products = loadProducts();
  return products.filter((n) => n.id === id)[0];
}

const findProductIndex = (id) => {
  const products = loadProducts();
  return products.findIndex((product) => product.id === id);
};

const deleteProduct = (id) => {
  const products = loadProducts();
  const filteredProducts = products.filter((product) => product.id != id);
  saveProducts(filteredProducts);
};

module.exports = {
  loadProducts,
  saveProducts,
  addProducts,
  isProductSaved,
  loadProductDetail,
  findProductIndex,
  deleteProduct,
};