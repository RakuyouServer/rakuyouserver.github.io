import {defineStore} from "pinia"
import {computed, ref} from "vue"
import type {Theme} from "@/assets/themes";
import {DarkTheme, LightTheme} from "@/assets/themes";
import type {ThemeConfig} from "ant-design-vue/es/config-provider/context";

export const useThemeStore = defineStore("theme-store", () => {
  const themes = ref<Theme[]>([]);
  const theme = ref<Theme>(LightTheme.instance);
  const themeName = computed(() => theme.value?.name);
  const themeToken = computed(() => (theme.value?.common as ThemeConfig).token);

  const init = () => {
    loadTheme(LightTheme.instance);
    loadTheme(DarkTheme.instance);
    loadThemeFromLocal();
  };

  const loadTheme = (theme: Theme) => {
    if (themes.value.indexOf(theme) === -1) {
      themes.value.push(theme);
    }
  };

  const loadThemeFromLocal = () => {
    const themeName = localStorage.getItem("theme");
    if (!themeName) {
      useLightTheme();
    } else {
      const found = themes.value.find((t) => t.name === themeName);
      if (found) useTheme(found);
      else useLightTheme();
    }
  };

  const saveThemeToLocal = () => {
    if (themeName.value) {
      localStorage.setItem("theme", themeName.value);
    }
  };

  const useTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    saveThemeToLocal();
  }

  const useLightTheme = (): Theme => {
    useTheme(LightTheme.instance);
    return theme.value;
  };

  const useDarkTheme = (): Theme => {
    useTheme(DarkTheme.instance);
    return theme.value;
  };

  return {theme, themeName, themeToken, init, loadTheme, loadThemeFromLocal, saveThemeToLocal, useTheme, useLightTheme, useDarkTheme};
});
