import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsUrl,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class MainSliderItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image?: string;
}

class CategoryItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image?: string;
}

class FeedbackItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;
}

class FaqItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  question?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  answer?: string;
}

class SocialLinkItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  link?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  icon?: string;
}

class FooterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkItemDto)
  social_links?: SocialLinkItemDto[];
}

export class UpdateHomeDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MainSliderItemDto)
  main_slider?: MainSliderItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryItemDto)
  categories?: CategoryItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeedbackItemDto)
  feedbacks?: FeedbackItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItemDto)
  faq?: FaqItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => FooterDto)
  footer?: FooterDto;
}
