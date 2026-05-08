import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// Helper for ESM directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware
  app.use(express.json());

  // Proxy API endpoint for Brevo email sending.
  app.post("/api/send-brevo-email", async (req, res) => {
    try {
      const { toEmail, toName, plan } = req.body;
      
      if (!toEmail) {
        return res.status(400).json({ error: "Missing toEmail" });
      }

      if (!supabase) {
         return res.status(500).json({ error: "Supabase not configured on server" });
      }

      const { data, error } = await supabase.from('site_content').select('content').eq('section', 'email_settings').single();
      if (error || !data?.content) {
         return res.status(404).json({ error: "Email settings not found in database" });
      }

      const { brevoApiKey, brevoFromEmail, brevoFromName } = data.content;

      if (!brevoApiKey || !brevoFromEmail) {
         return res.status(400).json({ error: "Brevo not fully configured in settings" });
      }

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": brevoApiKey
        },
        body: JSON.stringify({
          sender: {
            name: brevoFromName || "SystemicChat",
            email: brevoFromEmail
          },
          to: [
            {
              email: toEmail,
              name: toName || "Customer"
            }
          ],
          subject: `Welcome to SystemicChat - Your ${plan || 'Starter'} Plan Inquiry`,
          textContent: `Dear ${toName || 'Customer'},\n\nThank you for your interest in SystemicChat. We have successfully received your inquiry regarding the ${plan || 'Starter'} plan.\n\nOne of our product specialists will review your details and reach out to you within the next 24 business hours to discuss the next steps.\n\nIf you have any immediate questions, please feel free to reply directly to this email.\n\nBest regards,\nThe SystemicChat Team`,
          htmlContent: `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { padding-bottom: 15px; margin-bottom: 20px; border-bottom: 1px solid #ea580c; }
  .footer { margin-top: 30px; font-size: 0.85em; color: #777777; border-top: 1px solid #eeeeee; padding-top: 15px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>SystemicChat</h2>
    </div>
    <p>Dear ${toName || 'Customer'},</p>
    <p>Thank you for your interest in SystemicChat. We have successfully received your inquiry regarding the <strong>${plan || 'Starter'}</strong> plan.</p>
    <p>One of our product specialists will review your details and reach out to you within the next 24 business hours to discuss the next steps and how we can best support your automated workflows.</p>
    <p>If you have any immediate questions, please feel free to reply directly to this email.</p>
    <p>Best regards,<br><strong>The SystemicChat Team</strong></p>
    <div class="footer">
      <p>This email was sent to you because you requested information about our plans.</p>
    </div>
  </div>
</body>
</html>
          `.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Brevo API Error:", errorData);
        return res.status(response.status).json({ error: errorData.message || "Failed to send email" });
      }

      const responseData = await response.json();
      res.json({ success: true, messageId: responseData.messageId });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
