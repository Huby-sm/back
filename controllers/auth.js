import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserDetails from '../models/UserDetails.js';

/* Register UserDetails */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            filiere,
            promo
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserDetails({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: req.file ? req.file.filename : "",
            filiere,
            promo
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

    /* Login UserDetails */
    export const login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await UserDetails.findOne({email: email});
            if (!user) return res.status(404).json({error: "UserDetails does not exist"});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({error: "Invalid credentials"});

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            delete user.password;
            res.status(200).json({result: user, token});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }