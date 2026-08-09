// ─── Authentification sans état (cookie JWT) ───
// Remplace express-session : sur une plateforme serverless comme Vercel,
// chaque requête peut être traitée par une instance différente, donc une
// session gardée en mémoire côté serveur (MemoryStore) n'est pas fiable.
// Un jeton signé, stocké dans un cookie httpOnly, se vérifie sans état
// partagé et fonctionne donc correctement sur Vercel.

const jwt = require("jsonwebtoken");

const COOKIE_NAME = "netinit_token";
const SECRET = process.env.JWT_SECRET || "dev-secret-a-changer-en-production";

if (!process.env.JWT_SECRET && process.env.VERCEL) {
  console.warn("⚠️  JWT_SECRET n'est pas défini : ajoutez-le dans les variables d'environnement Vercel.");
}

function signToken(userId) {
  return jwt.sign({ uid: userId }, SECRET, { expiresIn: "8h" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET).uid;
  } catch (_) {
    return null;
  }
}

function setAuthCookie(res, userId) {
  res.cookie(COOKIE_NAME, signToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 8 * 60 * 60 * 1000,
    path: "/",
  });
}

function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}

// Middleware Express : exige un cookie valide, sinon 401.
function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies[COOKIE_NAME];
  const userId = token && verifyToken(token);
  if (!userId) return res.status(401).json({ error: "Vous devez être connecté." });
  req.userId = userId;
  next();
}

module.exports = { setAuthCookie, clearAuthCookie, requireAuth };
