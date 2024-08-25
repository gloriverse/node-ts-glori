import express, { Request, Response } from "express";

require("dotenv").config(); // Load environment variables from a .env file into process.env
const cors = require("cors"); // Import the CORS middleware
const app = express(); // Create an Express application instance

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

const PORT = process.env.PORT || 8000; // Set the server's port from environment variables or default to 8000

app.use(express.json()); // Parse incoming JSON requests and make the data available in req.body

// GET REQUEST
app.get("/customers", (req: Request, res: Response) => {
	const customers = [
		{ name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
		{
			name: "Joel Smith",
			email: "joel.smith@example.com",
			phone: "+0987654321",
		},
	];

	return res.status(200).json(customers);
});

app.listen(PORT, () => {
	// Start the server and listen on the specified port
	console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});
