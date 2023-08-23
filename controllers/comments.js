import Comment from "../models/Comment.js";
import { removeAllInstances } from "../utils/index.js";

/* CREATE COMMENT*/
export const createComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    const newComment = new Comment({
      userId: userId,
      postId: postId,
      content: content,
    });
    await newComment.save();

    const comment = await Comment.findOne({ _id: newComment._id })
      .populate("userId")
      .exec();

    res.status(201).json(comment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ COMMENT*/
export const getCommentInPost = async (req, res) => {
  try {
    //je recupère mon Post
    const { postId } = req.params;

    const comments = await Comment.find({ postId: postId })
      .populate("userId")
      .sort({ createdAt: "desc" })
      .exec();

    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.deleteOne({ _id: commentId });
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

/* LIKE COMMENT */

export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const comment = await Comment.findById(id);

    const likes = [...comment.likes].map((e) => e.toString());
    const isLiked = likes.includes(userId);

    if (isLiked) {
      removeAllInstances(likes, userId);
    } else {
      likes.push(userId);
    }

    await Comment.findByIdAndUpdate(id, { likes }, { new: true });

    const savedComment = await Comment.findById(id).populate("userId").exec();

    res.status(200).json(savedComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* COMMENTAIRE  */
/*export const getCommentByUserInPost = async (req, res) => {
        try {
            const { id } = req.params; // l'ID du post
            //const { userId } = req.body; // l'ID de l'utilisateur

            const post = await Post.findById(id); // Trv le post avec l'ID donné
            const comment = post.comments.find()
            //const comment = post.comments.find();
            //.find(c => c.userId === userId); // Trv le commentaire de l'utilisateur sous le post

            if (!comment) { // Si le commentaire n'est pas trouvé, renvoyer un message d'erreur
                return res.status(204).json({ message: "Comment not found" });
            }

            res.status(200).json(comment); // Renvoyer le commentaire
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    };*/
