const mongoose = require("mongoose");

const incidentReportSchema = mongoose.Schema({
  incidentReportText: {
    type: String,
  },
  incidentReportPDF: {
    type: String,
  },
});


const shiftSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coordinatorNotes: {
      type: String,
    },
    carer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add carer to shift"],
    },
    shiftStartTime: {
      type: Date,
      required: [true, "Please add shift start time"],
    },
    shiftEndTime: {
      type: Date,
      required: [true, "Please add shift end time"],
    },
    shiftNotes: {
      shiftNotesText: {
        type: String,
      },
      shiftNotesPDF: {
        type: String,
      },
    },
    handoverNotes: {
      type: String,
    },
    incidentReports: [incidentReportSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shifts", shiftSchema);
