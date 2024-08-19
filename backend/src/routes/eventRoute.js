const { Router } = require("express");
const multer = require("multer");
const TicketModel = require("../models/ticketModel");
const Event = require("../models/eventSchema");
const app = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/createEvent", upload.single("image"), async (req, res) => {
  try {
    const eventDate = req.body;
    eventDate.image = req.file ? req.file.path : "";

    const newEvent = new Event(eventDate);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Filed to save the event!!" });
  }
});

app.get("/createEvent", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Events" });
  }
});

app.get("/event/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("./event/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(400).json({ error: "Eventnot Found" });
      }
      event.likes += 1;
      return event.save();
    })
    .then((updatdEvent) => {
      res.json(updatdEvent);
    })
    .catch((err) => {
      console.log("Error liking the event", err);
      res.status(500).json({ messsage: "Server Error" });
    });
});

app.get("/events", (req, res) => {
  Event.find()
    .then((events) => {
      res.json(events);
    })
    .catch((error) => {
      console.log("Server Error ", error);
      res.status(500).json({ message: "Server Error" });
    });
});

app.get("/event/:id/orderSummary", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the Event" });
  }
});

app.post("/tickets", async (req, res) => {
  try {
    const ticketDetails = req.body;
    const newTicket = new TicketModel(ticketDetails);
    newTicket.save();
    return res.status(201).json({ ticket: newTicket });
  } catch (error) {
    console.error("Error creating Ticket", error);
    res.status(500).json({ error: "Failed to create Ticjet" });
  }
});
app.get("/tickets/:id", async (req, res) => {
  try {
    const tickets = await TicketModel.find();
    res.json(tickets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load tickets" });
  }
});

app.get("/tickets/user/:userId", (req, res) => {
  const userId = req.params.userId;
  TicketModel.find({ userId: userId })
    .then((tickets) => {
      res.json(tickets);
    })
    .catch((error) => {
      console.log("Error Fetching User Tickets", error);
      res.status(500).json({ error: "Failed to fetch User tickets" });
    });
});

app.delete("/tickets/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    await TicketModel.findByIdAndDelete(ticketId);
    res.status(200).send();
  } catch (error) {
    console.log("Error Deleting the ticket", error);
    res.status(500).json({ error: "Failed to delete the Ticket" });
  }
});

module.exports = app;
