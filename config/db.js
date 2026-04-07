const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const client = await mongoose.connect(process.env.mongodb);
        
        console.log('DB Connected')
        
    } catch (err) {
        console.error('error')
        process.exit(1);
    }
}

module.exports = {connectDb};