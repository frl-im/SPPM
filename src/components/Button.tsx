'use client'

import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const baseStyles = 'inline-flex items-center justify-center font-mazda font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-mazda-burgundy to-[#7A0825] text-white border border-mazda-burgundy/50 shadow-md hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 focus:ring-mazda-burgundy/60',
  secondary:
    'bg-white text-mazda-charcoal border-2 border-mazda-charcoal/80 shadow-sm hover:bg-mazda-light-gray hover:border-mazda-burgundy hover:text-mazda-burgundy hover:-translate-y-0.5 active:translate-y-0 focus:ring-mazda-charcoal/30',
  ghost:
    'bg-white/5 text-mazda-steel-gray border border-white/15 backdrop-blur-md rounded-xl hover:bg-white/15 hover:text-white hover:border-white/40 active:border-white/60 focus:ring-white/30',
  tertiary:
    'bg-transparent text-mazda-steel-gray border-0 hover:text-mazda-charcoal active:text-mazda-burgundy underline-offset-4 hover:underline focus:ring-0',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-xs uppercase tracking-wider',
  md: 'px-6 py-3 text-sm tracking-wide',
  lg: 'px-8 py-4 text-base tracking-wide',
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
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed shadow-none hover:translate-y-0 hover:shadow-none' : ''
      } ${className}`}
    >
      {children}
    </button>
  )
}
