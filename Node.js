import express from "express";
import Replicate from "replicate";
import cors from "cors";

const app = express();
app.use(cors()); // Allows your HTML file to talk to this server
app.use(express.json());

const replicate = new Replicate({
  auth: "YOUR_REPLICATE_API_TOKEN", // Get this from your Replicate dashboard
});

app.post("/generate-image", async (req, res) => {
  try {
    const input = {
        // We get the prompt from the user's input on the website
        prompt: req.body.prompt 
    };

    // This is the exact line from your snippet
    const output = await replicate.run("black-forest-labs/flux-schnell", { input });

    // Instead of saving to disk, we send the URL back to the website
    // Replicate returns an array of files; we grab the URL of the first one
    res.json({ url: output[0].url() }); 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
