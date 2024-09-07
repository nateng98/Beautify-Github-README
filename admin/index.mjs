import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { readdirSync } from 'fs';

const app = express();
const port = process.env.PORT || 8000;
app.use(cors()); // cross-origin resource sharing: allowing the API to be accessible from different origins
app.use(express.json()); // use to parse incoming json

// convert the module's URL into a file path
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const routesPath = path.resolve(__dirname, './routes'); // point to ./routes directory

try {
  const routeFiles = readdirSync(routesPath); // read contents of the directory
  routeFiles.map(async (file) => {
    try {
      const routeModule = await import(`./routes/${file}`); // import each file from ./routes
      app.use('/', routeModule.default); // registered on the root path, so name.mjs will be accessible under /name
    } catch (error) {
      console.error(`Error loading route module for file ${file}:`, error);
    }
  });
} catch (error) {
  console.error('Error reading routes directory:', error);
}

// route to serve an index.html file located in the public directory when a request is made to the root URL
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (error) {
    res.status(500).send('Error loading index.html');
  }
});

app.listen(port, () => {
  try {
    console.log(`Server is running on ${port}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
});