const request = require("supertest");
const app = require("../server");

describe("API Endpoints", () => {
  it("GET / should return Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello World from CI/CD demo!");
  });

  it("GET /status should return status ok", async () => {
    const res = await request(app).get("/status");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /random should return a number", async () => {
    const res = await request(app).get("/random");
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.value).toBe("number");
  });

  it("GET /echo should return query message", async () => {
    const res = await request(app).get("/echo?msg=hi");
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("hi");
  });

  it("GET /users should return user list", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});