import UserModel from "../../models/user";

export async function getUsers(req, res) {
  const users = await UserModel.find({});
  res.send(users);
}

export async function getUserById(req, res) {
    
}

export async function getUsersByPage(req, res) {}

export async function postUser(req, res) {}

export async function putUser(req, res) {}

export async function deleteUserByAdmin(req, res) {}

export async function confirmUserDelete(req, res) {}

export async function deleteUser(req, res) {}
