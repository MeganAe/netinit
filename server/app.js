const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const db = require("./db");
const { setAuthCookie, clearAuthCookie, requireAuth } = require("./auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

// ─── Authentification ───

app.post("/api/register", async (req, res) => {
  const { nom, email, mot_de_passe, avatarSeed } = req.body || {};
  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }
  if (mot_de_passe.length < 6) {
    return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères." });
  }

  const emailNorm = email.toLowerCase().trim();
  try {
    const existe = await db.getUserByEmail(emailNorm);
    if (existe) return res.status(409).json({ error: "Un compte existe déjà avec cet email." });

    const hash = bcrypt.hashSync(mot_de_passe, 10);
    const user = await db.createUser(nom.trim(), emailNorm, hash, avatarSeed);
    setAuthCookie(res, user.id);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, mot_de_passe } = req.body || {};
  if (!email || !mot_de_passe) {
    return res.status(400).json({ error: "Email et mot de passe requis." });
  }

  try {
    const user = await db.getUserByEmail(email.toLowerCase().trim());
    if (!user || !bcrypt.compareSync(mot_de_passe, user.mot_de_passe)) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }
    setAuthCookie(res, user.id);
    res.json({ id: user.id, nom: user.nom, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
});

app.post("/api/logout", (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

app.get("/api/me", requireAuth, async (req, res) => {
  const user = await db.getUserById(req.userId);
  if (!user) return res.status(401).json({ error: "Session invalide." });
  res.json(user);
});

app.patch("/api/me/avatar", requireAuth, async (req, res) => {
  const { avatarSeed } = req.body || {};
  if (!avatarSeed || typeof avatarSeed !== "string") {
    return res.status(400).json({ error: "Avatar invalide." });
  }
  await db.updateAvatar(req.userId, avatarSeed.slice(0, 64));
  res.json({ ok: true });
});

app.patch("/api/me/name", requireAuth, async (req, res) => {
  const { nom } = req.body || {};
  if (!nom || typeof nom !== "string" || !nom.trim()) {
    return res.status(400).json({ error: "Nom invalide." });
  }
  await db.updateName(req.userId, nom.trim().slice(0, 100));
  res.json({ ok: true, nom: nom.trim().slice(0, 100) });
});

app.delete("/api/me", requireAuth, async (req, res) => {
  await db.deleteUser(req.userId);
  clearAuthCookie(res);
  res.json({ ok: true });
});

// ─── Leçons ───

app.get("/api/lessons", requireAuth, async (req, res) => {
  const lecons = await db.getLecons();
  const progression = await db.getProgressionForUser(req.userId);
  const progMap = Object.fromEntries(progression.map((p) => [p.lecon_id, p]));

  res.json(
    lecons.map((l) => ({
      ...l,
      terminee: !!progMap[l.id]?.terminee,
      score: progMap[l.id]?.score ?? null,
      total: progMap[l.id]?.total ?? null,
    }))
  );
});

app.get("/api/lessons/:id", requireAuth, async (req, res) => {
  const lecon = await db.getLeconById(req.params.id);
  if (!lecon) return res.status(404).json({ error: "Leçon introuvable." });

  const progression = await db.getProgressionForUser(req.userId);
  const prog = progression.find((p) => String(p.lecon_id) === String(lecon.id));

  res.json({ ...lecon, terminee: !!prog?.terminee, score: prog?.score ?? null, total: prog?.total ?? null });
});

// ─── Quiz ───

app.get("/api/lessons/:id/quiz", requireAuth, async (req, res) => {
  const questions = await db.getQuizByLecon(req.params.id);
  if (questions.length === 0) return res.status(404).json({ error: "Quiz introuvable." });
  res.json(questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
  })));
});

app.post("/api/lessons/:id/quiz", requireAuth, async (req, res) => {
  const leconId = req.params.id;
  const reponses = (req.body && req.body.reponses) || {};

  const questions = await db.getQuizAnswersByLecon(leconId);
  if (questions.length === 0) return res.status(404).json({ error: "Quiz introuvable." });

  let score = 0;
  questions.forEach((q) => {
    if (reponses[q.id] && reponses[q.id] === q.reponse_correcte) score += 1;
  });
  const total = questions.length;

  await db.upsertProgression(req.userId, leconId, score, total);
  res.json({ score, total });
});

// ─── Progression globale ───

app.get("/api/progress", requireAuth, async (req, res) => {
  const lecons = await db.getLecons();
  const progression = await db.getProgressionForUser(req.userId);
  const progMap = Object.fromEntries(progression.map((p) => [p.lecon_id, p]));

  const details = lecons.map((l) => ({
    id: l.id,
    titre: l.titre,
    terminee: !!progMap[l.id]?.terminee,
    score: progMap[l.id]?.score ?? null,
    total: progMap[l.id]?.total ?? null,
    date_completion: progMap[l.id]?.date_completion ?? null,
  }));

  res.json({
    leconsTerminees: details.filter((d) => d.terminee).length,
    leconsTotal: lecons.length,
    details,
  });
});

// ─── Classement ───

app.get("/api/leaderboard", requireAuth, async (req, res) => {
  const rows = await db.getLeaderboard();
  res.json(
    rows.map((r) => ({
      id: r.id,
      nom: r.nom,
      avatar_seed: r.avatar_seed,
      leconsTerminees: Number(r.lecons_terminees),
      scoreTotal: Number(r.score_total),
    }))
  );
});

module.exports = app;
