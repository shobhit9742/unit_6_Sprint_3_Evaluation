const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  owner: String,
  title: String,
  description: String,
  orginazisedBy: String,
  eventDate: Date,
  eventTime: String,
  location: String,
  participents: Number,
  count: Number,
  Income: Number,
  TicketPrice: Number,
  Quantity: Number,
  Image: String,
  likes: Number,
  Comment: [String],
});
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
