import React, { ReactNode } from 'react'
import { Button as ButtonMantine, ButtonProps } from '@mantine/core'
import style from './styles.module.scss'
interface Props extends ButtonProps {
  text?: string;
  className?: string;
  children?:ReactNode;
}
//children is created to add icon heart to build component add to wishlist by icon 
const Button = ({ children,className, variant, text, color, ...props }: Props) => {

  return (
    <div className={className}>
      <ButtonMantine  color={color} variant={variant} {...props} className={style.btn}>
        {text}
        {children}
      </ButtonMantine>
    </div>
  )
}

export default Button
