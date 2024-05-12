const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const { getReceiverSocketId, io } = require("../socket/socket");

// controller to send a message
module.exports.sendMessage = async (req, res) => {
  try {
    // This is how we rename the id from params to another variable
    const { id: receiverId } = req.params;

    const receiverExists = await User.findById(receiverId);
    if (!receiverExists)
      throw { statusCode: 404, message: "Receiver not found" };

    const { message } = req.body;
    if (!message)
      throw { statusCode: 400, message: "Their is no message in body" };

    const senderId = req.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (!newMessage) {
      throw { statusCode: 400, message: "Unable to create a new message" };
    }

    await newMessage.save();

    await Conversation.updateOne(
      { _id: conversation._id },
      { $push: { messages: newMessage._id } }
    );
    // Optimised solution
    // await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUCNTIONALITY WILL GO IN HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      // io.to(<socekt_id>).emit() is used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.log("Error while sending a message: ", error.message);
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Something went wrong" });
  }
};

// controller to get messages between 2 users
module.exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const receiverExists = await User.findById(userToChatId);
    if (!receiverExists)
      throw { statusCode: 404, message: "Receiver not found" };
    const senderId = req.userId;
    // Since we have only message ids inside the messages array we have to have to populate the actual messages
    // from the messages collection

    // 1. by using the aggregate functions
    // let messages = await Conversation.aggregate(
    //   [
    //     // Stage -1: we perform a lookup operation to find the messages object that matches the maeesage id in the list
    //     {
    //       $lookup: {
    //         from: 'messages',  // Name of the collection to join with
    //         localField: 'messages',  // Field in the current collection
    //         foreignField: 'id',
    //         as: 'result'
    //       }
    //     },
    //     {
    //       $project: {
    //         result: 1
    //       }
    //     }
    //   ]
    // );

    // 2. by using the populate function
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // populate the messages field since it refers to the messages collection, so it automatically populates it from the messages collection

    if (!conversation) return res.status(200).json({ messages: [] });

    return res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.log("Error while fetching a message: ", error.message);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};
