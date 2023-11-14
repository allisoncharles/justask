import User from "../../../models/User";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { user } = req.body;

    try {
      const email = user.email.toLowerCase();
      const userDetail = new User({ email, fullname: user.name });

      const savedUser = await userDetail.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(201).json(err);
    }
  }

  if (req.method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (req.method === "PUT") {
    const user = req.body;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          access: user.access,
        },
        { new: true }
      );

      res.status(201).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
