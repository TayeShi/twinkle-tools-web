This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), using [Radix UI](https://www.radix-ui.com/) for components.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Radix UI

This project uses [Radix UI](https://www.radix-ui.com/) as its component library. Radix UI provides accessible, unstyled components that can be easily customized with Tailwind CSS.

### Installation

Radix UI is already installed in this project. If you need to install additional Radix UI components, you can use:

```bash
bun add radix-ui
```

### Usage Requirements

When building components for this project, please follow these guidelines:

1. **优先使用Radix UI组件**：对于交互组件（如按钮、菜单、对话框等），优先使用Radix UI组件，而不是从头开始构建。
2. **结合Tailwind CSS**：使用Tailwind CSS对Radix UI组件进行样式定制，保持设计一致性。
3. **保持可访问性**：利用Radix UI内置的可访问性特性，确保组件符合WCAG标准。
4. **组件复用**：创建可复用的组件，避免重复代码。

### Basic Example

```jsx
import { Button } from 'radix-ui/react-button';

const MyButton = () => {
  return (
    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
      Click me
    </Button>
  );
};
```

## Learn More

To learn more about Next.js and Radix UI, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Radix UI Documentation](https://www.radix-ui.com/docs) - learn about Radix UI components and usage.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) and [the Radix UI GitHub repository](https://github.com/radix-ui/primitives) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
