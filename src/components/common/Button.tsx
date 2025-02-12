interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  title?: string
}

export function Button({ children, onClick, variant = 'primary', title }: ButtonProps) {
  const baseStyles = 'flex h-[3.2rem] items-center justify-center rounded-[0.8rem] px-[1.1rem] py-0 font-bold transition duration-300'
  const variantStyles = {
    primary: 'border-2 border-solid border-[#ddd] bg-[#ddd] text-[#666] hover:bg-white',
    secondary: 'border-2 border-solid border-[#d1d1d1] text-[#767676] hover:bg-white',
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick} title={title}>
      {children}
    </button>
  )
}
