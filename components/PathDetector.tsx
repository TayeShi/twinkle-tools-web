'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface PathDetectorProps {
  children: React.ReactNode;
  excludePaths: string[];
}

const PathDetector = ({ children, excludePaths }: PathDetectorProps) => {
  const pathname = usePathname();
  const shouldExclude = excludePaths.some(path => pathname.startsWith(path));
  
  return (
    <>
      {!shouldExclude && <Header />}
      {children}
      {!shouldExclude && <Footer />}
    </>
  );
};

export default PathDetector;