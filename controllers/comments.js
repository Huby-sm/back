import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

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

            res.status(201).json(newComment);
        } catch (err) {
            res.status(409).json({ message: err.message });
        }
    };

    /* READ COMMENT*/
    export const getCommentInPost = async (req, res) => {
        try {
            //je recupère mon Post
            const {postId} = req.params;
            console.log("requete: " + req.params)
            const comments =  await Comment.find({postId: postId}).exec();

            res.status(200).json(comments);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    };


    /* UPDATE COMMENT*/

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
