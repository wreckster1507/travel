// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';


// import path from 'path';
// dotenv.config();

// mongoose
//   .connect("mongodb://localhost:27017/travel")
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const __dirname = path.resolve();

// const app = express();

// app.use(express.json());

// app.use(cookieParser());

// app.listen(3000, () => {
//   console.log('Server is running on port 3000!');
// });

// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);



// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });




// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';
// import fetch, { Headers } from "node-fetch"; // Ensure this import matches your node-fetch version
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import path from 'path';

// dotenv.config();

// // Set up the global fetch and Headers
// globalThis.fetch = fetch;
// globalThis.Headers = Headers; // Only necessary if using v2.x and `Headers` is required by @google/generative-ai

// // Initialize the Gemini API with the API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Create an endpoint to handle the chatbot's place-related questions
// const askAboutPlace = async (req, res) => {
//   const { question } = req.body; // Expecting the question about the place

//   try {
//     // Create a prompt that asks the AI to provide information based on the question
//     const prompt = `Answer the following question about a place:\n\n${question}`;
    
//     // Generate a response using the Gemini API
//     const result = await model.generateContent(prompt);

//     // Extract the response text from the result
//     const responseText = result.response.text();
    
//     // Send the AI-generated response back to the user
//     res.json({ answer: responseText });
//   } catch (error) {
//     console.error("Error asking about place:", error);
//     res.status(500).json({ error: "Error processing the request" });
//   }
// };

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/travel")
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const __dirname = path.resolve();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);

// // Chatbot route for place-related questions
// app.post('/api/chat', askAboutPlace);

// // Serve static files from the React app (client-side)
// app.use(express.static(path.join(__dirname, '/client/dist')));

// // Catch-all route to serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000!');
// });


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import fetch, { Headers } from "node-fetch"; // Import necessary modules for Gemini API
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Gemini API client
import path from 'path'; // Add this import for 'path' module
import cors from 'cors'; // Import the 'cors' module



dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/travel")
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve(); // Define __dirname after importing path

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use(cookieParser());

// Initialize the Gemini API with the API key
const genAI = new GoogleGenerativeAI('AIzaSyBTBl4XWZcm8QLLEXOl8xZkdApTqO4JLyY');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint to handle chatbot's place-related questions
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body; // Expecting the question or prompt about the place
  
 const {text,place} = prompt;
  try {
    // Create a prompt that asks the AI to provide information based on the place
    const fullPrompt = `User asked: "${text}" about the place: "${place}". Provide detailed information about the place.`;

    const result = await model.generateContent(fullPrompt);

    // Extract the response text from the result
    const responseText = result.response.text();
    
    // Send the AI-generated response back to the user
    res.json({ text: responseText });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Error fetching place information" });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
