import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './question.schema';

@Injectable()
export class QuestionSeedService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async seedQuestions() {
    const questions = [
      {
        "questionText": "What is your favorite breed of cat, and why?"
      },
      {
        "questionText": "How do you think cats communicate with their owners?"
      },
      {
        "questionText": "Have you ever owned a cat? If so, what was their name and personality like?"
      },
      {
        "questionText": "Why do you think cats love to sleep in small, cozy places?"
      },
      {
        "questionText": "What’s the funniest or strangest behavior you’ve ever seen a cat do?"
      },
      {
        "questionText": "Do you prefer cats or kittens, and what’s the reason for your preference?"
      },
      {
        "questionText": "Why do you think cats are known for being independent animals?"
      },
      {
        "questionText": "How do you think cats manage to land on their feet when they fall?"
      },
      {
        "questionText": "What’s your favorite fact or myth about cats?"
      },
      {
        "questionText": "How would you describe the relationship between humans and cats in three words?"
      }
   ];

    // Soruları veritabanına ekleyelim
    return this.questionModel.insertMany(questions);
  }
}
