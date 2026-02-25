const { Router } = require("express");
const { getDb, saveDb } = require("../database/database");

const router = Router();

// POST /todos
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       201:
 *         description: Todo created
 *       422:
 *         description: Missing title
 */
router.post("/", async (req, res) => {
  try {
    const { title, description = null, status = "pending" } = req.body;
    if (!title) {
      return res.status(422).json({ detail: "title is required" });
    }

    const db = await getDb();
    db.run(
      "INSERT INTO todos (title, description, status) VALUES (?, ?, ?)",
      [title, description, status]
    );

    const id = db.exec("SELECT last_insert_rowid() as id")[0].values[0][0];
    const row = db.exec("SELECT * FROM todos WHERE id = ?", [id]);
    saveDb();

    res.status(201).json(toObj(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// GET /todos
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get("/", async (req, res) => {
  try {
    const skip = Number.parseInt(req.query.skip) || 0;
    const limit = Number.parseInt(req.query.limit) || 10;

    const db = await getDb();
    const rows = db.exec("SELECT * FROM todos LIMIT ? OFFSET ?", [limit, skip]);
    const todos = toArray(rows);

    console.log(`found ${todos.length} todos`);
    res.json(todos);
  } catch (err) {
    console.error("GET /todos error:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// GET /todos/:id
/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo found
 *       404:
 *         description: Todo not found
 */
router.get("/:id", async (req, res) => {
  try {
    const db = await getDb();
    const rows = db.exec("SELECT * FROM todos WHERE id = ?", [req.params.id]);

    if (!rows.length || !rows[0].values.length) {
      return res.status(404).json({ detail: "Todo not found" });
    }

    res.json(toObj(rows));
  } catch (err) {
    console.error("GET /todos/:id error:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// PUT /todos/:id
/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated todo
 *       404:
 *         description: Todo not found
 */
router.put("/:id", async (req, res) => {
  try {
    const db = await getDb();
    const existing = db.exec("SELECT * FROM todos WHERE id = ?", [req.params.id]);

    if (!existing.length || !existing[0].values.length) {
      return res.status(404).json({ detail: "Todo not found" });
    }

    const old = toObj(existing);
    const title = req.body.title ?? old.title;
    const description = req.body.description ?? old.description;
    const status = req.body.status ?? old.status;

    db.run(
      "UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, req.params.id]
    );

    const rows = db.exec("SELECT * FROM todos WHERE id = ?", [req.params.id]);
    saveDb();

    res.json(toObj(rows));
  } catch (err) {
    console.error("PUT /todos/:id error:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// DELETE /todos/:id
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted
 *       404:
 *         description: Todo not found
 */
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb();
    const existing = db.exec("SELECT * FROM todos WHERE id = ?", [req.params.id]);

    if (!existing.length || !existing[0].values.length) {
      return res.status(404).json({ detail: "Todo not found" });
    }

    db.run("DELETE FROM todos WHERE id = ?", [req.params.id]);
    saveDb();

    res.json({ detail: "Todo deleted" });
  } catch (err) {
    console.error("DELETE /todos/:id error:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// search endpoint
/**
 * @swagger
 * /todos/search/all:
 *   get:
 *     summary: Search todos by title
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/search/all", async (req, res) => {
  try {
    const q = `%${req.query.q || ""}%`;
    const db = await getDb();
    const results = db.exec(
      "SELECT * FROM todos WHERE title LIKE ?",
      [q]
    );
    res.json(toArray(results));
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// Helpers
function toObj(rows) {
  const cols = rows[0].columns;
  const vals = rows[0].values[0];
  const obj = {};
  cols.forEach((c, i) => (obj[c] = vals[i]));
  return obj;
}

function toArray(rows) {
  if (!rows.length) return [];
  const cols = rows[0].columns;
  return rows[0].values.map((vals) => {
    const obj = {};
    cols.forEach((c, i) => (obj[c] = vals[i]));
    return obj;
  });
}

module.exports = router;
