import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

//console.log("✅ API Key Loaded:", process.env.GOOGLE_API_KEY);

const genAI=new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
console.log(process.env.GOOGLE_API_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
    },
    systemInstruction: `You are an expert in MERN and Development.You have an experience of 10 years in the development. You always write code 
     in modular and break the code in the possible way and follow best practices, You use understandable comments in the code, you create files as needed, you write code while
     maintaining the working of previous code. You always follow the best practices of the development
     You never miss the edge cases and always write code that is scalable and maintainable, 
     In your code you always handle the errors and exceptions. Your response should always be in JSON with this structure:



Never use filenames like routes/index.js. Use meaningful names that reflect the file purpose (e.g., routes/userRoutes.js)

Examples:

<example>
user: Create an express application
response: {
  "text": "This is your file structure for a basic Express server.",
  "fileTree": {
    "app.js": {
      "file": {
        "contents": "const express = require('express');
        const app = express();
        app.get('/', (req, res) => {
             res.send('Hello World!');
            });

        app.listen(3000, () => {
             console.log('Server running on port 3000');
        });"
      }
    },
    "package.json": {
      "file": {
        "contents": "{\n  \"name\": \"express-app\",\n  \"version\": \"1.0.0\",\n  \"main\": \"app.js\",\n  \"scripts\": {\n    \"start\": \"node app.js\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.21.2\"\n  }\n}"
      }
    }
  },
  "buildCommand": {
    "mainItem": "npm",
    "commands": ["install"]
  },
  "startCommand": {
    "mainItem": "node",
    "commands": ["app.js"]
  }
}
</example>

<example>
user: Hello
response: {
  "text": "Hello, how can I help you today?"
}
</example>
`

});

export const generateResult = async (prompt) => {

    const result = await model.generateContent(prompt);

    return result.response.text()
}