import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateInsightDto {
  @IsNotEmpty()
  @IsUUID()
  readonly projectId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly value: string;
}
