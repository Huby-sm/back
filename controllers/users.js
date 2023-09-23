import User from "../models/User.js";
import Friend from "../models/Friend.js";
import Notification from "../models/Notification.js";
import { blockUserSocket } from "../socketio/setup.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;
    const { id } = req.params;
    const user = await User.findById(id);

    let friend = null;

    if (currentUserId !== id) {
      const allFriends = await Friend.find({
        $or: [
          { user1Id: id, user2Id: currentUserId },
          { user1Id: currentUserId, user2Id: id },
        ],
      });

      if (allFriends.length === 1) {
        friend = allFriends[0];
      } else if (allFriends.every((e) => e.status === "decline")) {
        friend = allFriends[0];
      } else {
        friend = allFriends.filter((e) => e.status !== "decline")[0];
      }
    }

    // let friendCondition =
    //   currentUserId !== id
    //     ? [
    //         { user1Id: id, user2Id: currentUserId, status: "friend" },
    //         { user1Id: currentUserId, user2Id: id, status: "friend" },
    //       ]
    //     : [
    //         { user1Id: currentUserId, status: "friend" },
    //         { user2Id: currentUserId, status: "friend" },
    //       ];

    let friendCondition = [
      { user1Id: id, status: "friend" },
      { user2Id: id, status: "friend" },
    ];

    const friends = await Friend.find({ $or: friendCondition })
      .populate("user1Id user2Id")
      .exec();

    res.status(200).json({ user, friend, friends });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friends) {
      return res.status(200).json([]);
    }

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      //supp les elements du tbl correspondent à friendId
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const checkBlocked = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({ blocked: user.blocked });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = id;
    const user = await User.findById(userId);

    user.blocked = !user.blocked;
    await user.save();

    /*const notification = new Notification({
      userId,
      type: "block",
      data: { value: user.blocked },
    });
    await notification.save();

    await emitNotification(userId, notification._id);*/
    await blockUserSocket(userId, user.blocked);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const { id: currentUserId } = req.user;
    const user = await User.findById(currentUserId);

    user.picturePath = req.file.location;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
