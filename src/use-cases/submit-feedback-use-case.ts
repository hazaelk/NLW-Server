import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is required')
    }

    if(!comment) {
      throw new Error('Comment is required')
    }
    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format')
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: <strong>${type}</strong></p>`,
        `<p style="border: 2px solid #222; font-size: 1.1rem; color: black; font-weight: 700;background-color: gray;">Comentário: ${comment}</p>`,
        screenshot ? `<img style="width:60%;height:60%;" src="${screenshot}" />` : '',
        `</div>`
      ].join('\n')
    })
  }
}