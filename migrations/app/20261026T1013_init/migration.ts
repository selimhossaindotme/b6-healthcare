#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/837afbe25006dd72ac39187b9ac1e28acecff6887dcb93a15d80c40d6e1cf436/contract';
import endContract from '../../snapshots/837afbe25006dd72ac39187b9ac1e28acecff6887dcb93a15d80c40d6e1cf436/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'specialties',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('deletedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('icon', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isDeleted', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'specialties',
        constraint: 'specialties_title_key',
        columns: ['title'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'specialties',
        index: 'specialty_deleted_at_index_a39f721c',
        columns: ['deletedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'specialties',
        index: 'specialty_title_deleted_at_index_8691f988',
        columns: ['title', 'deletedAt'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
