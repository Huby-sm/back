import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { removeAllInstances } from "../utils/index.js";
import upload from "../helpers/upload.helper.js";

/* CREATE */
//retour un seul post //

export const createPost = async (req, res) => {
  try {
    const { userId, description /*picturePath*/ } = req.body;
    //const picturePath = req.file.location;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    upload.single("picturePath")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(409).json({ message: err.message });
      }

      const picturePath = req.file ? req.file.location : null;

      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: [],
        comments: [],
      });
      await newPost.save();

      const post = await Post.find();
      //** Tri des données dans l'ordre décroissant selon la date de création du post
      post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.status(201).json(post);
    });
  } catch (err) {
    console.error(err);
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const { id } = req.user;

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
      {
        $lookup: {
          from: "friends", // Use the name of your friends collection
          let: { authorId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$status", "friend"],
                    },
                    {
                      $or: [
                        {
                          $and: [
                            { $eq: ["$user1Id", "$$authorId"] },
                            { $eq: ["$user2Id", mongoose.Types.ObjectId(id)] },
                          ],
                        },
                        {
                          $and: [
                            { $eq: ["$user2Id", "$$authorId"] },
                            { $eq: ["$user1Id", mongoose.Types.ObjectId(id)] },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "friends",
        },
      },
      {
        $addFields: {
          isFriend: {
            $cond: {
              if: { $gt: [{ $size: "$friends" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

//si je veux afficher les user qui post un commentaire
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne(postId);
    const comments = await Comment.find({ post: post._id }).populate("user");

    // Si le post a un picturePath, obtenez l'URL signée pour cette image.
    /*if (post.picturePath) {
      const signedUrl = await getSignedUrl(post.picturePath);
      post.picturePath = signedUrl;
    }*/

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { id } = req.user;

    const user = await User.findOne({ _id: id });
    const post = await Post.findOne({ _id: postId });

    if (user.role === "admin" || post.userId.toString() === id) {
      await Post.deleteOne({ _id: postId });
      return res.status(200).json({ status: "ok" });
    }

    res.status(403).json({ msg: "User is not authorized" });
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};
