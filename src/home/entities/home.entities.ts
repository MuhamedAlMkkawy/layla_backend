import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-json")
  main_slider: {
    title: {
      en : string ,
      ar : string
    };
    text: {
      en : string ,
      ar : string
    };
    image: string;
  }[];

  @Column("simple-json")
  categories: {
    title: {
      en : string ,
      ar : string
    };
    image: string;
  }[];

  @Column("simple-json")
  feedbacks: {
    rating: number;
    name: {
      en : string ,
      ar : string
    };
    text: {
      en : string ,
      ar : string
    };
  }[];

  @Column("simple-json")
  faq: {
    question: {
      en : string ,
      ar : string
    };
    answer: {
      en : string ,
      ar : string
    };
  }[];

  @Column("simple-json")
  footer: {
    text: {
      en : string ,
      ar : string
    };
    social_links: {
      icon: string;
      link: string;
    }[];
  };
}
