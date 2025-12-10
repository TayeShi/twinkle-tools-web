'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import './PathDetector.scss';

interface PathDetectorProps {
  children: React.ReactNode;
  excludePaths: string[];
}

const PathDetector = ({ children, excludePaths }: PathDetectorProps) => {
  const pathname = usePathname();
  const shouldExclude = excludePaths.some(path => pathname.startsWith(path));
  
  return (
    <div className="path-detector">
      {!shouldExclude && <Header />}
      <main>{children}</main>
      {!shouldExclude && <Footer />}
    </div>
  );
};

export default PathDetector;