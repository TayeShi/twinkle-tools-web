# 统一Header组件

## 概述

Header组件是一个可复用的页面头部组件，用于所有工具页面的顶部导航和工具信息展示。该组件实现了响应式设计，适配不同屏幕尺寸，确保在移动端和桌面端都有良好的显示效果。

## 组件结构

Header组件包含以下部分：

1. **返回按钮**：点击返回首页
2. **工具图标**：显示工具的代表性图标
3. **工具标题**：显示工具的名称
4. **工具描述**：显示工具的简短描述

## 组件参数

| 参数名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| `icon` | `React.ReactNode` | 工具图标组件 | - |
| `title` | `string` | 工具标题 | - |
| `description` | `string` | 工具描述 | - |
| `iconGradient` | `string` | 工具图标背景渐变 | `from-purple-500 to-pink-600` |

## 使用方法

### 1. 导入组件

```typescript
import { Header } from '@/components/Header';
```

### 2. 导入所需图标

```typescript
import { FileText } from 'lucide-react';
```

### 3. 在页面中使用组件

```typescript
<Header
  icon={<FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
  title="📄 PDF转图片工具"
  description="🎨 快速将PDF文件转换为高质量图片，支持多种格式和自定义设置"
  iconGradient="from-purple-500 to-pink-600"
/>
```

## 响应式设计

Header组件实现了以下响应式设计：

1. **字体大小**：
   - 移动端：标题使用`text-2xl`，描述使用`text-xs`
   - 大屏幕：标题使用`text-3xl`，描述使用`text-sm`

2. **按钮大小**：
   - 移动端：按钮使用`size="sm"`，内边距`px-4 py-2`
   - 大屏幕：按钮使用`size="sm"`，内边距`px-6 py-3`

3. **间距**：
   - 移动端：元素间距使用`space-x-3`、`space-x-4`
   - 大屏幕：元素间距使用`space-x-4`、`space-x-6`

4. **图标大小**：
   - 移动端：图标使用`h-10 w-10`
   - 大屏幕：图标使用`h-12 w-12`

## 示例

### PDF转图片工具

```typescript
import { FileText } from 'lucide-react';
import { Header } from '@/components/Header';

<Header
  icon={<FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
  title="📄 PDF转图片工具"
  description="🎨 快速将PDF文件转换为高质量图片，支持多种格式和自定义设置"
  iconGradient="from-purple-500 to-pink-600"
/>
```

### 图片压缩器

```typescript
import { Image } from 'lucide-react';
import { Header } from '@/components/Header';

<Header
  icon={<Image className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
  title="🖼️ 图片压缩转换"
  description="🎨 智能压缩，批量处理，保护隐私"
  iconGradient="from-purple-500 to-pink-600"
/>
```

### 图片编辑器

```typescript
import { Edit3 } from 'lucide-react';
import { Header } from '@/components/Header';

<Header
  icon={<Edit3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
  title="🖼️ 图片编辑器"
  description="🎨 专业的图片编辑工具，支持参数调整和滤镜效果"
  iconGradient="from-purple-500 to-pink-600"
/>
```

## 最佳实践

1. **图标选择**：选择能代表工具功能的简洁图标
2. **标题设计**：使用简洁明了的标题，包含工具类型和功能
3. **描述编写**：使用简短的描述，突出工具的核心优势
4. **渐变选择**：根据工具的主题选择合适的渐变颜色
5. **一致性**：所有工具页面使用相同的Header组件，确保风格统一

## 后续维护

1. 当添加新工具页面时，务必使用该统一Header组件
2. 如需修改Header样式，只需修改该组件，所有页面将自动更新
3. 如需添加新功能，确保在组件中实现，保持一致性

## 总结

统一Header组件实现了所有工具页面的头部导航和信息展示，确保了页面风格的一致性和响应式设计。通过使用该组件，可以提高开发效率，确保所有页面的头部样式统一，提供更好的用户体验。