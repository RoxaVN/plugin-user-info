import { Column } from 'typeorm';
import { decorate } from '@roxavn/core';
import { FileInfo } from '@roxavn/module-upload/base';
import { User } from '@roxavn/module-user/server';

declare module '@roxavn/module-user/server' {
  interface User {
    birthday?: Date;

    firstName?: string;
    lastName?: string;
    middleName?: string;

    gender?: string;
    avatar?: FileInfo | { url: string };
  }
}

decorate(
  [Column({ type: 'timestamptz', nullable: true })],
  User.prototype,
  'birthday'
);
decorate(
  [Column({ type: 'text', nullable: true })],
  User.prototype,
  'firstName'
);
decorate(
  [Column({ type: 'text', nullable: true })],
  User.prototype,
  'lastName'
);
decorate(
  [Column({ type: 'text', nullable: true })],
  User.prototype,
  'middleName'
);
decorate(
  [Column({ type: 'varchar', length: 16, nullable: true })],
  User.prototype,
  'gender'
);
decorate([Column({ type: 'jsonb', nullable: true })], User.prototype, 'avatar');

export {};
