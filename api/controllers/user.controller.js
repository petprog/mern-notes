import User from "../models/user.model.js";
import Note from "../models/note.model.js";
import asyncHandler from "express-async-handler";
import { hashPassword, comparePassword } from "../utils/helpers.js";

// @desc Get all users
// @route GET /api/user
// @access Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users || !users.length)
    res.status(400).send({ message: "No user found" });
  else {
    res.status(200).send(users);
  }
});

// @desc Create new user
// @route POST /api/user
// @access Private
export const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const validRoles = ["Employee", "Manager", "Admin"];

  if (roles) {
    if (
      !Array.isArray(roles) ||
      !roles.length ||
      roles.some((element) => typeof element !== "string") ||
      roles.some((role) => !validRoles.includes(role))
    ) {
      return res.status(400).send({
        message: "Roles field should be an array of strings and not empty",
      });
    }
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username })
    .select("-password")
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).send({ message: "Duplicate username" });
  }
  const hashedPwd = hashPassword(password);
  const userObject = { username, password: hashedPwd, roles };
  const user = await User.create(userObject);
  if (user) {
    res.status(201).send({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Update a user
// @route PATCH /api/user
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles, active } = req.body;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    typeof active !== "boolean" ||
    !roles.length
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  // Check for duplicate username with new username
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).send({ message: "Duplicate username" });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = hashPassword(password);
  }

  const updatedUser = await user.save();
  res.status(200).send({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /api/user
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ message: "id field is required" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).send({ message: "User has assigned notes" });
  }
  const result = await user.deleteOne();
  return res.status(200).send({
    message: `User with ${result.username} with ID ${result._id} deleted`,
  });
});
