import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

import { Model, parseModel, validateModel } from "../../db";

/**
 * This is the user model.
 *
 * @remarks
 * User model for postgres db.
 *
 * @ddl
 * ```sql
 * 
 * --- Author: Matteo Guerzoni
 * --- Last update: 27/12/2021 18:44
 * 
 * CREATE TABLE "users" (
 *  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
 *  "email" character varying NOT NULL,
 *  "firstname" character varying NOT NULL,
 *  "lastname" character varying NOT NULL
 * )
 * ```
 */

export class User extends Model {

  static readonly tableName = 'users';

  @Expose()
  @IsUUID()
  id!: string;

  @Expose()
  @IsEmail()
  // @IsUnique async validator
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  firstname!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  public static parse(payload: object): User {
    return parseModel(User, payload);
  }

  public static validate(user: User) {
    return validateModel(user);
  }
};
