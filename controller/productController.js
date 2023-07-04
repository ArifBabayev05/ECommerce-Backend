const recordsPerPage = require("../config/pagination");
const Product = require("../models/ProductModel")

const getProduct = async (req, res, next) => {
    try {
        let query = {};
        let queryCondition = false

        let priceQueryCondition = {};
        if (req.query.price) {
            queryCondition = true;
            priceQueryCondition = { price: { $lte: Number(req.query.price) } };
        }
        let ratingQueryCondition = {};
        if (req.query.rating) {
            queryCondition = true;
            ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
        }

        let categoryQueryCondition = {};
        const categoryName = req.params.categoryName || ""
        if (categoryName) {
            queryCondition = true;
            let a = categoryName.replaceAll(",", "/")
            var regEx = new RegExp("^" + a)
            categoryQueryCondition = {category: regEx}
        }

        if (queryCondition) {
            query = {
                $and: [priceQueryCondition, ratingQueryCondition]
            };
        }

        // Pagination
        const pageNum = Number(req.query.pageNum) || 1;

        // sorting
        let sort = {}
        const sortOption = req.query.sort || ""
        if (sortOption) {
            let sortOpt = sortOption.split("_")
            // seperate the option value: price_-1
            // first one is key, sec is value
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
            // console.log(sort)
        }

        // Filtering
        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage);

        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
        });
    } catch (error) {
        next(error);
    }

}

module.exports = getProduct;