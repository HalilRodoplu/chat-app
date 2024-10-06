import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAnswer, UserAnswerDocument } from './userAnswers.schema';

@Injectable()
export class UserAnswersService {
  constructor(
      @InjectModel(UserAnswer.name) private userAnswerModel: Model<UserAnswerDocument>,
  ) {}

  // Kullanıcının chat'ini bul veya yeni bir chat başlat
  async findOrCreateChat(userId: string, chatNumber: number): Promise<UserAnswerDocument> {
    // En son chat'ı bulalım
    let chat = await this.userAnswerModel.findOne({ userId, chatNumber }).exec();

    if (!chat) {
      // Eğer chat bulunamazsa yeni bir belge (document) oluşturuyoruz
      chat = new this.userAnswerModel({
        userId,
        chatNumber,
        chatAnswers: [
          { answerText: "" }, { answerText: "" }, { answerText: "" }, { answerText: "" },
          { answerText: "" }, { answerText: "" }, { answerText: "" }, { answerText: "" },
          { answerText: "" }, { answerText: "" }
        ],
      });
      return chat.save();  // Yeni belgeyi kaydediyoruz
    }

    return chat;  // Eğer chat varsa, bu zaten bir Mongoose belgesi olmalı
  }


  // Kullanıcının bir soruya verdiği cevabı güncelle
  async saveAnswer(userId: string, chatNumber: number, answerIndex: number, answerText: string): Promise<UserAnswer> {
    const chat = await this.findOrCreateChat(userId, chatNumber);

    chat.chatAnswers[answerIndex].answerText = answerText;
    chat.lastRespondDatetime = new Date();

    return chat.save();
  }

  // Kullanıcının chat'ini getir
  async getChat(userId: string, chatNumber: number): Promise<UserAnswer> {
    return this.findOrCreateChat(userId, chatNumber);
  }
}
