// Seed data for Logistics Operations Management (MongoDB)
// Run: mongosh < data/mongo_seed.js

const dbName = "LogiOps_DB";
db = db.getSiblingDB(dbName);

// Reset collections for a clean demo run
["couriers", "hubs", "parcels", "delays", "routes", "trainings", "shipments"].forEach(col => db[col].drop());

db.couriers.insertMany([
  { courierId: 1, name: "Nora Ibrahim", email: "nora@swiftdrop.com", phone: "01030201011", role: "Bike Courier", region: "Downtown", salary: 9000 },
  { courierId: 2, name: "Omar Fadel", email: "omar@swiftdrop.com", phone: "01099344022", role: "Van Driver", region: "Airport", salary: 12000 },
  { courierId: 3, name: "Laila Mansour", email: "laila@swiftdrop.com", phone: "01055778003", role: "Bike Courier", region: "West", salary: 8800 },
  { courierId: 4, name: "Samir Kamel", email: "samir@swiftdrop.com", phone: "01022553377", role: "Van Driver", region: "East", salary: 11500 },
  { courierId: 5, name: "Farah Zaki", email: "farah@swiftdrop.com", phone: "01077440190", role: "Bike Courier", region: "Industrial", salary: 9300 }
]);

db.hubs.insertMany([
  { hubId: "H-DT", city: "Cairo", capacity: 1200, manager: "Adel Lotfy" },
  { hubId: "H-AP", city: "Giza", capacity: 950, manager: "Shady Eissa" },
  { hubId: "H-WE", city: "6th October", capacity: 700, manager: "Mona Gad" }
]);

db.parcels.insertMany([
  { parcelId: 101, courierId: 1, hubId: "H-DT", status: "In Transit", weightKg: 1.4, createdAt: ISODate("2025-01-03"), expectedDelivery: ISODate("2025-01-05") },
  { parcelId: 102, courierId: 2, hubId: "H-AP", status: "Pending", weightKg: 3.1, createdAt: ISODate("2025-01-02"), expectedDelivery: ISODate("2025-01-06") },
  { parcelId: 103, courierId: 3, hubId: "H-WE", status: "Delivered", weightKg: 0.9, createdAt: ISODate("2025-01-01"), expectedDelivery: ISODate("2025-01-03") },
  { parcelId: 104, courierId: 2, hubId: "H-AP", status: "Delayed", weightKg: 2.8, createdAt: ISODate("2025-01-03"), expectedDelivery: ISODate("2025-01-07") },
  { parcelId: 105, courierId: 4, hubId: "H-DT", status: "In Transit", weightKg: 5.5, createdAt: ISODate("2025-01-04"), expectedDelivery: ISODate("2025-01-08") },
  { parcelId: 106, courierId: 5, hubId: "H-WE", status: "Pending", weightKg: 1.2, createdAt: ISODate("2025-01-05"), expectedDelivery: ISODate("2025-01-09") },
  { parcelId: 107, courierId: 3, hubId: "H-WE", status: "Delayed", weightKg: 2.1, createdAt: ISODate("2025-01-06"), expectedDelivery: ISODate("2025-01-10") },
  { parcelId: 108, courierId: 1, hubId: "H-DT", status: "Delivered", weightKg: 0.6, createdAt: ISODate("2025-01-02"), expectedDelivery: ISODate("2025-01-04") }
]);

db.delays.insertMany([
  { delayId: 5001, parcelId: 102, courierId: 2, reportedAt: ISODate("2025-01-03"), resolvedAt: ISODate("2025-01-04"), cause: "Vehicle issue", severity: "Medium" },
  { delayId: 5002, parcelId: 101, courierId: 1, reportedAt: ISODate("2025-01-04"), resolvedAt: ISODate("2025-01-05"), cause: "Weather", severity: "Low" },
  { delayId: 5003, parcelId: 104, courierId: 2, reportedAt: ISODate("2025-01-05"), resolvedAt: ISODate("2025-01-06"), cause: "Route congestion", severity: "High" },
  { delayId: 5004, parcelId: 107, courierId: 3, reportedAt: ISODate("2025-01-07"), resolvedAt: ISODate("2025-01-08"), cause: "Hub backlog", severity: "Medium" }
]);

db.routes.insertMany([
  { routeId: "R1", fromHub: "H-DT", toHub: "H-AP", distanceKm: 32 },
  { routeId: "R2", fromHub: "H-AP", toHub: "H-WE", distanceKm: 27 },
  { routeId: "R3", fromHub: "H-DT", toHub: "H-WE", distanceKm: 18 },
  { routeId: "R4", fromHub: "H-WE", toHub: "H-DT", distanceKm: 18 }
]);

db.trainings.insertMany([
  { trainingId: 11, courierId: 1, courseName: "Safe Riding", startDate: ISODate("2024-12-10"), endDate: ISODate("2024-12-12"), provider: "Udemy" },
  { trainingId: 12, courierId: 3, courseName: "Cold Chain Handling", startDate: ISODate("2024-12-15"), endDate: ISODate("2024-12-17"), provider: "Coursera" },
  { trainingId: 13, courierId: 2, courseName: "Customer Delight", startDate: ISODate("2024-12-20"), endDate: ISODate("2024-12-21"), provider: "LinkedIn Learning" }
]);

db.shipments.insertMany([
  { shipmentId: "S-1001", parcelId: 101, departureHub: "H-DT", arrivalHub: "H-AP", departedAt: ISODate("2025-01-03T09:00:00Z"), arrivedAt: ISODate("2025-01-03T14:00:00Z") },
  { shipmentId: "S-1002", parcelId: 102, departureHub: "H-AP", arrivalHub: "H-WE", departedAt: ISODate("2025-01-04T08:30:00Z"), arrivedAt: ISODate("2025-01-04T13:15:00Z") },
  { shipmentId: "S-1003", parcelId: 105, departureHub: "H-DT", arrivalHub: "H-WE", departedAt: ISODate("2025-01-05T10:00:00Z"), arrivedAt: ISODate("2025-01-05T12:10:00Z") },
  { shipmentId: "S-1004", parcelId: 107, departureHub: "H-WE", arrivalHub: "H-DT", departedAt: ISODate("2025-01-07T11:45:00Z"), arrivedAt: ISODate("2025-01-07T14:05:00Z") }
]);

print(`Seeded ${dbName} with collections: ${db.getCollectionNames().join(", ")}`);
