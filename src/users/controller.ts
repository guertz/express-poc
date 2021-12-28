import express from "express";
import { registerMethod } from "../core";

import { CreateUser } from "./commands/create_user";
import { GetUserById } from "./commands/get_user_by_id";
import { GetUsers } from "./commands/get_users";
import { LoadUserByParams, SameUser, TokenBased } from "./auth";

const UserController = express.Router();

registerMethod(
  UserController.post.bind(UserController),
  {
    path: '/',
    command: CreateUser,
    auth: TokenBased,
    loader: LoadUserByParams,
    policy: SameUser
  }
)

registerMethod(
  UserController.get.bind(UserController),
  {
    path: '/:id',
    command: GetUserById,
    auth: TokenBased,
    // loader: LoadUserById,
    // policy: SameUser
  }
)

registerMethod(
  UserController.get.bind(UserController),
  {
    path: '/',
    command: GetUsers,
    // auth: TokenBased
    // loader
    // policy
  }
)

export default UserController;
