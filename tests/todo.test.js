const request = require("supertest");
const express = require("express");
const todoRouter = require("../routes/todo");
const {getDb, saveDb} = require("../database/database");

const app = express();
app.use(express.json());
app.use("/todos", todoRouter);

describe("Todo API - couverture maximale", () => {
    let createdId;

    beforeAll(async () => {
        // On s'assure que la DB est initialisée
        await getDb();
    });

    beforeEach(async () => {
        // Nettoyer tous les todos avant chaque test
        const db = await getDb();
        db.run("DELETE FROM todos");
        saveDb();
    });

    test("POST /todos crée un todo avec succès", async () => {
        const res = await request(app)
            .post("/todos")
            .send({title: "Test Todo", description: "Desc"});
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe("Test Todo");
    });

    test("POST /todos sans title renvoie 422", async () => {
        const res = await request(app).post("/todos").send({});
        expect(res.status).toBe(422);
        expect(res.body.detail).toBe("title is required");
    });

    test("GET /todos liste tous les todos", async () => {
        await request(app).post("/todos").send({title: "Todo 1"});
        await request(app).post("/todos").send({title: "Todo 2"});

        const res = await request(app).get("/todos");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].title).toBe("Todo 1");
        expect(res.body[1].title).toBe("Todo 2");
    });

    test("GET /todos/:id récupère un todo existant", async () => {
        const post = await request(app).post("/todos").send({title: "Single Todo"});
        const id = post.body.id;

        const res = await request(app).get(`/todos/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.title).toBe("Single Todo");
    });

    test("GET /todos/:id inexistant renvoie 404", async () => {
        const res = await request(app).get("/todos/9999");
        expect(res.status).toBe(404);
        expect(res.body.detail).toBe("Todo not found");
    });

    test("PUT /todos/:id met à jour un todo existant", async () => {
        const post = await request(app).post("/todos").send({title: "Old Title"});
        const id = post.body.id;

        const res = await request(app).put(`/todos/${id}`).send({title: "Updated Title"});
        expect(res.status).toBe(200);
        expect(res.body.title).toBe("Updated Title");
    });

    test("PUT /todos/:id inexistant renvoie 404", async () => {
        const res = await request(app).put("/todos/9999").send({title: "update"});
        expect(res.status).toBe(404);
    });

    test("DELETE /todos/:id supprime un todo existant", async () => {
        const post = await request(app).post("/todos").send({title: "To Delete"});
        const id = post.body.id;

        const res = await request(app).delete(`/todos/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.detail).toBe("Todo deleted");
    });

    test("DELETE /todos/:id inexistant renvoie 404", async () => {
        const res = await request(app).delete("/todos/9999");
        expect(res.status).toBe(404);
    });

    test("GET /search/all avec résultat vide", async () => {
        const res = await request(app).get("/todos/search/all").query({q: "nothing"});
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test("GET /search/all avec résultat existant", async () => {
        await request(app).post("/todos").send({title: "RechercheTest"});
        const res = await request(app).get("/todos/search/all").query({q: "RechercheTest"});
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe("RechercheTest");
    });

    test("saveDb() fonctionne même si db n'est pas initialisé", async () => {
        const dbModule = require("../database/database");
        dbModule.db = undefined; // forcer db à undefined
        expect(() => dbModule.saveDb()).not.toThrow();
    });
});

describe("Todo API - Gestion des erreurs serveur (500)", () => {
    let db;
    let execSpy;
    let runSpy;
    let consoleErrorSpy;

    beforeAll(async () => {
        // 1. On récupère la VRAIE instance de la base de données
        const { getDb } = require("../database/database");
        db = await getDb();
        
        // 2. On sabote les requêtes SQL (exec et run) pour qu'elles lancent une erreur
        execSpy = jest.spyOn(db, "exec").mockImplementation(() => {
            throw new Error("Erreur SQL simulée (exec)");
        });
        runSpy = jest.spyOn(db, "run").mockImplementation(() => {
            throw new Error("Erreur SQL simulée (run)");
        });
        
        // 3. On masque les erreurs console pour garder un terminal propre
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterAll(() => {
        // 4. IMPORTANT : on répare la base de données pour les autres tests potentiels
        execSpy.mockRestore();
        runSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test("POST /todos déclenche une erreur 500 si la DB plante", async () => {
        const res = await request(app).post("/todos").send({title: "Plante STP"});
        expect(res.status).toBe(500);
        expect(res.body.detail).toBe("Internal server error");
    });

    test("GET /todos déclenche une erreur 500 si la DB plante", async () => {
        const res = await request(app).get("/todos");
        expect(res.status).toBe(500);
    });

    test("GET /todos/:id déclenche une erreur 500 si la DB plante", async () => {
        const res = await request(app).get("/todos/1");
        expect(res.status).toBe(500);
    });

    test("PUT /todos/:id déclenche une erreur 500 si la DB plante", async () => {
        const res = await request(app).put("/todos/1").send({title: "Update"});
        expect(res.status).toBe(500);
    });

    test("DELETE /todos/:id déclenche une erreur 500 si la DB plante", async () => {
        const res = await request(app).delete("/todos/1");
        expect(res.status).toBe(500);
    });

    test("GET /search/all déclenche une erreur 500 si la DB plante", async () => {
        const res = await request(app).get("/todos/search/all").query({q: "test"});
        expect(res.status).toBe(500);
    });
});