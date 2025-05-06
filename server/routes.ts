import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
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
  
  // Contact form submission route
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const data = insertContactSchema.parse(req.body);
      
      // Store the contact in memory
      const contact = await storage.createContact(data);
      
      return res.status(201).json({
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        contact,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Erro de validação",
          errors: validationError.message,
        });
      }
      
      console.error("Error submitting contact form:", error);
      return res.status(500).json({
        message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
