import { Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getQuestions() {
    return this.questionsService.getQuestions();
  }

  // Yeni chat oluşturma route'u
  @Post('new-chat')
  async createNewChat() {
    return this.questionsService.createNewChat();
  }
}
