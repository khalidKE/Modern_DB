# Modern_DB

A **dual-database demo project** showcasing how **MongoDB (document database)** and **Neo4j (graph database)** can be used together for modern data modeling and querying.

This repository contains:
- 📦 A **Logistics Operations Management** dataset in **MongoDB**
- 🎬 A **Streaming Media Graph** dataset in **Neo4j**
- 🔍 Ready-to-run analytical queries for both databases

---

## Repository Structure

```
Modern_DB/
├── data/
│   ├── mongo_seed.js          # MongoDB seed script (Logistics domain)
│   └── neo4j_setup.cypher     # Neo4j graph setup (Streaming Media domain)
│
├── queries/
│   ├── mongo_queries.js       # MongoDB aggregation & analysis queries
│   └── neo4j_queries.cypher   # Neo4j Cypher analysis queries
│
└── README.md
```

---

## Part 1: MongoDB – Logistics Operations Management

### Domain Overview
The MongoDB dataset models a logistics company with:
- Couriers & training records
- Hubs & routes
- Parcels, shipments, and delivery delays

### Collections Created
- `couriers`
- `hubs`
- `parcels`
- `delays`
- `routes`
- `trainings`
- `shipments`

### Load the MongoDB Seed Data

> ⚠️ This will **drop existing collections** for a clean demo run.

```bash
mongosh < data/mongo_seed.js
```

Database name:
```
LogiOps_DB
```

After execution, the script prints the seeded collections.

### Run MongoDB Queries

Open MongoDB shell:
```bash
mongosh
```

Then run:
```javascript
load("queries/mongo_queries.js")
```

### Example MongoDB Analyses
- Couriers with **zero recorded delays**
- **Total delay days** per parcel
- Courier **training coverage**
- Parcel status tracking (Pending / Delayed)
- **Average parcel weight** per hub

---

## Part 2: Neo4j – Streaming Media Graph

### Domain Overview
The Neo4j graph models a streaming platform with:
- Movies & genres
- Directors & actors
- Users, watches, and ratings

### Node Labels
- `Movie`
- `Genre`
- `Person`
- `User`

### Relationship Types
- `:HAS_GENRE`
- `:DIRECTED`
- `:ACTED_IN`
- `:WATCHED`
- `:RATED`

### Load the Neo4j Graph

1. Open **Neo4j Browser** or **Neo4j Desktop**
2. Open the file:
   ```
   data/neo4j_setup.cypher
   ```
3. Paste and execute the script

(Optional reset command is included but commented out.)

### Run Neo4j Queries

Paste and execute:
```cypher
queries/neo4j_queries.cypher
```

### Example Neo4j Analyses
- Movies per director
- Movies watched by a specific user
- Users who watched **Sci‑Fi**
- Viewing activity after a certain date
- Movies with their actors
- Movies never watched
- **Average rating per genre**

---

## Requirements

- **MongoDB** 5.0+
- **mongosh**
- **Neo4j** 5.x (Desktop or Server)

---

## Purpose

This project is ideal for:
- Learning **NoSQL data modeling**
- Comparing **document vs graph databases**
- Academic assignments & demos
- Interview or portfolio projects

---



⭐ If you find this useful, consider starring the repository.

