// Analysis queries for Streaming Media Graph (Neo4j)

// Movies per director
MATCH (d:Person {role: "Director"})-[:DIRECTED]->(m:Movie)
RETURN d.name AS director, count(m) AS moviesDirected
ORDER BY moviesDirected DESC;

// Movies watched by a specific user
MATCH (u:User {name: "Omar Nasser"})-[:WATCHED]->(m:Movie)
RETURN m.title AS watchedByOmar;

// Users who watched Sci-Fi
MATCH (u:User)-[:WATCHED]->(m:Movie)-[:HAS_GENRE]->(:Genre {name: "Sci-Fi"})
RETURN DISTINCT u.name AS sciFiFans
ORDER BY u.name;

// Watches after a certain date
MATCH (u:User)-[w:WATCHED]->(m:Movie)
WHERE w.date > date("2024-12-25")
RETURN u.name AS viewer, m.title AS movie, w.date AS watchedOn
ORDER BY watchedOn;

// Movies with their actors
MATCH (m:Movie)<-[:ACTED_IN]-(p:Person {role: "Actor"})
RETURN m.title AS movie, collect(p.name) AS actors;

// Movies not watched by anyone
MATCH (m:Movie)
WHERE NOT (m)<-[:WATCHED]-(:User)
RETURN m.title AS untouchedTitles;

// Average rating per genre (using RATED relationships)
MATCH (:User)-[r:RATED]->(m:Movie)-[:HAS_GENRE]->(g:Genre)
RETURN g.name AS genre, round(avg(r.score), 2) AS avgRating
ORDER BY avgRating DESC;
