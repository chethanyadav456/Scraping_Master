import mongoose from "mongoose";

const dcWebhooksSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    webhookId: {
        type: String,
        required: true,
    },
    webhookToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    SentIDs: {
        type: Array,
        default: [],
    },
});

const DC_WEBHOOKS = mongoose.model("DC_WEBHOOKS", dcWebhooksSchema);

export default DC_WEBHOOKS;