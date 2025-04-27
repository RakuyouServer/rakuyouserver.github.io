import type {LoginForm} from '@/types/auth';
import type {Rule} from 'ant-design-vue/es/form';

export const createLoginRules = (): Record<keyof LoginForm, Rule[]> => ({
  username: [
    {required: true, message: '请输入用户名'},
    {min: 3, message: '用户名至少需要3个字符'},
  ],
  password: [
    {required: true, message: '请输入密码'},
  ],
  remember: [],
});

export const createLoginFieldStatus = (): Record<keyof LoginForm, boolean> => ({
  username: false,
  password: false,
  remember: true,
});
