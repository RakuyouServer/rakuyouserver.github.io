/**
 * 将十六进制颜色代码转换为 RGBA 格式
 *
 * @param hex 十六进制颜色代码
 * @param alpha 透明度，默认值为 1 (完全不透明)
 * @returns 返回转换后的 rgba 字符串
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  // 检查 hex 是否是有效的六位数十六进制颜色
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Invalid hex color format. Expected format: #RRGGBB');
  }

  // 解析红、绿、蓝值
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // 返回 rgba 格式的颜色
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 将十六进制颜色代码转换为 RGB 格式
 *
 * @param hex 十六进制颜色代码，例如 #1e1e1e
 * @returns 返回转换后的 rgb 字符串
 */
export function hexToRgb(hex: string): string {
  // 检查 hex 是否是有效的六位数十六进制颜色
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Invalid hex color format. Expected format: #RRGGBB');
  }

  // 解析红、绿、蓝值
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // 返回 rgb 格式的颜色
  return `rgb(${r}, ${g}, ${b})`;
}