import dotenv from 'dotenv';
dotenv.config();

export const config = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/brd',
    BROWSER_WS: process.env.BROWSER_WS || 'ws://localhost:3000',
};