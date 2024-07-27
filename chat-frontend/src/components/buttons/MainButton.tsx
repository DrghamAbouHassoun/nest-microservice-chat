import { ButtonHTMLAttributes } from "react"
import { LuLoader2 } from 'react-icons/lu';

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const MainButton = (props: MainButtonProps) => {
  return (
    <button 
      {...props} 
      disabled={props.loading} 
      className={`bg-primary-300 text-white font-bold p-1 rounded hover:bg-primary-400 transition-colors ${props.className}`}
    >
      {props.loading? <LuLoader2 size={20} className="animate-spin" /> : props.children}
    </button>
  )
}

export default MainButton