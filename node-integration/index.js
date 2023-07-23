import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { OpenAIApi, Configuration } from "openai";


dotenv.config();

if (!process.env.PORT) {
      process.exit(1);
}

const PORT = parseInt(process.env.PORT);

const app = express();
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// * Middlewares * //
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// * Routes * //

app.listen(PORT, () => {
      console.log(`\n\n [⚡️ Server ⚡️]: Listening on port ${PORT}`);
});

app.get("/ai/get-question", async (req, res) => {
      let query = `Ask me a funny question. Provide just the question in your response.`

      try {
            const gptResponse = await openai.createCompletion({
                  model: "text-davinci-003",
                  temperature: 1.5,
                  max_tokens: 256,
                  presence_penalty: 0.6,
                  prompt: query,
            });
            console.log(gptResponse.data.choices[0].text);
            res.send(gptResponse.data.choices[0].text)
      } catch (error) {
            console.log(error);
      }
      
      return res.end();
});

app.get("/ai/get-answer", async (req, res) => {
      let player_answers = req.body.responses;
      
      let query = `You are playing a game against humans where your goal is to have the most popular answer to a question. 
      Players will vote on which answer is the best. Your goal is to have the best response to the following question: "${req.body.question}" 
      without the players being able to guess that you are an AI based on your response.
      You have access to the answers of the other players (answers are separated by commas): "${player_answers}".
      Your answer should mimic the style of the other players, and avoid capitalization or punctuation that would give away that you are an AI.
      Your answer should not be the same as any of the other players. Please provide just your answer to the question in your response.`
      
      console.log(`Query: "${query}"`);

      try {
            const gptResponse = await openai.createCompletion({
                  model: "text-davinci-003",
                  temperature: 1.5,
                  max_tokens: 256,
                  presence_penalty: 0.6,
                  prompt: query,
            });
            console.log(gptResponse.data.choices[0].text);
            res.send(gptResponse.data.choices[0].text)
      } catch (error) {
            console.log(error);
      }
      
      return res.end();
});