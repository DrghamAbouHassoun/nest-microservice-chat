import React, { FormHTMLAttributes } from 'react'

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {}

const AuthForm = (props: AuthFormProps) => {
  return (
    <form 
      {...props}
      className={`w-full max-w-[500px] rounded shadow p-4 ${props.className}`}
    />
  )
}

export default AuthForm