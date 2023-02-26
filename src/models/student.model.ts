import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaMongoose } from 'mongoose'

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    _id: SchemaMongoose.Types.ObjectId

    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    surname: String;

    @Prop({ required: true })
    email: String;

    @Prop({ default: 0 })
    point: Number;

    @Prop({ default: null })
    university_id: SchemaMongoose.Types.ObjectId;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student)