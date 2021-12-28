import express from "express";
import { Expose, plainToClass } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, validateSync } from "class-validator";
import { ICommand } from "../../core";
import Repo from "../repository";

export class CreateUser extends ICommand {

  @Expose()
  @IsString()
  @IsNotEmpty()
  firstname!: string;

  @Expose()
  @IsEmail()
  // @IsUnique async validator
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  public static doCreate(request: express.Request): CreateUser {
    return plainToClass(
      CreateUser,
      request.body,
      { excludeExtraneousValues: true }
    );
  }

  public static doValidate(command: CreateUser) {
    const errors = validateSync(command);

    if (errors.length) {
      throw errors[0]
    }
  }

  public static doExecute(command: CreateUser) {
    return Repo.insert(command);
  }
}