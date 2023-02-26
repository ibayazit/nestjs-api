import { IsNotEmpty } from "class-validator";

export class StartExamDto {
    @IsNotEmpty()
    examDate: string;
}
