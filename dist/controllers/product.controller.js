import { Product } from "../models/product.model.js";
export const create = async (req, res, next) => {
    try {
        const { name, sku, unit, reorderLevel } = req.body;
        const product = await Product.create({ name, sku, unit, reorderLevel });
        res.status(201).json({ message: "Product created successfully", product });
    }
    catch (error) {
        next(error);
    }
};
export const list = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (error) {
        next(error);
    }
};
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, sku, unit, reorderLevel } = req.body;
        const product = await Product.findByPk(id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        await product.update({ name, sku, unit, reorderLevel });
        res.json({ message: "Product updated", product });
    }
    catch (error) {
        next(error);
    }
};
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        await product.destroy();
        res.json({ message: "Product deleted" });
    }
    catch (error) {
        next(error);
    }
};
