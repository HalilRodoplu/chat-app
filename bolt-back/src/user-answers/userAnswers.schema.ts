import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type UserAnswerDocument = UserAnswer & Document;

@Schema()
export class UserAnswer {
  @Prop({ default: UUID })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop({ required: true })
  chatNumber: number;

  @Prop([{ answerText: String }])
  chatAnswers: { answerText: string }[];

  @Prop({ default: Date.now })
  lastRespondDatetime: Date;
}

export const UserAnswerSchema = SchemaFactory.createForClass(UserAnswer);
