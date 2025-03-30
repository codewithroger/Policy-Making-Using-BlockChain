require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { ethers } = require("ethers");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Document = mongoose.model("Document", {
    fileName: String,
    contractAddress: String,
    ipfsHash: String,
    owner: String,
});

// Setup storage for file uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Initialize ethers provider (without ENS settings)
const provider = new ethers.JsonRpcProvider(process.env.API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Upload file endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Simulate contract deployment and getting contract address
        const contractAddress = ethers.Wallet.createRandom().address;

        // Save document metadata to MongoDB
        const document = new Document({
            fileName: req.file.filename,
            contractAddress,
            ipfsHash: "QDDWMdwd", // Replace with real IPFS hash
            owner: wallet.address,
        });

        await document.save();
        res.json({
            message: "File uploaded successfully",
            contractAddress,
            fileName: req.file.filename,
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});

// Retrieve document endpoint
app.get("/document/:contractAddress", async (req, res) => {
    try {
        const document = await Document.findOne({ contractAddress: req.params.contractAddress });
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        res.json(document);
    } catch (error) {
        console.error("Retrieve error:", error);
        res.status(500).json({ error: "Failed to retrieve document" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
