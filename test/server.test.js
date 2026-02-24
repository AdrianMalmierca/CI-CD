const request = require("supertest");
const app = require("../server");

describe("GET /", () => {
  it("Debe devolver un mensaje Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello World from CI/CD demo!");
  });
});