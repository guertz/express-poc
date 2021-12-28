import dotenv from "dotenv";

import { Expose, plainToClass } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator";
import { PoolConfig } from "pg";


export class Environment {
  
  @Expose()
  @IsIn(['development', 'production', 'test'])
  NODE_ENV!: 'development' | 'production' | 'test';

  @Expose()
  @IsNumber()
  NODE_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_USER!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_DB!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST!: string;

  @Expose()
  @IsNumber()
  POSTGRES_PORT!: number;

  public static get POOL_CONFIG(): PoolConfig {
    const env = getEnv();

    return {
      user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      database: env.POSTGRES_DB,
      password: env.POSTGRES_PASSWORD,
      port: env.POSTGRES_PORT
    }
  }
}

let parsedEnv: Environment | undefined;

export function getEnv() {
  if (!parsedEnv) {
    dotenv.config();

    parsedEnv =
      plainToClass(
        Environment,
        process.env,
        {
          excludeExtraneousValues: true,
          enableImplicitConversion: true
        }
      );

    const errors = validateSync(parsedEnv);

    if (errors.length) {
      throw errors[0];
    }
  }

  return parsedEnv;
}
