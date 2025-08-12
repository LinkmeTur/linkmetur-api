import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'node:crypto';

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  beforeCreate() {
    const time = new Date();
    this.id = randomUUID();
    this.updated_at = time;
    this.created_at = time;
  }

  @BeforeUpdate()
  beforeUpdate() {
    const time = new Date();
    this.updated_at = time;
  }
}
