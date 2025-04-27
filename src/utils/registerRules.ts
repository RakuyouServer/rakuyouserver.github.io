import type {Rule} from 'ant-design-vue/es/form';
import type {RegisterForm} from "@/types/auth.ts";

export const createRules = (formData: RegisterForm): Record<keyof RegisterForm, Rule[]> => ({
  username: [
    {required: true, message: '请输入用户名'},
    {min: 3, message: '用户名至少需要3个字符'},
  ],
  password: [
    {required: true, message: '请输入密码'},
    {min: 6, message: '密码长度不能少于6个字符'},
  ],
  passwordRepeat: [
    {required: true, message: '请确认密码'},
    {
      validator: (_, value) => {
        if (value !== formData.password) return Promise.reject('两次输入的密码不一致');
        return Promise.resolve();
      },
    },
  ],
  email: [
    {required: true, message: '请输入邮箱'},
    {type: 'email', message: '邮箱格式不正确'},
  ],
});

export const createFieldStatus = (): Record<keyof RegisterForm, boolean> => ({
  username: false,
  password: false,
  passwordRepeat: false,
  email: false,
});