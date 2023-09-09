import {
  ApiSource,
  ExactProps,
  IsIn,
  IsNotEmptyObject,
  IsOptional,
  MinLength,
  TransformDate,
  accessManager,
} from '@roxavn/core/base';
import { permissions, UserResponse } from '@roxavn/module-user/base';
import { type FileInfo } from '@roxavn/module-upload/base';

import { baseModule } from '../module.js';
import { constants } from '../constants.js';

const userInfoSource = new ApiSource<UserResponse>(
  [accessManager.scopes.User],
  baseModule
);

class UpdateUserInfoRequest extends ExactProps<UpdateUserInfoRequest> {
  @MinLength(1)
  public readonly userId: string;

  @MinLength(1)
  @IsOptional()
  public readonly firstName?: string;

  @MinLength(1)
  @IsOptional()
  public readonly middleName?: string;

  @MinLength(1)
  @IsOptional()
  public readonly lastName?: string;

  @IsNotEmptyObject()
  @IsOptional()
  public readonly avatar?: FileInfo;

  @IsOptional()
  @TransformDate()
  public readonly birthday?: Date;

  @IsIn(Object.values(constants.Genders))
  @IsOptional()
  public readonly gender?: string;
}

export const userInfoApi = {
  update: userInfoSource.update({
    validator: UpdateUserInfoRequest,
    permission: permissions.UpdateUser,
  }),
};
