import express from 'express';
import fs from 'fs/promises';

const app = express() 
const PORT = 8000

app.use(express.json())
