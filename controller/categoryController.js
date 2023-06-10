const Category = require("../models/CategoryModel")

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({ name: "asc" }).orFail()
        res.json(categories)
    } catch (error) {
        next(error)
    }
}

const newCategory = async (req, res, next) => {
    try {
        // res.send(!!req.body)
        const { category } = req.body
        if (!category) {
            res.status(400).send("Category input is required")
        }
        const categoryExists = await Category.findOne({ name: category })
        if (categoryExists) {
            res.status(400).send("Category is already exists")
        }
        else {
            const categoryCreated = await Category.create({
                name: category
            })
            res.status(201).send({ categoryCreated: categoryCreated })
        }
        res.send(category)
    } catch (err) {
        next(err)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        // The title of option list at front side
        if (req.params.category !== "Choose category") {
            const categoryExist = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail()
            await categoryExist.deleteOne()
            res.json({ categoryDeleted: true })
        }
    } catch (error) {
        next(error)
    }
}

const saveAttributes = async (req, res, next) => {
    const {key, val, categoryChoosen} = req.body
    if(!key || !val || !categoryChoosen) {
        return res.status(400).send("All inputs are required")
    }
    try {
        const category = categoryChoosen.split("/")[0]
        const categoryExists = await Category.findOne({name: category}).orFail()
        if(categoryExists.attrs.length > 0) {
            // if key exists in the database then add a value to the key
            var keyDoesNotExistsInDatabase = true
            categoryExists.attrs.map((item, idx) => {
                if(item.key === key) {
                    keyDoesNotExistsInDatabase = false
                    var copyAttributeValues = [...categoryExists.attrs[idx].value]
                    copyAttributeValues.push(val)
                    var newAttributeValues = [...new Set(copyAttributeValues)] // Set ensures unique values
                    categoryExists.attrs[idx].value = newAttributeValues
                }
            })

            if(keyDoesNotExistsInDatabase) {
                categoryExists.attrs.push({key: key, value: [val]})
            }
        } else {
            // push to the array
            categoryExists.attrs.push({key: key, value: [val]})
        }
        await categoryExists.save()
        let cat = await Category.find({}).sort({name: "asc"})
        return res.status(201).json({categoriesUpdated: cat})
    } catch(err) {
        next(err)
    }
}

module.exports = { getCategories, newCategory, deleteCategory, saveAttributes }