import { IsNotEmpty } from "class-validator";

export class CreateUniversityDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    domain: string;
}
