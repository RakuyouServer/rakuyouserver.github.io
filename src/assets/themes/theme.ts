import type {ThemeConfig} from "ant-design-vue/es/config-provider/context";

export interface Theme {
  name: string,
  common: ThemeConfig,
  topBar: {
    colorBg: string,
  },
  input: {
    colorBgContainer: string,
  },
}

export const commonThemeConfig = {
  borderRadius: 10,
  borderRadiusLG: 10,
  borderRadiusSM: 4,
  borderRadiusXS: 2,
};