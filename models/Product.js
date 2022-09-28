const mongoose = require('mongoose')

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



module.exports = Product