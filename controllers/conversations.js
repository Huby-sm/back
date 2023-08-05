import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
import { io } from "../socketio/setup.js";

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
    const { conversationId } = req.params;

    let conversation = await Conversation.findOne({ _id: conversationId })
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
    const { conversationId, content } = req.body;

    let conversation = await Conversation.findOne({ _id: conversationId });
    const userPosition = currentUserId === conversation.user1 ? 1 : 2;
    const otherUserPosition = currentUserId === conversation.user1 ? 1 : 2;
    const otherUserId = conversation["user" + otherUserPosition];
    const otherUser = await User.findOne({ _id: otherUserId });

    const otherSeen = otherUser.socketIds.some((socketId) =>
      io.sockets.sockets
        .get(socketId)
        .rooms.has("conversation:" + conversationId)
    );

    conversation.messages.push({
      content: content,
      sender: currentUserId,
    });

    const lastMessage = conversation.messages.slice(-1)[0];

    conversation.lastSeenMessage = lastMessage._id;
    conversation["lastSeenMessageUser" + userPosition] = lastMessage._id;

    if (otherSeen) {
      conversation["lastSeenMessageUser" + otherUserPosition] = lastMessage._id;
    }

    await conversation.save();

    otherUser.socketIds.forEach((socketId) =>
      io.sockets.sockets
        .get(socketId)
        .emit("newMessage", JSON.stringify(lastMessage))
    );

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
      .sort({ updatedAt: -1 })
      .exec();

    res.status(200).json(conversations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getConversationsNotificationsNumber = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;

    let conversations = await Conversation.find({
      $or: [{ user1: currentUserId }, { user2: currentUserId }],
    });

    const listConversationsNotRead = conversations
      .filter((e) => {
        const userPosition = currentUserId === e.user1 ? 1 : 2;

        return e.lastSeenMessage === e["lastSeenMessageUser" + userPosition];
      })
      .map((e) => e._id);

    res.status(200).json({ listConversationsNotRead });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
