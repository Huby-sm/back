import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(403).send("Access denied");
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}