'use client'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const baseStyles = 'font-mazda font-bold rounded-md transition-all duration-200'

const variantStyles = {
  primary:
    'bg-mazda-burgundy text-white border-2 border-mazda-burgundy hover:bg-[#6B0820] hover:border-[#6B0820] active:bg-[#5A0718] active:border-[#5A0718] focus:outline-mazda-blue focus:outline-offset-2',
  secondary:
    'bg-white text-mazda-charcoal border-2 border-mazda-charcoal hover:bg-mazda-light-gray active:bg-[#E9ECEF] focus:outline-mazda-blue focus:outline-offset-2',
  ghost:
    'bg-transparent text-mazda-steel-gray border border-white/10 rounded-md hover:text-white hover:border-white/30 active:border-white/50',
  tertiary:
    'bg-transparent text-mazda-steel-gray border-0 hover:text-mazda-charcoal active:text-mazda-burgundy active:border-b-2 active:border-mazda-burgundy',
}

const sizeStyles = {
  sm: 'px-3 py-2 text-button text-sm',
  md: 'px-6 py-3 text-button',
  lg: 'px-8 py-4 text-button text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}
