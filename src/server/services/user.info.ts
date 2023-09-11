import { InferApiRequest } from '@roxavn/core/base';
import { BaseService, DatabaseService, inject } from '@roxavn/core/server';
import { GetFileApiService } from '@roxavn/module-upload/server';
import { User } from '@roxavn/module-user/server';

import { userInfoApi } from '../../base/index.js';
import { serverModule } from '../module.js';

@serverModule.useApi(userInfoApi.update)
export class UpdateUserInfoApiService extends BaseService {
  constructor(
    @inject(DatabaseService) private databaseService: DatabaseService,
    @inject(GetFileApiService) private getFileApiService: GetFileApiService
  ) {
    super();
  }

  async handle(request: InferApiRequest<typeof userInfoApi.update>) {
    let avatar;
    if (request.avatar) {
      if (request.avatar.id) {
        avatar = await this.getFileApiService.handle({
          fileId: request.avatar.id,
        });
      } else if (request.avatar.url) {
        avatar = { url: request.avatar.url };
      }
    }
    await this.databaseService.manager.getRepository(User).update(
      { id: request.userId },
      {
        firstName: request.firstName,
        middleName: request.middleName,
        lastName: request.lastName,
        gender: request.gender,
        birthday: request.birthday,
        avatar: avatar,
      }
    );
    return {};
  }
}
