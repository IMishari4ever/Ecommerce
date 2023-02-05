import Category from "../model/category.js"

export const createCategoryCtrl = async (req,res,next) => {
 const {name} = req.body;
 const categoryFound = await Category.findOne({name});
 if(categoryFound){
  throw new Error("Category already exist");
 };

 const category = await Category.create({
  name: name.toLowerCase(),
  user: req.user,
 })
 res.json({
  status: "success",
  message: "category created successfully",
  category,
 })
}

export const getAllCategoriesCtrl = async (req,res) => {
 const categories = await Category.find();
 res.json({
  status: "success",
  message: "Category fetched successfully",
  categories,
 })
}

export const getSingleCategoriesCtrl = async (req,res) => {
 const category = await Category.findById(req.params.id);
 res.json({
  status: "success",
  message: "Category fetched successfully",
  category,
 })
}

export const updateCategories = async (req,res,next) => {
   const {name} = req.body;
   const category = await Category.findByIdAndUpdate(
  req.params.id,
   {
      name
   },
   {
    new: true,
   }
   );
   res.json({
      status: "success",
      message: "Category updated successfully",
      category
   })
}

export const deleteCategory = async (req,res,next) => {
  await Category.findByIdAndDelete(req.params.id);
   res.json({
      status: "success",
      message: "Category deleted successfully",
   })
}