import { Metadata } from 'next';
import TimestampConverter from './TimestampConverter';
import './page.scss';

export const metadata: Metadata = {
  title: '时间戳转换工具 - Twinkle Tools',
  description: '在线时间戳转换工具，支持时间戳转日期时间和日期时间转时间戳，支持多种时区和时间单位',
  keywords: ['时间戳转换', '时间戳转日期', '日期转时间戳', 'timestamp converter'],
};

export default function TimestampPage() {
  return (
    <div className="timestamp-page">
      <div className="container">
        <h1>时间戳转换工具</h1>
        <p>在线时间戳转换工具，支持时间戳与日期时间之间的双向转换</p>
        <TimestampConverter />
      </div>
    </div>
  );
}
