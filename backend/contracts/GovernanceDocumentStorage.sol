// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GovernanceDocumentStorage {
    struct Document {
        string ipfsHash;
        address owner;
    }

    mapping(uint256 => Document) public documents;
    uint256 public docCounter;

    event DocumentAdded(uint256 indexed docId, string ipfsHash, address owner);

    function addDocument(string memory _ipfsHash) public returns (uint256) {
        docCounter++;
        documents[docCounter] = Document(_ipfsHash, msg.sender);
        emit DocumentAdded(docCounter, _ipfsHash, msg.sender);
        return docCounter;
    }

    function getDocument(uint256 _docId) public view returns (string memory, address) {
        require(_docId > 0 && _docId <= docCounter, "Invalid Document ID");
        Document memory doc = documents[_docId];
        return (doc.ipfsHash, doc.owner);
    }
}
