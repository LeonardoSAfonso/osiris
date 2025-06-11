type CreateDTO<T> = Omit<T, 'createdAt' | 'updateAt'>;

type UpdateDTO<T> = Partial<T>;

export { CreateDTO, UpdateDTO };
