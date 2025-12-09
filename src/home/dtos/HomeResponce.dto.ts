import { Expose, Type } from 'class-transformer';

/* ===================== */
/*      MAIN SLIDER      */
/* ===================== */

export class SliderTitleDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class SliderTextDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class MainSliderDto {
  @Expose() @Type(() => SliderTitleDto) title: SliderTitleDto;
  @Expose() @Type(() => SliderTextDto) text: SliderTextDto;
  @Expose() image: string;
}

/* ===================== */
/*      CATEGORIES       */
/* ===================== */

export class CategoryTitleDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class CategoryDto {
  @Expose() @Type(() => CategoryTitleDto) title: CategoryTitleDto;
  @Expose() image: string;
}

/* ===================== */
/*      FEEDBACKS        */
/* ===================== */

export class FeedbackNameDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class FeedbackTextDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class FeedbackDto {
  @Expose() rating: number;

  @Expose() @Type(() => FeedbackNameDto)
  name: FeedbackNameDto;

  @Expose() @Type(() => FeedbackTextDto)
  text: FeedbackTextDto;
}

/* ===================== */
/*       PRODUCTS        */
/* ===================== */

export class ProductColorDto {
  @Expose() id: number;
  @Expose() color: string;
}

export class ProductDto {
  @Expose() id: number;
  @Expose() image: string;
  @Expose() name: string;
  @Expose() price: number;
  @Expose() has_discount: boolean;
  @Expose() discount_price: number;
  @Expose() description: string;
  @Expose() category: string;
  @Expose() stock: number;
  @Expose() rating: number;

  @Expose()
  @Type(() => ProductColorDto)
  colors: ProductColorDto[];
}


/* ===================== */
/*          FAQ          */
/* ===================== */

export class FaqQuestionDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class FaqAnswerDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class FaqDto {
  @Expose() @Type(() => FaqQuestionDto) question: FaqQuestionDto;
  @Expose() @Type(() => FaqAnswerDto) answer: FaqAnswerDto;
}

/* ===================== */
/*         FOOTER        */
/* ===================== */

export class FooterTextDto {
  @Expose() en: string;
  @Expose() ar: string;
}

export class SocialLinkDto {
  @Expose() icon: string;
  @Expose() link: string;
}

export class FooterDto {
  @Expose() @Type(() => FooterTextDto) text: FooterTextDto;

  @Expose()
  @Type(() => SocialLinkDto)
  social_links: SocialLinkDto[];
}

/* ===================== */
/*      HOME RESPONSE    */
/* ===================== */

export class HomeResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => MainSliderDto)
  main_slider: MainSliderDto[];

  @Expose()
  @Type(() => CategoryDto)
  categories: CategoryDto[];

  @Expose()
  @Type(() => ProductDto)
  products: ProductDto[];

  @Expose()
  @Type(() => FeedbackDto)
  feedbacks: FeedbackDto[];

  @Expose()
  @Type(() => FaqDto)
  faq: FaqDto[];

  @Expose()
  @Type(() => FooterDto)
  footer: FooterDto;
}
