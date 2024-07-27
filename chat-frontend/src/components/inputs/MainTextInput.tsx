import { InputHTMLAttributes } from "react"

interface MainTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: {
    text: string;
    htmlFor: string;
  },
  error?: string;
}

const MainTextInput = (props: MainTextInputProps) => {
  return (
    <>
      {props.label ? <label
        htmlFor={props.label.htmlFor}
        className="block text-gray-700 text-sm font-medium mb-2"
      >{props.label.text}</label>: null}
      <input 
        {...props}
        className={`w-full rounded border-gray-200 shadow p-1 ${props.className}`}
      />
      {props.error ? <p className="text-red-600">{props.error}</p> : null}
    </>
  )
}

export default MainTextInput