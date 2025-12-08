import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsUrl,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class MainSliderItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;
}

class CategoryItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;
}

class FeedbackItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}

class FaqItemDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

class SocialLinkItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}

class FooterDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkItemDto)
  social_links: SocialLinkItemDto[];
}

export class CreateHomeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MainSliderItemDto)
  main_slider: MainSliderItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryItemDto)
  categories: CategoryItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeedbackItemDto)
  feedbacks: FeedbackItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItemDto)
  faq: FaqItemDto[];

  @ValidateNested()
  @Type(() => FooterDto)
  footer: FooterDto;
}
