const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  eventId: { type: String, required: true },
  ticketDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
  },
  count: { type: Number, default: 0 },
});
const TicketModel = mongoose.model("Ticket", ticketSchema);
module.exports = TicketModel;
