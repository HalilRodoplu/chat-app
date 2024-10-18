import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Question {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ required: true })
  chatNumber: number;

  @Prop({ required: true })
  chatName: string;

  @Prop({ required: true, type: [{ questionText: String }] })
  chatQuestions: { questionText: string }[];

  @Prop({ default: Date.now })
  createdDate: Date;
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
