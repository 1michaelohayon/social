import React, { TextareaHTMLAttributes, useState } from "react"
export const useField = (type: string) => {
  const [value, setValue] = useState<string>('')
  const onChange = (event: React.FormEvent<HTMLInputElement> |  React.FormEvent<HTMLTextAreaElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  const reset = () => setValue("")
  return {
    reset: reset,
    input: {
      type,
      value,
      onChange,

    }
  }
}
export default useField

