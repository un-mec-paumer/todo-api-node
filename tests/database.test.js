const fs = require("node:fs");

describe("Database Initialization", () => {
  // Avant chaque test, on nettoie le cache des modules et les mocks
  beforeEach(() => {
    jest.resetModules(); 
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("doit créer une nouvelle base de données si le fichier db n'existe pas", async () => {
    // 1. On force 'fs.existsSync' à faire croire que le fichier est absent
    const existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(false);

    // 2. On importe 'getDb' APRÈS avoir reset les modules pour repartir à zéro
    // (Ajuste le chemin './database' selon l'arborescence de tes tests)
    const { getDb } = require("../database/database");

    // 3. On appelle la fonction
    const db = await getDb();

    // 4. On vérifie que la ligne 20 a bien été exécutée indirectement
    expect(existsSyncSpy).toHaveBeenCalled();
    expect(db).toBeDefined(); // La base doit être initialisée
  });
});

describe("Database - Avertissement DB_PASSWORD (Lignes 32-34)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Indispensable car DB_PASSWORD est évalué au chargement du fichier
    jest.clearAllMocks();
    process.env = { ...originalEnv }; // Clone de l'environnement
  });

  afterAll(() => {
    process.env = originalEnv; // Restauration à la fin
    jest.restoreAllMocks();
  });

  it("doit afficher un avertissement si DB_PASSWORD n'est pas défini", async () => {
    // 1. On espionne console.warn pour vérifier s'il est appelé
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    
    // 2. On supprime la variable d'environnement
    delete process.env.DB_PASSWORD;

    // 3. On charge le module et on initialise
    const { getDb } = require("../database/database");
    await getDb();

    // 4. On vérifie que le message d'avertissement est bien passé
    expect(consoleWarnSpy).toHaveBeenCalledWith("DB_PASSWORD not set in environment variables");
  });

  it("ne doit pas afficher d'avertissement si DB_PASSWORD est défini", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    
    // On définit le mot de passe
    process.env.DB_PASSWORD = "super_secret_password";

    const { getDb } = require("../database/database");
    await getDb();

    // L'avertissement ne doit pas être appelé
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});

describe("Database - Fonction saveDb (Lignes 39-45)", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("doit sauvegarder la base sur le disque si elle est initialisée", async () => {
    // Espionne writeFileSync pour ne pas écrire de vrai fichier pendant le test
    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const { getDb, saveDb } = require("../database/database");

    // 1. On initialise d'abord la base (pour que 'db' existe)
    await getDb();

    // 2. On appelle la sauvegarde
    saveDb();

    // 3. On vérifie que l'écriture a bien eu lieu
    expect(consoleLogSpy).toHaveBeenCalledWith("saving database to disk");
    expect(writeFileSyncSpy).toHaveBeenCalled();
  });

  it("ne doit rien faire si la base n'est pas initialisée", () => {
    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});

    const { saveDb } = require("../database/database");

    // On appelle saveDb SANS avoir appelé getDb() avant
    saveDb();

    // L'écriture ne doit pas être déclenchée
    expect(writeFileSyncSpy).not.toHaveBeenCalled();
  });
});