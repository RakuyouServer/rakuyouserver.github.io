import {defineStore} from "pinia";
import {computed} from "vue";
import {accessToken} from "@/services/auth.ts";

export const useUserStore = defineStore("user-store", () => {
  const authorized = computed<boolean>(() => accessToken.value !== null);

  const init = async () => {
  };

  return {authorized, init};
});