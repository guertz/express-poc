import express from "express";
import { Expose, plainToClass } from "class-transformer";
import { IsUUID, validateSync } from "class-validator";
import { ICommand } from "../../core";
import Repo from "../repository";

export class GetUserById extends ICommand {

  @Expose()
  @IsUUID()
  id!: string;

  public static doCreate(request: express.Request): GetUserById {
    return plainToClass(
      GetUserById,
      request.params,
      { excludeExtraneousValues: true }
    );
  }

  public static doValidate(command: GetUserById) {
    const errors = validateSync(command);

    if (errors.length) {
      throw errors[0]
    }
  }

  public static doExecute(command: GetUserById) {
    return Repo.getById(command.id);
  }
}