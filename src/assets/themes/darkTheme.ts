import type {Theme} from "@/assets/themes/theme.ts"
import {commonThemeConfig} from "@/assets/themes/theme.ts"
import {theme} from "ant-design-vue"

const colorPrimary = '#0ac7dd';

export class DarkTheme implements Theme {
  name: string = 'dark'
  common = {
    algorithm: theme.darkAlgorithm,
    token: {
      ...commonThemeConfig,
      colorPrimary: colorPrimary,
      colorBgBase: '#0e0e0e',
      colorBgContainer: '#1e1e1e',
      colorLink: '#0998a9',
      colorLinkHover: colorPrimary,
      colorLinkActive: '#078898',
    },
  }
  topBar = {
    ...commonThemeConfig,
    colorBg: 'rgba(0,0,0,0.6)',
  }
  input = {
    ...commonThemeConfig,
    colorBgContainer: '#171717',
  }

  static instance = new DarkTheme()
}