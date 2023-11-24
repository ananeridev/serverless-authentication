const axios = require("axios");
const url = "http://localhost:3003";
const db = require("./db/db.json");


describe("End-to-end tests handler user", () => {
  let token;

  it("logs in", async () => {
    const response = await axios.post(`${url}/login`, {
      email: "test@example.com",
      password: "password",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("token");
    token = response.data.token;
  });

  it("creates a user", async () => {
    const response = await axios.post(
      `${url}/users`,
      { name: "Ana Neri", email: "ana@example.com" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("_id");
  });
  it("user can log in", async () => {
    const user = db.users.find((user) => user.email === "john@example.com");
    expect(user).toBeDefined();

    const response = await request(app)
      .post("/login")
      .send({ email: "john@example.com", password: "password" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
