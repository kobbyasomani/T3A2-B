const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Patient = require("../models/patientModel");
const { request } = require("express");

//----- New Route Function------//
// Creates a new Patient
const createPatient = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const coordinator = req.user.id;

  // Ensure all fields are filled out
  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  // Create Patient
  const patient = await Patient.create({
    firstName,
    lastName,
    coordinator,
  });

  // Return patient info
  if (patient) {
    res.status(201).json({
      _id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      coordinator: patient.coordinator,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

//----- New Route Function------//
// Updates existing patient
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  // Patient Check
  if (!patient) {
    res.status(400);
    throw new Error("Patient not found");
  }

  const user = await User.findById(req.user.id);

  // User Check
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure logged in user matches the coordinator user
  if (patient.coordinator.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized");
  }

  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    req.body,{ 
        new: true 
    });
    res.status(200).json(updatedPatient);
});

//----- New Route Function------//
// Delete existing patient
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  // Patient Check
  if (!patient) {
    res.status(400);
    throw new Error("Patient not found");
  }

  const user = await User.findById(req.user.id);

  // User Check
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure logged in user matches the coordinator user
  if (patient.coordinator.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized");
  }

  await patient.remove();
  res.status(200).json({ message: `Deleted patient ${req.params.id}` });
});

//----- New Route Function------//
// New Route Function
const addCarer = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const coordinator = req.user.id;
  console.log(req);
  //Ensure all fields are filled out
  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  // Create Patient
  const patient = await Patient.create({
    firstName,
    lastName,
    coordinator,
  });
  console.log(patient.user);

  if (patient) {
    res.status(201).json({
      _id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      coordinator: patient.coordinator,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

module.exports = {
  createPatient,
  updatePatient,
  deletePatient,
  addCarer,
};