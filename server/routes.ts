import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      
      // Store the subscriber in memory
      const subscriber = await storage.createSubscriber(data);
      
      return res.status(201).json({
        message: "Successfully subscribed!",
        subscriber,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.message,
        });
      }
      
      console.error("Error subscribing:", error);
      return res.status(500).json({
        message: "An error occurred while processing your request",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
