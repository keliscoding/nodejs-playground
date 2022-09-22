import { PrismaClientError } from '../types/PrismaClientError';

export const isPrimaError = (e: PrismaClientError) => {
  return (
    e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};
