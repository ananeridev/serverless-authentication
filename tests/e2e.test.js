const axios = require("axios");
const url = "http://localhost:3003";

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
});
