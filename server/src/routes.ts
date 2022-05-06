import express from "express";
import nodemailer from "nodemailer";
import { NodemailerMaiLAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./respositories/prima/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./respositories/use-cases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMaiLAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
