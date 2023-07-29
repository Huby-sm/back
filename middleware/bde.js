import User from "../models/User.js";

export const isBde = async (req, res, next) => {
    const { id } = req.user;

    const user = await User.findOne({ _id: id });

    if (user.role !== "bde") {
        res.send(403, "Forbidden");
        return;
    }

    next();
}