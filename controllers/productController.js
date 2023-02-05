import Product from './../model/Product.js';
import Category from './../model/category.js';

export const createProduct = async (req, res) => {
 const {name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,} = req.body;

 const productExist = await Product.findOne({name});
 if(productExist){
  throw new Error("Product are exists");
 }

 const categoryFound = await Category.findOne({
   name: category
 })
 if(!categoryFound){
   throw new Error("Category not found, please create category")
 }
 const product = await Product.create({
  name,
    description,
    category,
    sizes,
    colors,
    user: req.user,
    price,
    totalQty,
    brand,
 });
 categoryFound.products.push(product._id)
 await categoryFound.save();
 res.json({
  status: "success",
  message: "Product created successfully",
  product,
 })
}

export const getProduct = async (req,res,next) => {
   let productQuery = Product.find();
   if(req.query.name){
      productQuery = productQuery.find({
         name: {$regex: req.query.name, $options: 'i'},
      });
   }
 if(req.query.brand){
      productQuery = productQuery.find({
         brand: {$regex: req.query.brand, $options: 'i'},
      });
   }
  if(req.query.category){
      productQuery = productQuery.find({
         category: {$regex: req.query.category, $options: 'i'},
      });
   }
     if(req.query.color){
      productQuery = productQuery.find({
         colors: {$regex: req.query.colors, $options: 'i'},
      });
   }
  if(req.query.size){
      productQuery = productQuery.find({
         sizes: {$regex: req.query.sizes, $options: 'i'},
      });
   }
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);
   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;
   const total = await Product.countDocuments();
   productQuery = productQuery.skip(startIndex).limit(limit);
   const pagination = {}
   if(endIndex < total){
      pagination.next = {
         page: page + 1,
         limit,
      };
   }
   if(startIndex > 0){
      pagination.prev = {
         page: page - 1,
         limit,
      }
   }
   const product = await productQuery.populate('reviews');
   res.json({
      message: "successfully",
      total,
      results: product.length,
      pagination,
      message: "Products successfully fitched",
      product,
   })
}

export const getProductCtrl = async (req,res,next) => {
   const product = await Product.findById(req.params.id).populate('reviews')
   if(!product){
      throw new Error('Product not found');
   };
   res.json({
      status: "success",
      message: "Product fetched successfully",
      product
   })
}

export const updateProduct = async (req,res,next) => {
   const {name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,} = req.body;


   const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand
   },
   {
      new: true,
   }
   );
   res.json({
      status: "success",
      message: "Product updated successfully",
      product
   })
}

export const deleteProduct = async (req,res,next) => {
  await Product.findByIdAndDelete(req.params.id);
   res.json({
      status: "success",
      message: "Product deleted successfully",
   })
}