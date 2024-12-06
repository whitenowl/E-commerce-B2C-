const Product = require("./../db/product");

async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model);
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

async function getAllProducts() {
  let products = await Product.find();
  return products.map((x) => x.toObject());
}

async function getProduct(id) {
  let product = await Product.findById(id);
  return product.toObject();
}

async function getNewProduct() {
  let newProducts = await Product.find({
    isNewed: true,
  });
  return newProducts.map((x) => x.toObject());
}

async function getFeaturedProduct() {
  let featuredProducts = await Product.find({
    isFeatured: true,
  });
  return featuredProducts.map((x) => x.toObject());
}

async function getProductForListing(
  searchTerm,
  categoryId,
  page,
  pageSize,
  sortBy,
  sortOrder,
  brandId
) {
  if (!sortBy) {
    sortBy = "price";
  }
  if (!sortOrder) {
    sortOrder = -1;
  }
  let queryFilter = {};
  if (searchTerm) {
    // Use a case-insensitive regex for both fields
    const regex = new RegExp(".*" + searchTerm + ".*", "i"); // 'i' for case-insensitive
  
    queryFilter.$or = [
      {
        name: { $regex: regex },
      },
      {
        shortdescription: { $regex: regex },
      }
    ];
  }
  
  if (categoryId) {
    queryFilter.categoryId = categoryId;
  }
  if (brandId) {
    queryFilter.brandId = brandId;
  }
  const products = await Product.find(queryFilter)
    .sort({
      [sortBy]: +sortOrder,
    })
    .skip((+page - 1) * pageSize)
    .limit(+pageSize);
  return products.map((x) => x.toObject());
}

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  getNewProduct,
  getFeaturedProduct,
  getProductForListing,
};
