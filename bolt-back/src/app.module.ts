import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionsService } from './questions/questions.service';
import { QuestionsController } from './questions/questions.controller';
import { Question, QuestionSchema } from './questions/question.schema';
import { UserAnswersService } from './user-answers/userAnswers.service';
import { UserAnswersController } from './user-answers/userAnswers.controller';
import { UserAnswer, UserAnswerSchema } from './user-answers/userAnswers.schema';
import { QuestionSeedService } from './questions/questions.seed';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Ortam değişkenlerini yönetmek için ConfigModule

    // MongoDB bağlantısını MONGO_URI ile yapıyoruz
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');
        return {
          uri: mongoUri,
        };
      },
    }),

    // Question ve UserAnswer için şemalar
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: UserAnswer.name, schema: UserAnswerSchema },
    ]),
  ],
  controllers: [QuestionsController, UserAnswersController],
  providers: [QuestionsService, UserAnswersService, QuestionSeedService],
})
export class AppModule {}
