import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API Route for sending contact emails
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      if (!process.env.RESEND_API_KEY) {
        // Fallback for preview without API key
        console.log(`[Preview Only] Email would be sent here:
        From: ${name} <${email}>
        Message: ${message}
        To: matthew.kalesanwo@fgipgroup.net, theflemingairunugba@gmail.com`);
        return res.status(200).json({ success: true, fake: true });
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      const data = await resend.emails.send({
        // Sender address needs to be a verified domain in Resend
        from: "First Generation Homes <onboarding@resend.dev>",
        to: ["matthew.kalesanwo@fgipgroup.net", "theflemingairunugba@gmail.com"],
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new contact form submission.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email,
      });

      if (data.error) {
        throw new Error(data.error.message);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production delivery of built client
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for all unknown paths (SPA)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
