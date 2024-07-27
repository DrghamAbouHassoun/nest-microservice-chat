import React, { InputHTMLAttributes } from 'react'

interface ChatTextInputProps extends InputHTMLAttributes<HTMLInputElement> {};

const ChatTextInput = (props: ChatTextInputProps) => {
  return (
    <input {...props} className={`bg-mixed-300 text-white placeholder:text-gray-400 p-2 flex-1 rounded shadow ${props.className}`} />
  )
}

export default ChatTextInput