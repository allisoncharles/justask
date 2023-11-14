import User from "../../../models/User";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { email } = req.query;

    try {
      const user = await User.findOne({ email });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
