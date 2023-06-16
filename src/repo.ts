import { Knex } from 'knex';

interface Writer<T> {
  insert(insertBody: Partial<T>): Promise<number>;
  update(id: string, updateBody: Partial<T>): Promise<number>;
  delete(id: string): Promise<number>;
  deleteAll(id: string): Promise<number>;
}

interface Reader<T> {
  find(props: Array<keyof T>): Promise<T[]>;
  findOne(id: string): Promise<T>;
}

export default abstract class KnexRepository<T>
  implements Writer<T>, Reader<T>
{
  constructor(public readonly knex: Knex, public readonly tableName: string) {}

  public get queryBuilder(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  async find(props: Array<keyof T>): Promise<T[]> {
    return this.queryBuilder.select(...props).from(this.tableName) as Promise<
      T[]
    >;
  }

  async findOne(id: string): Promise<T> {
    return this.queryBuilder
      .select('*')
      .from(this.tableName)
      .where('id', '=', id)
      .first() as Promise<T>;
  }

  async insert(insertBody: Partial<T>): Promise<number> {
    return this.queryBuilder.insert({ ...insertBody }).returning('id');
  }

  async update(id: string, updateBody: Partial<T>): Promise<number> {
    return this.queryBuilder.where('id', '=', id).update({ ...updateBody });
  }

  async delete(id: string): Promise<number> {
    return this.queryBuilder.where('id', '=', id).del();
  }

  async deleteAll(id: string): Promise<number> {
    return this.queryBuilder.del();
  }
}
