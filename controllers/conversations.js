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
    })
      .populate("user1 user2")
      .exec();

    if (conversation) {
      return res.status(200).json(conversation);
    }

    conversation = new Conversation({
      user1: currentUserId,
      user2: userId,
    });

    await conversation.save();

    conversation = await Conversation.findOne({ _id: conversation._id })
      .populate("user1 user2")
      .exec();

    res.status(200).json(conversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const readConversation = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;
    const { userId } = req.params;

    let conversation = await Conversation.findOne({
      $or: [
        { user1: userId, user2: currentUserId },
        { user1: currentUserId, user2: userId },
      ],
    })
      .populate("user1 user2")
      .exec();

    res.status(200).json(conversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;
    const { conversationId, content } = req.params;

    let conversation = await Conversation.findOne({ _id: conversationId });

    conversation.messages.push({
      content: content,
      sender: currentUserId,
    });

    await conversation.save();

    const lastMessage = conversation.messages.slice(-1)[0];
    res.status(200).json(lastMessage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const listConversations = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;

    let conversations = await Conversation.find(
      {
        $or: [{ user1: currentUserId }, { user2: currentUserId }],
      },
      { messages: { $slice: -1 } }
    )
      .populate("user1 user2")
      .exec();

    res.status(200).json(conversations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
