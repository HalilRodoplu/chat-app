import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserAnswersService } from './userAnswers.service';

@Controller('user-answers')
export class UserAnswersController {
  constructor(private readonly userAnswersService: UserAnswersService) {}

  // Kullanıcının chat'ini getir
  @Get(':userId/:chatNumber')
  async getChat(@Param('userId') userId: string, @Param('chatNumber') chatNumber: number) {
    return this.userAnswersService.getChat(userId, chatNumber);
  }

  // Kullanıcının bir soruya verdiği cevabı kaydet
  @Post(':userId/:chatNumber/:answerIndex')
  async saveAnswer(
      @Param('userId') userId: string,
      @Param('chatNumber') chatNumber: number,
      @Param('answerIndex') answerIndex: number,
      @Body('answerText') answerText: string
  ) {
    return this.userAnswersService.saveAnswer(userId, chatNumber, answerIndex, answerText);
  }
}
