import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaMongoose } from 'mongoose'

export type UniversityDocument = University & Document;

@Schema()
export class University {
    _id: SchemaMongoose.Types.ObjectId

    @Prop({ required: true })
    title: String;

    @Prop({ required: true })
    domain: String;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const UniversitySchema = SchemaFactory.createForClass(University)