import UserModel from "../../models/user";

export async function putUserInfo(req, res) {
  const userToUpdate = getParametersFromObject(["username"], req.body);

  const stat = await UserModel.updateOne(
    {
      _id: req.params.userId
    },
    userToUpdate
  );

  res.send({ stat });
}

export async function changeUserEmail(req, res) {}

export async function changeUserPassword(req, res) {}
