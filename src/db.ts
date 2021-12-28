import { Pool } from "pg";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { Environment } from "./env";

let pool: Pool | undefined;

export function getPool() {
  if (!pool) {
    pool = new Pool(Environment.POOL_CONFIG);

    pool.on(
      'error',
      () => {
        pool?.removeAllListeners();
        console.error('Pool crashed');
        pool = undefined;
      }
    );
  }

  return pool;
}

export class ModelImplError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class NotFoundException extends Error {
  constructor(entity: string, id: string) {
    super(`NotFoundException for entity::"${entity}" with id::"${id}"`);
  }
}

export function parseModel <T extends Model> (Klass: any, payload: object): T {
  return plainToClass(
    Klass,
    payload,
    { excludeExtraneousValues: true }
  );
}

export function validateModel <T extends Model> (payload: T) {
  const errors = validateSync(payload);

  if (errors.length) {
    throw errors[0];
  }
}

export class Model {

  public static parse(payload: object) {
    throw new ModelImplError('parse method has not been implemented correctly.');
  }

  public static validate(payload: object) {
    throw new ModelImplError('validate method has not been implemented correctly.');    
  }
}
