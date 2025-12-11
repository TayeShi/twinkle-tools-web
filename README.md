This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), using [Radix UI Themes](https://www.radix-ui.com/themes/) for components and SCSS for styling.

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Development Guidelines

Please refer to the [DEVELOPMENT.md](./docs/DEVELOPMENT.md) file for detailed development requirements and best practices, including:

- UI component usage (Radix UI + SCSS)
- Code styling and formatting
- Development workflow
- Directory structure

### Key Requirements

1. **优先使用Radix UI组件**：对于交互组件（如按钮、菜单、对话框等），优先使用Radix UI Themes组件库
2. **SCSS样式补充**：当Radix UI组件样式无法满足需求时，使用SCSS进行补充定制
3. **保持可访问性**：利用Radix UI内置的可访问性特性，确保组件符合WCAG标准
4. **组件复用**：创建可复用的组件，避免重复代码

## Learn More

To learn more about Next.js and Radix UI, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Radix UI Themes Documentation](https://www.radix-ui.com/themes/docs/overview/getting-started) - learn about Radix UI Themes components and usage.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) and [the Radix UI GitHub repository](https://github.com/radix-ui/primitives) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
