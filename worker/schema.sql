-- Run once in the Cloudflare dashboard: D1 > wfo > Console.
CREATE TABLE IF NOT EXISTS messages (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  kind      TEXT    NOT NULL CHECK (kind IN ('board', 'question')),
  name      TEXT,
  body      TEXT    NOT NULL,
  country   TEXT,
  city      TEXT,
  ip_hash   TEXT    NOT NULL,
  status    TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created   INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS messages_public ON messages (kind, status, created);
CREATE INDEX IF NOT EXISTS messages_rate   ON messages (ip_hash, created);
