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

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
      console.log(`\n\n [⚡️ Server ⚡️]: Listening on port ${PORT}`);
});