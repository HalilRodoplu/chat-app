import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type UserAnswerDocument = UserAnswer & Document;

@Schema()
export class UserAnswer {
  @Prop({ default: UUID })  // UUID otomatik oluşturulur
  id: string;

  @Prop({ required: true })  // Kullanıcı ID'si
  userId: string;

  @Prop({ default: Date.now })  // Oluşturulma tarihi
  createdDate: Date;

  @Prop({ required: true })  // Chat numarası
  chatNumber: number;

  @Prop([{ answerText: String }])  // Cevapların listesi
  chatAnswers: { answerText: string }[];

  @Prop({ default: Date.now })  // En son yanıt zamanı
  lastRespondDatetime: Date;
}

export const UserAnswerSchema = SchemaFactory.createForClass(UserAnswer);
