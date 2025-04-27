export interface Theme {
  name: string,
  common: object,
  topBar: {
    colorBg: string,
  },
  input: {
    colorBgContainer: string,
  },
}

export const commonThemeConfig = {
  borderRadius: '10px',
  borderRadiusLG: '10px',
  borderRadiusSM: '4px',
  borderRadiusXS: '2px',
};