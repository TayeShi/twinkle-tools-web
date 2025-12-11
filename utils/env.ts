import { z } from 'zod';

// 环境变量验证模式
const envSchema = z.object({
  ICP_NUMBER: z.string().default('蜀ICP备2020029991号-1'),
  ICP_URL: z.string().url().default('https://beian.miit.gov.cn/'),
});

// 解析并验证环境变量
export const env = envSchema.parse(process.env);
