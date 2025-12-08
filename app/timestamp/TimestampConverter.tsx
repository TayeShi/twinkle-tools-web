'use client';

import { useState } from 'react';
import './TimestampConverter.scss';

interface TimeUnitOption {
  label: string;
  value: 'ms' | 's';
}

interface TimeZoneOption {
  label: string;
  value: string;
}

const TimeUnitOptions: TimeUnitOption[] = [
  { label: '毫秒(ms)', value: 'ms' },
  { label: '秒(s)', value: 's' },
];

const TimeZoneOptions: TimeZoneOption[] = [
  { label: 'Asia/Shanghai', value: 'Asia/Shanghai' },
  { label: 'UTC', value: 'UTC' },
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Europe/London', value: 'Europe/London' },
];

export default function TimestampConverter() {
  // 获取当前时间
  const now = new Date();
  
  // 格式化当前时间为 YYYY-MM-DD HH:mm:ss 格式
  const formatCurrentDateTime = () => {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 初始化计算当前时间的转换结果
  const initialTimestampResult = () => {
    try {
      const formatter = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Shanghai',
      });
      return formatter.format(now);
    } catch {
      return '';
    }
  };

  const initialDatetimeResult = () => {
    try {
      const timestamp = now.getTime();
      return timestamp.toString();
    } catch {
      return '';
    }
  };

  // 时间戳转日期时间
  const [timestampInput, setTimestampInput] = useState(now.getTime().toString());
  const [timestampUnit, setTimestampUnit] = useState<'ms' | 's'>('ms');
  const [timestampTimeZone, setTimestampTimeZone] = useState('Asia/Shanghai');
  const [timestampResult, setTimestampResult] = useState(initialTimestampResult());

  // 日期时间转时间戳
  const [datetimeInput, setDatetimeInput] = useState(formatCurrentDateTime());
  const [datetimeTimeZone, setDatetimeTimeZone] = useState('Asia/Shanghai');
  const [datetimeUnit, setDatetimeUnit] = useState<'ms' | 's'>('ms');
  const [datetimeResult, setDatetimeResult] = useState(initialDatetimeResult());

  // 时间戳转日期时间
  const handleTimestampConvert = () => {
    try {
      let timestamp = Number(timestampInput);
      if (timestampUnit === 's') {
        timestamp *= 1000;
      }
      const date = new Date(timestamp);
      const formatter = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timestampTimeZone,
      });
      setTimestampResult(formatter.format(date));
    } catch {
      setTimestampResult('转换失败，请输入有效的时间戳');
    }
  };

  // 日期时间转时间戳
  const handleDatetimeConvert = () => {
    try {
      const date = new Date(datetimeInput);
      let timestamp = date.getTime();
      if (datetimeUnit === 's') {
        timestamp = Math.floor(timestamp / 1000);
      }
      setDatetimeResult(timestamp.toString());
    } catch {
      setDatetimeResult('转换失败，请输入有效的日期时间');
    }
  };

  return (
    <div className="timestamp-converter">
      {/* 时间戳转日期时间 */}
      <div className="converter-section">
        <h3>时间戳转日期时间</h3>
        <div className="converter-form">
          <input
            type="text"
            placeholder="请输入时间戳"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            className="converter-input"
          />
          <select
            value={timestampUnit}
            onChange={(e) => setTimestampUnit(e.target.value as 'ms' | 's')}
            className="converter-select"
          >
            {TimeUnitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={handleTimestampConvert} className="converter-button">
            转换
          </button>
          <input
            type="text"
            placeholder="转换结果"
            value={timestampResult}
            readOnly
            className="converter-result"
          />
          <select
            value={timestampTimeZone}
            onChange={(e) => setTimestampTimeZone(e.target.value)}
            className="converter-select"
          >
            {TimeZoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 日期时间转时间戳 */}
      <div className="converter-section">
        <h3>日期时间转时间戳</h3>
        <div className="converter-form">
          <input
            type="text"
            placeholder="YYYY-MM-DD HH:mm:ss"
            value={datetimeInput}
            onChange={(e) => setDatetimeInput(e.target.value)}
            className="converter-input"
          />
          <select
            value={datetimeTimeZone}
            onChange={(e) => setDatetimeTimeZone(e.target.value)}
            className="converter-select"
          >
            {TimeZoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={handleDatetimeConvert} className="converter-button">
            转换
          </button>
          <input
            type="text"
            placeholder="转换结果"
            value={datetimeResult}
            readOnly
            className="converter-result"
          />
          <select
            value={datetimeUnit}
            onChange={(e) => setDatetimeUnit(e.target.value as 'ms' | 's')}
            className="converter-select"
          >
            {TimeUnitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
