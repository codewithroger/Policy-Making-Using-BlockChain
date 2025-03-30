const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    contractAddress: String,
    docId: Number,
    fileName: String,
    ipfsHash: String,
    owner: String,
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
