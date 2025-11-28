# 工具模块文档

## 📋 工具模块概述

工具模块是 Twinkle Tools 的核心功能模块，包含各种实用的在线工具。每个工具都有独立的页面和功能实现，采用模块化设计便于维护和扩展。

### 工具分类体系
- 🔢 **数学工具** - 计算器、单位转换、进制转换
- 🎨 **设计工具** - 颜色选择器、图片压缩、尺寸计算
- 📝 **文本工具** - 格式化、编码解码、正则测试
- ⏰ **时间工具** - 倒计时器、时区转换、时间戳转换
- 🔐 **安全工具** - 密码生成器、哈希计算、加密解密
- 💻 **开发工具** - JSON格式化、SQL美化、URL编解码

---

## 🏗 工具页面结构

### 标准页面模板
```
app/[tool]/
├── page.tsx           # 工具主页面
├── layout.tsx         # 工具专属布局 (可选)
├── loading.tsx        # 加载状态 (可选)
├── error.tsx          # 错误页面 (可选)
└── components/        # 工具专属组件
    ├── ToolHeader.tsx # 工具标题区域
    ├── ToolArea.tsx   # 主要功能区域
    └── ToolSettings.tsx # 设置面板
```

### 页面组件模板
```typescript
// app/calculator/page.tsx
import { ToolHeader } from '@/components/tools/Calculator/ToolHeader';
import { ToolArea } from '@/components/tools/Calculator/ToolArea';
import { ToolSettings } from '@/components/tools/Calculator/ToolSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '计算器 - Twinkle Tools',
  description: '功能强大的在线计算器，支持基础运算和科学计算',
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto py-8">
      {/* 工具标题 */}
      <ToolHeader 
        title="计算器"
        description="功能强大的在线计算器，支持基础运算和科学计算"
        icon={Calculator}
      />
      
      {/* 主要功能区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        {/* 工具主区域 */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>计算器</CardTitle>
            </CardHeader>
            <CardContent>
              <ToolArea />
            </CardContent>
          </Card>
        </div>
        
        {/* 设置面板 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>设置</CardTitle>
            </CardHeader>
            <CardContent>
              <ToolSettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔢 数学工具模块

### 计算器工具
**路径**: `/calculator`  
**功能**: 基础运算、科学计算、历史记录

#### 组件结构
```typescript
// components/tools/Calculator/
├── ToolHeader.tsx
├── Display.tsx        # 显示屏
├── Keypad.tsx         # 键盘
├── History.tsx        # 历史记录
└── Settings.tsx       # 计算设置
```

#### 核心功能
```typescript
// types/calculator.ts
export type Operation = '+' | '-' | '*' | '/' | '%' | '^';
export type CalculatorMode = 'basic' | 'scientific' | 'programmer';

export interface CalculationState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForNewValue: boolean;
  history: CalculationRecord[];
}

