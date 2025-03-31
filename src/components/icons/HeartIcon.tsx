interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export default function HeartIcon({ className, ...props }: HeartIconProps) {
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      version="1.1"
      {...props}
    >
      <desc lang="en-US">A heart</desc>
      <path d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z" />
    </svg>
  )
} 