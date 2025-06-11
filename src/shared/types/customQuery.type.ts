import { PaginationParams } from './pagination.type';

export type EntityKeyOrder<T> = { [K in keyof T]?: 'asc' | 'desc' };

export class CustomQuery<T> {
  take?: number;
  skip?: number;
  where: Record<string, unknown> = {};
  orderBy?: EntityKeyOrder<T>;

  static fromPagination(params: PaginationParams<T>): CustomQuery<T> {
    const query = new CustomQuery<R>();

    if (params.limit !== undefined) query.limit(params.limit);
    if (params.offset !== undefined) query.offset(params.offset);

    if (params.orderBy) {
      query.order({ [params.orderBy]: params.order });
    }

    if (params.searchBy && params.searchFor) {
      query.filter({
        [params.searchBy as string]: new RegExp(params.searchFor, 'i'),
      });
    }

    return query;
  }

  offset(skip?: number): this {
    this.skip = skip;
    return this;
  }

  limit(take?: number): this {
    this.take = take;
    return this;
  }

  filter(conditions: Record<string, unknown>): this {
    this.where = { ...this.where, ...conditions };
    return this;
  }

  order(orderBy: EntityKeyOrder<T>): this {
    this.orderBy = orderBy;
    return this;
  }
}
