CREATE DATABASE IF NOT EXISTS todos_pmnt;
USE todos_pmnt;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  description VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  startDate DATE NOT NULL,
  deadline DATE NOT NULL
);
