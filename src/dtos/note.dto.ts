import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator'

export class CreateNoteDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title!: string

  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  content!: string
}

export class UpdateNoteDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title?: string

  @IsOptional()
  @IsString({ message: 'Content must be a string' })
  content?: string
}
