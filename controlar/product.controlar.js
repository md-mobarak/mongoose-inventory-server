const { getProductService, creteProductService } = require("../services/product.services")




exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product.find({}, '-name -quantity -_id')
        const products = await getProductService()
        res.status(200).json({
            status: 'success',
            data: products
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'file',
            message: "can not get the data",
            error: error.message
        })
    }
}


exports.createProduct = async (req, res, next) => {

    try {
        // save or crate 
        const result = await creteProductService(req.body)
        result.logger()
        // const product = new Product(req.body)
        // const result = await product.save()
        res.status(200).json({
            status: 'success',
            message: 'data inserted successfully',
            data: result
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'data inserted file',
            error: error.message
        })
    }

}


