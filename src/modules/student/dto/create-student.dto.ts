import { IsNotEmpty } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    email: string;
}
