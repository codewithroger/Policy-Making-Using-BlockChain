const formData = new FormData();
formData.append("file", selectedFile);

fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData
})
.then(response => response.json())
.then(data => console.log("Uploaded:", data))
.catch(error => console.error("Error:", error));
