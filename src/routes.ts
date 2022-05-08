import express from 'express';
import { NodemailerMailAdapter } from './nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()



routes.post('/feedbacks', async (requisicao, resposta) => {
  const { type, comment, screenshot } = requisicao.body;/* retirando type, coment, screen de dentro do objto req.body */

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter,
    )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })



  return resposta.status(201).send();
});