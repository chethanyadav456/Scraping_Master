import mongoose from 'mongoose';
import { config } from '../../config.js';

const dbConnect = async () => {
    try {
        await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default dbConnect;