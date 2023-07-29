import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { Configuration, OpenAIApi } from 'openai';
import { Server } from 'socket.io';
import { newConnection } from './socket.js';

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

const httpServer = app.listen(PORT, () => {
	console.log(`\n\n [⚡️ Server ⚡️]: Listening on port ${PORT}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
	newConnection(socket, io);
});

app.get('/ai/get-question', async (req, res) => {
	let query = `Ask me a funny question. Provide just the question in your response.`;

	try {
		const gptResponse = await openai.createCompletion({
			model: 'text-davinci-003',
			temperature: 1.5,
			max_tokens: 256,
			presence_penalty: 0.6,
			prompt: query
		});
		console.log(gptResponse.data.choices[0].text);
		res.send(gptResponse.data.choices[0].text);
	} catch (error) {
		console.log(error);
	}

	return res.end();
});

app.post('/ai/get-answer', async (req, res) => {
	let query = `You are playing a game against humans where your goal is to have the most popular answer to a question. 
      Players will vote on which answer is the best. Your goal is to have the best response to the following question: "${req.body.question}" 
      without the players being able to guess that you are an AI based on your response.
      Your answer should mimic the style of other players, and avoid capitalization or punctuation that would give away that you are an AI.
      Your answer should not be the same as any of the other players. Please provide just your answer to the question in your response. Only use text.`;

	console.log(`Query: "${query}"`);

	try {
		const gptResponse = await openai.createCompletion({
			model: 'text-davinci-003',
			temperature: 1.5,
			max_tokens: 256,
			presence_penalty: 0.6,
			prompt: query
		});
		console.log(gptResponse.data.choices[0].text);
		res.send(gptResponse.data.choices[0].text);
	} catch (error) {
		console.log(error);
	}

	return res.end();
});
