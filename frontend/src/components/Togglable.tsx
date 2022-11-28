import { useState } from 'react'
import { Button, SecondryButton } from "../theme/message"

interface Props {
  children: JSX.Element
  buttonLabel: string
}

const Togglable = ({ children, buttonLabel }: Props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <SecondryButton onClick={toggleVisibility}>Cancel</SecondryButton>
      </div>
    </div>
  )
}

export default Togglable