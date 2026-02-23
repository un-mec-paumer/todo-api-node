const request = require("supertest");
const app = require("../app");
const { getDb } = require("../database/database");

describe("Todo API", () => {
    let db;

    beforeAll(async () => {
        db = await getDb();
    });

    beforeEach(() => {
        // vider la table todos avant chaque test
        db.run("DELETE FROM todos");
    });

    test("POST /todos - crée un todo", async () => {
        const res = await request(app)
            .post("/todos")
            .send({ title: "Test Todo", description: "desc" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.title).toBe("Test Todo");
    });

    test("POST /todos - titre manquant", async () => {
        const res = await request(app)
            .post("/todos")
            .send({ description: "no title" });

        expect(res.statusCode).toBe(422);
        expect(res.body.detail).toBe("title is required");
    });

    test("GET /todos - liste les todos", async () => {
        await request(app).post("/todos").send({ title: "Todo 1" });
        await request(app).post("/todos").send({ title: "Todo 2" });

        const res = await request(app).get("/todos");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    test("GET /todos/:id - récupère un todo par ID", async () => {
        const postRes = await request(app).post("/todos").send({ title: "Todo X" });
        const id = postRes.body.id;

        const res = await request(app).get(`/todos/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body.title).toBe("Todo X");
    });

    test("PUT /todos/:id - met à jour un todo", async () => {
        const postRes = await request(app).post("/todos").send({ title: "Todo Y" });
        const id = postRes.body.id;

        const res = await request(app)
            .put(`/todos/${id}`)
            .send({ title: "Updated Todo" });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Todo");
    });

    test("DELETE /todos/:id - supprime un todo", async () => {
        const postRes = await request(app).post("/todos").send({ title: "Todo Z" });
        const id = postRes.body.id;

        const res = await request(app).delete(`/todos/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.detail).toBe("Todo deleted");
    });
});