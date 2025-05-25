export interface UserBasicInfoEntity {
  uid: number;
  username: string;
  group: string;
  status: number;
}

export interface UserDetailInfoEntity {
  uid: number;
  nickname: string;
  email: string;
  avatarUrl: string;
}

export type UserCombinedInfoEntity = UserBasicInfoEntity & UserDetailInfoEntity;

export interface UserUpdateInfoForm {
  nickname: string | undefined;
  email: string | undefined;
  avatarUrl: string | undefined;
}

export interface UserUpdateInfoRequest {
  nickname: string | undefined;
  email: string | undefined;
  avatarUrl: string | undefined;
}

export const emptyBasicInfo: () => UserBasicInfoEntity = () => ({
  uid: -1, username: "", group: "", status: -1
});

export const emptyDetailInfo: () => UserDetailInfoEntity = () => ({
  uid: -1, nickname: "", email: "", avatarUrl: ""
});

export const emptyCombinedInfo: () => UserCombinedInfoEntity = () => ({
  ...emptyBasicInfo(),
  ...emptyDetailInfo()
});
