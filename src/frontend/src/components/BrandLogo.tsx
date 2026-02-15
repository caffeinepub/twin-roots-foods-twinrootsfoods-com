import { useLogoBounceKey } from '../hooks/useLogoBounceKey';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const bounceKey = useLogoBounceKey();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <img
      key={bounceKey}
      src="/assets/generated/logo-v5.dim_512x512.png"
      alt="Twin Roots Foods"
      className={`animate-logo-bounce object-contain ${sizeClasses[size]} ${className}`}
    />
  );
}
