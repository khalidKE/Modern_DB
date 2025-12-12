// Setup script for Streaming Media Graph (Neo4j)
// Run in Neo4j Browser/Desktop by pasting this file.

// Optional: reset demo graph (comment out if you have existing data)
// MATCH (n) DETACH DELETE n;

// Movies
CREATE
  (m1:Movie {id: 1, title: "Signal Lost", releaseYear: 2024, durationMin: 115, rating: 8.1}),
  (m2:Movie {id: 2, title: "Riverlines", releaseYear: 2023, durationMin: 102, rating: 7.6}),
  (m3:Movie {id: 3, title: "Midnight Archive", releaseYear: 2022, durationMin: 98, rating: 7.9}),
  (m4:Movie {id: 4, title: "Northern Glow", releaseYear: 2021, durationMin: 108, rating: 8.3});

// Genres
CREATE
  (g1:Genre {name: "Sci-Fi"}),
  (g2:Genre {name: "Drama"}),
  (g3:Genre {name: "Documentary"}),
  (g4:Genre {name: "Thriller"});

// People
CREATE
  (p1:Person {id: 11, name: "Hana Saeed", role: "Director"}),
  (p2:Person {id: 12, name: "Youssef Galal", role: "Actor"}),
  (p3:Person {id: 13, name: "Mira Tawfik", role: "Actor"}),
  (p4:Person {id: 14, name: "Karim Hamdy", role: "Director"}),
  (p5:Person {id: 15, name: "Ola Nader", role: "Actor"}),
  (p6:Person {id: 16, name: "Rami Anwar", role: "Actor"});

// Users
CREATE
  (u1:User {id: 201, name: "Layla Saad", email: "layla@viewly.com"}),
  (u2:User {id: 202, name: "Omar Nasser", email: "omar@viewly.com"}),
  (u3:User {id: 203, name: "Sara Elrefai", email: "sara@viewly.com"}),
  (u4:User {id: 204, name: "Mostafa Adel", email: "mostafa@viewly.com"});

// Movie -> Genre
MATCH (m1:Movie {id: 1}), (m2:Movie {id: 2}), (m3:Movie {id: 3}), (m4:Movie {id: 4}),
      (g1:Genre {name: "Sci-Fi"}), (g2:Genre {name: "Drama"}), (g3:Genre {name: "Documentary"}), (g4:Genre {name: "Thriller"})
CREATE
  (m1)-[:HAS_GENRE]->(g1),
  (m2)-[:HAS_GENRE]->(g2),
  (m3)-[:HAS_GENRE]->(g3),
  (m4)-[:HAS_GENRE]->(g4),
  (m2)-[:HAS_GENRE]->(g1);

// Directors and actors
MATCH (m1:Movie {id: 1}), (m2:Movie {id: 2}), (m3:Movie {id: 3}), (m4:Movie {id: 4}),
      (p1:Person {id: 11}), (p2:Person {id: 12}), (p3:Person {id: 13}), (p4:Person {id: 14}), (p5:Person {id: 15}), (p6:Person {id: 16})
CREATE
  (p1)-[:DIRECTED]->(m1),
  (p4)-[:DIRECTED]->(m2),
  (p1)-[:DIRECTED]->(m3),
  (p4)-[:DIRECTED]->(m4),
  (p2)-[:ACTED_IN]->(m1),
  (p3)-[:ACTED_IN]->(m1),
  (p2)-[:ACTED_IN]->(m2),
  (p5)-[:ACTED_IN]->(m2),
  (p3)-[:ACTED_IN]->(m3),
  (p6)-[:ACTED_IN]->(m4);

// Users watched
MATCH (u1:User {id: 201}), (u2:User {id: 202}), (u3:User {id: 203}), (u4:User {id: 204}),
      (m1:Movie {id: 1}), (m2:Movie {id: 2}), (m3:Movie {id: 3}), (m4:Movie {id: 4})
CREATE
  (u1)-[:WATCHED {date: date("2024-12-20")}]->(m1),
  (u1)-[:WATCHED {date: date("2024-12-28")}]->(m2),
  (u2)-[:WATCHED {date: date("2024-12-22")}]->(m1),
  (u2)-[:WATCHED {date: date("2025-01-02")}]->(m3),
  (u3)-[:WATCHED {date: date("2025-01-03")}]->(m2),
  (u3)-[:WATCHED {date: date("2025-01-04")}]->(m4),
  (u4)-[:WATCHED {date: date("2025-01-05")}]->(m2);

// Optional ratings
MATCH (u1:User {id: 201}), (u2:User {id: 202}), (u3:User {id: 203}), (u4:User {id: 204}),
      (m1:Movie {id: 1}), (m2:Movie {id: 2}), (m3:Movie {id: 3}), (m4:Movie {id: 4})
CREATE
  (u1)-[:RATED {score: 5}]->(m1),
  (u2)-[:RATED {score: 4}]->(m1),
  (u2)-[:RATED {score: 4}]->(m3),
  (u3)-[:RATED {score: 3}]->(m2),
  (u3)-[:RATED {score: 5}]->(m4),
  (u4)-[:RATED {score: 4}]->(m2);
