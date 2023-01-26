import Post from "../models/Post.js";
import UserDetails from "../models/UserDetails.js";

/* Create Post */
export const createPost = async (req, res) => {
    try {
        const {userId, firstName, lastName, filiere, promo, description} = req.body;
        const user = await UserDetails.findById(userId);
        const newPost = new Post({
            userId,
            firstName,
            lastName,
            filiere,
            promo,
            picturePath: req.file ? req.file.filename : "",
            description,
            likes: {},
            comments: []
        });
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({error: err.message});
    }
}

/* Read */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

/* Update */
export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes[userId];

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}