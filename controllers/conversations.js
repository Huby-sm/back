import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;
    const { userId } = req.body;

    let conversation = await Conversation.findOne({
      $or: [
        { user1: userId, user2: currentUserId },
        { user1: currentUserId, user2: userId },
      ],
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    conversation = Conversation.new({
      user1: currentUserId,
      user2: userId,
    });

    await conversation.save();
    res.status(200).json(conversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
