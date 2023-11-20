import { Configuration, OpenAIApi } from "openai";
import User from "../../models/User";
import dbConnect from "../../utils/mongo";

export default async function handler(req, res) {
  await dbConnect();
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API,,
  });

  const openai = new OpenAIApi(configuration);

  if (req.method === "POST") {
    try {
      const { prompt, user } = req.body;

      const userFound = await User.findOne({ email: user.email });
      const currentAccess = userFound?.access;

      if (currentAccess > 0) {
        const updatedUser = await User.findOneAndUpdate(
          { email: user.email },
          {
            access: currentAccess - 1,
          },
          { new: true }
        );

        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${prompt}`,
          max_tokens: 3000,
          temperature: 0,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0,
        });

        res.status(200).send({ bot: response.data.choices[0].text });
      } else {
        res.status(401).send({ access: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ err });
    }
  }
}