// hooks/useCalculator.ts
export function useCalculator() {
  const [state, setState] = useState<CalculationState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: [],
  });

  const inputNumber = (num: string) => {
    setState(prev => ({
      ...prev,
      display: prev.waitingForNewValue ? num : prev.display + num,
      waitingForNewValue: false,
    }));
  };

  const inputOperation = (op: Operation) => {
    setState(prev => ({
      ...prev,
      previousValue: parseFloat(prev.display),
      operation: op,
      waitingForNewValue: true,
    }));
  };

  const calculate = () => {
    const { previousValue, display, operation } = state;
    if (previousValue === null || operation === null) return;

    const currentValue = parseFloat(display);
    let result: number;

    switch (operation) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        result = previousValue / currentValue;
        break;
      case '%':
        result = previousValue % currentValue;
        break;
      case '^':
        result = Math.pow(previousValue, currentValue);
        break;
    }

    setState(prev => ({
      ...prev,
      display: result.toString(),
      previousValue: null,
      operation: null,
      waitingForNewValue: true,
      history: [...prev.history, {
        expression: `${previousValue} ${operation} ${currentValue}`,
        result: result.toString(),
        timestamp: new Date(),
      }],
    }));
  };

  return {
    state,
    inputNumber,
    inputOperation,
    calculate,
    clear: () => setState({ display: '0', previousValue: null, operation: null, waitingForNewValue: false, history: state.history }),
    clearAll: () => setState({ display: '0', previousValue: null, operation: null, waitingForNewValue: false, history: [] }),
  };
}
```

---

## 🎨 设计工具模块

### 颜色选择器
**路径**: `/color-picker`  
**功能**: 颜色选择、格式转换、调色板管理

#### 组件结构
```typescript
// components/tools/ColorPicker/
├── ToolHeader.tsx
├── ColorWheel.tsx      # 色轮选择器
├── ColorSliders.tsx    # 滑块调节器
├── ColorFormats.tsx     # 格式显示
├── PaletteManager.tsx   # 调色板管理
└── ColorHistory.tsx    # 颜色历史
```

#### 颜色转换功能
```typescript
// lib/color-utils.ts
export interface ColorFormats {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  cmyk: { c: number; m: number; y: number; k: number };
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function convertColorFormats(input: string): ColorFormats {
  // 自动检测输入格式并转换为所有格式
  const hex = input.startsWith('#') ? input : `#${input}`;
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    hex,
    rgb,
    hsl,
    hsv: rgbToHsv(rgb.r, rgb.g, rgb.b),
    cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
  };
}
```

### 图片压缩工具
**路径**: `/image-compressor`  
**功能**: 图片上传、压缩、格式转换

```typescript
// components/tools/ImageCompressor/ImageCompressor.tsx
export function ImageCompressor() {
  const [image, setImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');

  const compressImage = async (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          const mimeType = `image/${format}`;
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            }
          }, mimeType, quality);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (file: File) => {
    setImage(file);
    const compressed = await compressImage(file);
    setCompressedImage(compressed);
  };

  return (
    <div className="space-y-6">
      {/* 上传区域 */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium">点击上传图片</p>
          <p className="text-sm text-gray-500">支持 JPG、PNG、WebP 格式</p>
        </label>
      </div>

      {/* 压缩设置 */}
      <Card>
        <CardHeader>
          <CardTitle>压缩设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">压缩质量</label>
            <Slider
              value={[quality * 100]}
              onValueChange={([value]) => setQuality(value / 100)}
              max={100}
              min={10}
              step={10}
            />
            <span className="text-sm text-gray-500">{Math.round(quality * 100)}%</span>
          </div>
          
          <div>
            <label className="text-sm font-medium">输出格式</label>
            <RadioGroup value={format} onValueChange={(value) => setFormat(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jpeg" id="jpeg" />
                <label htmlFor="jpeg">JPEG</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="png" id="png" />
                <label htmlFor="png">PNG</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="webp" id="webp" />
                <label htmlFor="webp">WebP</label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* 结果展示 */}
      {compressedImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 原图 */}
          <Card>
            <CardHeader>
              <CardTitle>原图</CardTitle>
            </CardHeader>
            <CardContent>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="原图"
                  className="w-full h-auto rounded"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                大小: {(image?.size || 0 / 1024).toFixed(2)} KB
              </p>
            </CardContent>
          </Card>

          {/* 压缩后 */}
          <Card>
            <CardHeader>
              <CardTitle>压缩后</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={compressedImage}
                alt="压缩后"
                className="w-full h-auto rounded"
              />
              <Button className="mt-4 w-full" onClick={() => {
                const a = document.createElement('a');
                a.href = compressedImage;
                a.download = `compressed.${format}`;
                a.click();
              }}>
                下载压缩图片
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
```

---

## 📝 文本工具模块

### 文本格式化工具
**路径**: `/text-formatter`  
**功能**: 大小写转换、空格处理、行处理

```typescript
// components/tools/TextFormatter/TextFormatter.tsx
export function TextFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operations, setOperations] = useState<string[]>([]);

  const applyOperation = (operation: string) => {
    let result = input;
    
    switch (operation) {
      case 'uppercase':
        result = result.toUpperCase();
        break;
      case 'lowercase':
        result = result.toLowerCase();
        break;
      case 'capitalize':
        result = result.replace(/\b\w/g, char => char.toUpperCase());
        break;
      case 'trim':
        result = result.trim();
        break;
      case 'remove-spaces':
        result = result.replace(/\s+/g, '');
        break;
      case 'remove-newlines':
        result = result.replace(/\n+/g, ' ');
        break;
    }
    
    setOutput(result);
    setOperations([...operations, operation]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 输入区域 */}
      <Card>
        <CardHeader>
          <CardTitle>输入文本</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="在此输入要格式化的文本..."
            className="min-h-[300px]"
          />
          <div className="text-sm text-gray-500 mt-2">
            字符数: {input.length} | 行数: {input.split('\n').length}
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <Card>
        <CardHeader>
          <CardTitle>格式化操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => applyOperation('uppercase')}>
              <Type className="h-4 w-4 mr-2" />
              转大写
            </Button>
            <Button onClick={() => applyOperation('lowercase')}>
              <Type className="h-4 w-4 mr-2" />
              转小写
            </Button>
            <Button onClick={() => applyOperation('capitalize')}>
              <Type className="h-4 w-4 mr-2" />
              首字母大写
            </Button>
            <Button onClick={() => applyOperation('trim')}>
              <Scissors className="h-4 w-4 mr-2" />
              去除空格
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 输出区域 */}
      <Card>
        <CardHeader>
          <CardTitle>格式化结果</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={output}
            readOnly
            className="min-h-[300px]"
          />
          <Button 
            className="mt-3"
            onClick={() => {
              navigator.clipboard.writeText(output);
              // 显示复制成功提示
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            复制结果
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## ⏰ 时间工具模块

### 倒计时器
**路径**: `/timer`  
**功能**: 倒计时、提醒、预设时间

```typescript
// components/tools/Timer/Timer.tsx
export function Timer() {
  const [time, setTime] = useState(0); // 秒数
  const [isRunning, setIsRunning] = useState(false);
  const [endTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            // 播放提醒音
            playNotificationSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const presetTimes = [
    { label: '1分钟', value: 60 },
    { label: '5分钟', value: 300 },
    { label: '10分钟', value: 600 },
    { label: '25分钟', value: 1500 }, // Pomodoro
    { label: '30分钟', value: 1800 },
    { label: '1小时', value: 3600 },
  ];

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* 时间显示 */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-6xl font-mono font-bold">
            {formatTime(time)}
          </div>
          {endTime && (
            <p className="text-sm text-gray-500 mt-2">
              结束时间: {endTime.toLocaleTimeString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4">
        <Button
          size="lg"
          onClick={() => setIsRunning(!isRunning)}
          disabled={time === 0}
        >
          {isRunning ? (
            <>
              <Pause className="h-5 w-5 mr-2" />
              暂停
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              {time > 0 ? '继续' : '开始'}
            </>
          )}
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setIsRunning(false);
            setTime(0);
            setEndTime(null);
          }}
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          重置
        </Button>
      </div>

      {/* 预设时间 */}
      <Card>
        <CardHeader>
          <CardTitle>快速设置</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {presetTimes.map((preset) => (
              <Button
                key={preset.value}
                variant="outline"
                size="sm"
                onClick={() => {
                  setTime(preset.value);
                  setEndTime(new Date(Date.now() + preset.value * 1000));
                  setIsRunning(false);
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 自定义时间 */}
      <Card>
        <CardHeader>
          <CardTitle>自定义时间</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">小时</label>
              <Input
                type="number"
                min="0"
                max="23"
                defaultValue="0"
                onChange={(e) => {
                  const hours = parseInt(e.target.value) || 0;
                  setTime(prev => {
                    const minutes = Math.floor(prev / 60) % 60;
                    const seconds = prev % 60;
                    return hours * 3600 + minutes * 60 + seconds;
                  });
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">分钟</label>
              <Input
                type="number"
                min="0"
                max="59"
                defaultValue="0"
                onChange={(e) => {
                  const minutes = parseInt(e.target.value) || 0;
                  setTime(prev => {
                    const hours = Math.floor(prev / 3600);
                    const seconds = prev % 60;
                    return hours * 3600 + minutes * 60 + seconds;
                  });
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">秒</label>
              <Input
                type="number"
                min="0"
                max="59"
                defaultValue="0"
                onChange={(e) => {
                  const seconds = parseInt(e.target.value) || 0;
                  setTime(prev => {
                    const hours = Math.floor(prev / 3600);
                    const minutes = Math.floor(prev / 60) % 60;
                    return hours * 3600 + minutes * 60 + seconds;
                  });
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🔐 安全工具模块

### 密码生成器
**路径**: `/password-generator`  
**功能**: 安全密码生成、强度检测、批量生成

```typescript
// components/tools/PasswordGenerator/PasswordGenerator.tsx
export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') return;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 12) strength++;
    if (pwd.length >= 16) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { label: '弱', color: 'bg-red-500' };
    if (strength <= 4) return { label: '中等', color: 'bg-yellow-500' };
    return { label: '强', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 密码显示 */}
      <Card>
        <CardHeader>
          <CardTitle>生成的密码</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Input
              value={password}
              readOnly
              placeholder="点击生成密码"
              className="font-mono"
            />
            <Button
              onClick={() => navigator.clipboard.writeText(password)}
              disabled={!password}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          {password && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">密码强度</span>
                <span className={`px-2 py-1 rounded text-xs text-white ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${strength.color}`}
                  style={{ width: `${(password.length / 32) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 生成设置 */}
      <Card>
        <CardHeader>
          <CardTitle>密码设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 长度设置 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">密码长度</label>
              <span className="text-sm text-gray-500">{length} 字符</span>
            </div>
            <Slider
              value={[length]}
              onValueChange={([value]) => setLength(value)}
              max={32}
              min={8}
              step={1}
            />
          </div>

          {/* 字符类型 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">大写字母 (A-Z)</label>
              <Switch
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">小写字母 (a-z)</label>
              <Switch
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">数字 (0-9)</label>
              <Switch
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">特殊符号 (!@#$%^&*)</label>
              <Switch
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>

          <Button 
            onClick={generatePassword}
            className="w-full"
            size="lg"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            生成密码
          </Button>
        </CardContent>
      </Card>

      {/* 批量生成 */}
      <Card>
        <CardHeader>
          <CardTitle>批量生成</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              const newPasswords = Array.from({ length: 10 }, () => {
                let charset = '';
                if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
                if (includeNumbers) charset += '0123456789';
                if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

                let newPassword = '';
                for (let i = 0; i < length; i++) {
                  newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
                }
                return newPassword;
              });
              setPasswords(newPasswords);
            }}
            className="w-full mb-4"
          >
            生成 10 个密码
          </Button>

          {passwords.length > 0 && (
            <div className="space-y-2">
              {passwords.map((pwd, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input value={pwd} readOnly className="font-mono text-sm" />
                  <Button
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(pwd)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🛠 工具开发规范

### 1. 目录结构规范
```
components/tools/[ToolName]/
├── index.tsx          # 主入口组件
├── ToolHeader.tsx     # 标题组件
├── ToolArea.tsx       # 功能区域
├── ToolSettings.tsx   # 设置面板
├── types.ts           # 类型定义
├── hooks/             # 自定义 Hooks
├── utils/             # 工具函数
└── __tests__/         # 测试文件
```

### 2. 组件命名规范
```typescript
// ✅ 推荐：PascalCase
export function Calculator() {}
export function ColorPicker() {}
export function PasswordGenerator() {}

// ✅ 推荐：Hook 命名
export function useCalculator() {}
export function useColorPicker() {}
export function usePasswordGenerator() {}
```

### 3. 状态管理规范
```typescript
// ✅ 推荐：使用 useState 和 useReducer
const [state, setState] = useState<StateType>({
  // 初始状态
});

// ✅ 推荐：复杂状态使用 useReducer
const [state, dispatch] = useReducer(reducer, initialState);
```

### 4. 样式规范
```typescript
// ✅ 推荐：使用 shadcn/ui 组件
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ✅ 推荐：使用 Tailwind CSS
<div className="space-y-6">
  <Card className="hover:shadow-lg transition-shadow">
    {/* 内容 */}
  </Card>
</div>
```

---

## 📈 性能优化策略

### 1. 组件懒加载
```typescript
// 动态导入重型组件
const HeavyCalculator = dynamic(() => import('@/components/tools/Calculator'), {
  loading: () => <div>加载中...</div>,
  ssr: false,
});
```

### 2. 状态优化
```typescript
// 使用 useMemo 缓存计算结果
const formattedResult = useMemo(() => {
  return complexCalculation(input);
}, [input]);

// 使用 useCallback 缓存函数
const handleInputChange = useCallback((value: string) => {
  // 处理逻辑
}, [dependency]);
```

### 3. 内存管理
```typescript
// 清理副作用
useEffect(() => {
  const timer = setInterval(() => {
    // 定时任务
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

通过这套完整的工具模块系统，Twinkle Tools 能够提供丰富、高效、可维护的在线工具服务，为用户的日常工作和学习提供便利。