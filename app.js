const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


// middleware
app.use(express.json())
app.use(cors())

// schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your product name'],
        trim: true,
        unique: [true, 'Name must be Unique'],
        minLength: [3, 'Please provide your valid name of your product'],
        maxLength: [100, 'Name is too large']
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price can not be negative']
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ['pcs', 'kg', 'litre'],
            message: 'your value is must be pcs/kg/litre'
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'quantity can not be negative'],
        validator: {
            validator: (value) => {
                const integer = Number.isInteger(value)
                if (integer) {
                    return true
                } else {
                    false
                }
            }
        },
        message: 'Quantity must be an integer'

    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: 'status can not  be'
        }
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Supplier'
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }],
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
    // timestamps: true
})

// mongoose middleware for saving data pre or post 
productSchema.pre('save', function (next) {
    console.log('before saving data');
    if (this.quantity === 0) {
        this.status = 'out of stock'
    }
    next()
})


// productSchema.post('save', function (doc, next) {
//     console.log('After saving data');
//     next()
// })

productSchema.methods.logger = function () {
    console.log(`data save for ${this.name}`);
}

// MODEL 
const Product = mongoose.model('Product', productSchema)


app.get('/', (req, res) => {
    res.send('Route is Working YaY...')
})

// posting to database
app.post('/api/v1/product', async (req, res, next) => {

    try {
        // save or crate 
        const result = await Product.create(req.body)
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

})


app.get('/api/v1/product', async (req, res, next) => {
    try {
        // const products = await Product.find({}, '-name -quantity -_id')
        const products = await Product.findById('6330557963282b51aa520ec1')
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
})


module.exports = app;