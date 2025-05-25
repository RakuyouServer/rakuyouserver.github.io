import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import {accessToken} from "@/services/auth.ts";
import {getInfo} from "@/services/user.ts";
import {emptyCombinedInfo, type UserCombinedInfoEntity} from "@/types/user.ts";

export const useUserStore = defineStore("user-store", () => {
  const authorized = computed<boolean>(() => accessToken.value !== null);
  const info = reactive<UserCombinedInfoEntity>(emptyCombinedInfo());

  const init = async () => {
    if (!authorized) return;
    await fetchInfo()
  };

  const fetchInfo = async () => {
    const infoEntity = await getInfo();
    Object.assign(info, infoEntity);
  }

  return {authorized, info, init};
});