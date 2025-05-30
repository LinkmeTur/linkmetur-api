import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'node:crypto';

export abstract class BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  beforeCreate() {
    const time = new Date();
    this.id = randomUUID();
    this.updated_at = time;
    this.created_at = time;
  }

  @BeforeUpdate()
  beforeUpdate(){
     const time = new Date();   
    this.updated_at = time;
  }
}
