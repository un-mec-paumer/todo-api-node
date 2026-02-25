const app = require("../app");
const request = require("supertest");


describe("API default route", () => {
    test("app is defined", () => {
        expect(app).toBeDefined();
    });
    
    test("GET /api/ renvoie un message de bienvenue", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Welcome to the Enhanced Express Todo App!");
    });

    test("GET /api/health renvoie status ok", async () => {
        const res = await request(app).get("/health");
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("ok");
    });
});