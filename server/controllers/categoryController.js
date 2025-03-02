import { Category } from "../model/categorySchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const categoryAdd = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    console.log(req.body);

    const image = req.file; // If using single upload with Multer
    console.log(image);

    if (!image) {
        return res.status(400).json({ success: false, message: "Image is required" });
    }

    const check = await Category.findOne({ name });
    if (check) {
        return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const newCategory = new Category({
        name,
        description,
        image: image.path // Assuming Multer saves the image path
    });

    await newCategory.save();
    res.status(201).json({ success: true, message: "Category created successfully" });
});

export const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});
