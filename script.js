// Registration functionality
const registerForm = document.querySelector("#registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.querySelector("#regName").value;
        const email = document.querySelector("#regEmail").value;
        const password = document.querySelector("#regPassword").value;

        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        alert("Registration successful!");
        window.location.href = "login.html";
    });
}

// Login functionality
const loginForm = document.querySelector("#loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.querySelector("#loginEmail").value;
        const password = document.querySelector("#loginPassword").value;

        if (
            email === localStorage.getItem("userEmail") &&
            password === localStorage.getItem("userPassword")
        ) {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password!");
        }
    });
}

// Create Blog functionality
const blogForm = document.querySelector("#blogForm");

if (blogForm) {
    blogForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.querySelector("#blogTitle").value;
        const content = document.querySelector("#blogContent").value;

        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        blogs.push({
            title: title,
            content: content,
            author: localStorage.getItem("userName") || "Guest"
        });

        localStorage.setItem("blogs", JSON.stringify(blogs));

        alert("Blog published successfully!");
        window.location.href = "dashboard.html";
    });
}

// Display published blogs on Dashboard
const blogList = document.getElementById("blogList");

if (blogList) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    if (blogs.length === 0) {
        blogList.innerHTML = "<p>No blogs published yet.</p>";
    } else {
        blogs.forEach(function(blog) {
            const card = document.createElement("div");
            card.className = "dashboard-card";

            const title = document.createElement("h3");
            title.textContent = blog.title;

            const content = document.createElement("p");
            content.textContent = blog.content;

            const author = document.createElement("small");
            author.textContent = "By " + blog.author;

            card.appendChild(title);
            card.appendChild(content);
            card.appendChild(author);

            blogList.appendChild(card);
        });
    }
}