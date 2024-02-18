import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle get request to fetch users
app.get("/users", async (req, res) => {
  // const users = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Bob Williams" },
  //   { id: 3, name: "Shannon Jackson" },
  // ];
  const limit = +req.query.limit || 10;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  );
  const users = await response.json();

  res.send(`
  <h1 class="text-2xl font-bold my4">Users</h1>
  <ul>${users.map((user) => `<li>${user.name}</li>`).join("")}</ul>`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
