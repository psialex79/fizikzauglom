import type { Schema, Struct } from '@strapi/strapi';

export interface LessonLessonBlock extends Struct.ComponentSchema {
  collectionName: 'components_lesson_lesson_blocks';
  info: {
    description: '';
    displayName: 'lesson-block';
  };
  attributes: {
    content: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    htmlCode: Schema.Attribute.Text;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'lesson.lesson-block': LessonLessonBlock;
    }
  }
}
