import type {UserBasicInfoEntity, UserCombinedInfoEntity, UserDetailInfoEntity, UserUpdateInfoRequest} from "@/types/user.ts";
import {axiosAuthorized} from "@/utils/networkUtils.ts";

const baseUrl = '/user';

export const getInfo = () => new Promise<UserCombinedInfoEntity>((resolve, reject) =>
  axiosAuthorized.get<UserCombinedInfoEntity>(
    `${baseUrl}`
  ).then(({data}) => resolve(data)).catch(reject)
);

export const getBasicInfo = () => new Promise<UserBasicInfoEntity>((resolve, reject) =>
  axiosAuthorized.get<UserCombinedInfoEntity>(
    `${baseUrl}/basic`
  ).then(({data}) => resolve(data)).catch(reject)
);

export const getDetailInfo = () => new Promise<UserDetailInfoEntity>((resolve, reject) =>
  axiosAuthorized.get<UserCombinedInfoEntity>(
    `${baseUrl}/detail`
  ).then(({data}) => resolve(data)).catch(reject)
);

export const updateInfo = (request: UserUpdateInfoRequest) => new Promise<boolean>((resolve, reject) =>
  axiosAuthorized.patch<boolean>(
    `${baseUrl}`,
    request
  ).then(({data}) => resolve(data)).catch(reject)
);