import UserModel from "../../models/user";
import { getParametersFromObject } from "../../helpers/parameters";
import {
  REDIS_POST_STACK,
  REDIS_UPDATE_STACK,
  REDIS_DELETE_STACK,
  NOT_FOUND_KEY
} from "../../statuses/redisStatuses";
import {
  setToRedis,
  deleteFromRedis,
  getFromRedis
} from "../../services/redis";
import schedule from "node-schedule";

export async function getUsers(req, res) {
  const users = await UserModel.find({});
  res.send(users);
}

export async function getUserById(req, res) {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({});
    }
    res.send(user);
  } catch (err) {
    if (err instanceof CastError) {
      return res.status(404).send({
        msg: "Wrong ID"
      });
    }
    res.status(500).send({});
  }
}

export async function getUsersByPage(req, res) {
  const getUsers = async function() {
    let users = await UserModel.aggregate([
      {
        $skip: (Number(req.params.page) - 1) * 10
      },
      {
        $limit: 10
      }
    ]);

    if (users.length === 0) {
      throw new Error("Error in pagination, out of range");
    }
    return companies;
  };

  const getInfoUsers = async function() {
    return await CompanyModel.count({});
  };

  Promise.all([getUsers(), getInfoUsers()])
    .then(result => {
      res.send({
        users: result[0],
        numberOfUsers: result[1]
      });
    })
    .catch(err => {
      res.status(500).send({});
    });
}

export async function postUser(req, res) {
  let code = uuid(),
    expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + 1);
  setToRedis(
    REDIS_POST_STACK,
    code,
    JSON.stringify({
      data: req.body,
      expireAt
    })
  );

  const user = new UserModel(req.body);

  user.validate(err => {
    if (err) {
      return res.status(400).send();
    }

    schedule.scheduleJob(expireAt, async function() {
      deleteFromRedis(REDIS_POST_STACK, code);
    });

    let users = [
      {
        name: req.body.name,
        email: req.body.email,
        url: `${process.env.URL}/api/user-confirm/confirm-email/${code}`
      }
    ];
    loadTemplate("confirmCreate", users).then(results => {
      return Promise.all(
        results.map(result => {
          sendEmail({
            to: result.context.email,
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text
          });
        })
      );
    });
  });
}

export async function deleteUserByAdmin(req, res) {
  if (!req.params.userId) {
    return res.status(400).send({});
  }

  const stats = await UserModel.deleteOne({
    _id: req.params.userId
  });

  res.send({});
}

export async function deleteUser(req, res) {
  if (!req.params.userId) {
    return res.status(400).send({});
  }
  let code = uuid(),
    expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + 1);
  setToRedis(
    REDIS_DELETE_STACK,
    code,
    JSON.stringify({
      data: req.params.userId,
      expireAt
    })
  );
  schedule.scheduleJob(expireAt, async function() {
    deleteFromRedis(REDIS_POST_STACK, code);
  });

  res.send({});
}
