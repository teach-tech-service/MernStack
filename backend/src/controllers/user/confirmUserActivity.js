export async function confirmUserUpdate(req, res) {}

export async function confirmUserDelete(req, res) {}

export async function confirmUserEmail(req, res) {
  if (!req.params.code) {
    return res.status(400).send({});
  }

  let data;
  try {
    data = await getFromRedis(REDIS_POST_STACK, req.params.code);
  } catch (err) {
    if (err === NOT_FOUND_KEY) {
      return;
    } else {
      throw new Error(err);
    }
  }
  data = JSON.parse(data);
}

export async function confirmUserChangeEmail(req, res) {}

export async function confirmUserChangePassword(req, res) {}
