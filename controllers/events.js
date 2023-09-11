import Event  from "../models/Event.js";
import User from "../models/User.js";

/*CREATE EVENT*/
export const createEvent = async (req, res) => {
    try {
    const { userId, title, description, date, /*picturePath*/ } = req.body;

    const picturePath = req.file ? req.file.location : null;

    console.log("Picture Path:", picturePath);
    console.log("req.file", req.file);
    const newEvent = new Event({
        userId: userId,
        title: title,
        description: description,
        date: date,
        picturePath: picturePath
    });
    await newEvent.save();

    res.status(201).json(newEvent);
} catch (err) {
    res.status(409).json({ message: err.message });
}
}

/*READ EVENTS*/
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ _id: -1 });
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}