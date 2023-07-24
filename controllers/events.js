import Event  from "../models/Event.js";
import User from "../models/User.js";

/*CREATE EVENT*/
export const createEvent = async (req, res) => {
    try {
        const { userId, title, description, date, picturePath } = req.body;

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