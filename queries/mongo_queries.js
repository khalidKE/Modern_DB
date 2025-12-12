// Ready-to-run MongoDB queries for Logistics Operations Management
// Ensure you loaded data via: mongosh < data/mongo_seed.js

db = db.getSiblingDB("LogiOps_DB");

// 1) Couriers with zero recorded delays
db.couriers.aggregate([
  { $lookup: { from: "delays", localField: "courierId", foreignField: "courierId", as: "delayDetails" } },
  { $match: { delayDetails: { $size: 0 } } }
]);

// 2) Total delay days per parcel
db.delays.aggregate([
  { $addFields: { delayDays: { $dateDiff: { startDate: "$reportedAt", endDate: "$resolvedAt", unit: "day" } } } },
  { $group: { _id: "$parcelId", totalDelayDays: { $sum: "$delayDays" } } }
]);

// 3) Training count per courier (only with trainings)
db.trainings.aggregate([
  { $group: { _id: "$courierId", trainingCount: { $sum: 1 } } },
  { $match: { trainingCount: { $gt: 0 } } }
]);

// 4) Courier distribution per region
db.couriers.aggregate([
  { $group: { _id: "$region", totalCouriers: { $sum: 1 } } }
]);

// 5) Parcels currently pending
db.parcels.find({ status: "Pending" });

// 6) Couriers with no trainings yet
db.couriers.aggregate([
  { $lookup: { from: "trainings", localField: "courierId", foreignField: "courierId", as: "trainingDetails" } },
  { $match: { trainingDetails: { $size: 0 } } }
]);

// 7) Delayed parcels with severity breakdown
db.parcels.aggregate([
  { $lookup: { from: "delays", localField: "parcelId", foreignField: "parcelId", as: "delayDetails" } },
  { $match: { status: "Delayed" } },
  { $unwind: "$delayDetails" },
  { $project: { parcelId: 1, courierId: 1, severity: "$delayDetails.severity", cause: "$delayDetails.cause" } }
]);

// 8) Average parcel weight per hub
db.parcels.aggregate([
  { $group: { _id: "$hubId", avgWeightKg: { $avg: "$weightKg" }, parcels: { $sum: 1 } } }
]);
