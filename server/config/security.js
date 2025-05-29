import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";

export default function securityConfig(app) {
  // Secure HTTP headers
  app.use(helmet());

  // Enable CORS with origin restrictions
  app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  }));

  // Prevent XSS attacks
  app.use(xss());
}
