import type {Theme} from "@/assets/themes/theme.ts"
import {commonThemeConfig} from "@/assets/themes/theme.ts"
import type {ThemeConfig} from "ant-design-vue/es/config-provider/context";

const colorPrimary = '#0cbccf';

export class LightTheme implements Theme {
  name: string = 'light'
  common: ThemeConfig = {
    token: {
      ...commonThemeConfig,
      colorPrimary: colorPrimary,
      colorBgBase: '#ededed',
      colorBgContainer: '#ffffff',
      colorLink: '#09bacd',
      colorLinkHover: '#0bd1e6',
      colorLinkActive: '#0aa9bd',
    },
  }
  topBar = {
    ...commonThemeConfig,
    colorBg: 'rgba(255,255,255,0.7)',
  }
  input = {
    ...commonThemeConfig,
    colorBgContainer: '#efefef',
  }

  static instance = new LightTheme()
}