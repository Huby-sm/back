import Post from "../models/Post.js";
import User from "../models/User.js";
import { removeAllInstances } from "../utils/index.js";

/* CREATE */
//retour un seul post //

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    //** Tri des données dans l'ordre décroissant selon la date de création du post
    post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $lookup: {
          from: "comments", // The name of the Comment collection in the database
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $addFields: {
          lastComment: { $arrayElemAt: ["$comments", -1] }, // Get the last comment from the 'comments' array
        },
      },
      {
        $project: {
          comments: 0, // Exclude the 'comments' field from the result
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users", // The name of the User collection in the database
          localField: "lastComment.userId",
          foreignField: "_id",
          as: "lastComment.userId",
        },
      },
      {
        $unwind: {
          path: "$lastComment.userId",
          preserveNullAndEmptyArrays: true, // Preserve comments without associated users
        },
      },
    ]);
    console.log("post :>> ", post);
    res.status(200).json(post);
  } catch (err) {
    console.log("err :>> ", err);
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//si je veux afficher les user qui post un commentaire
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne(postId);
    const comments = await Comment.find({ post: post._id }).populate("user");

    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const likes = [...post.likes].map((e) => e.toString());
    const isLiked = likes.includes(userId);

    if (isLiked) {
      removeAllInstances(likes, userId);
    } else {
      likes.push(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* COMMENTAIRE  ????*/
export const getCommentByUserInPost = async (req, res) => {
  try {
    const { id } = req.params; // l'ID du post
    //const { userId } = req.body; // l'ID de l'utilisateur

    const post = await Post.findById(id); // Trv le post avec l'ID donné
    const comment = post.comments.find();
    //const comment = post.comments.find();
    //.find(c => c.userId === userId); // Trv le commentaire de l'utilisateur sous le post

    if (!comment) {
      // Si le commentaire n'est pas trouvé, renvoyer un message d'erreur
      return res.status(204).json({ message: "Comment not found" });
    }

    res.status(200).json(comment); // Renvoyer le commentaire
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
