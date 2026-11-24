const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [];
let blogs = [];

app.get("/", (req, res) => {
    res.send("Blog Application Backend is Running!");
});

app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    if (users.find(user => user.email === email)) {
        return res.status(409).json({ message: "Email already registered" });
    }

    users.push({ name, email, password });
    res.status(201).json({ message: "Registration successful!" });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful!", name: user.name });
});

app.post("/api/blogs", (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        content,
        author: author || "Guest"
    };

    blogs.push(newBlog);
    res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
});

app.get("/api/blogs", (req, res) => {
    res.json({ message: "Blogs fetched successfully!", blogs });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});