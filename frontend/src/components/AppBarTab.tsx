
import { useNavigate } from "react-router-dom";
const AppBarTab = ({ title, to }: { title: string, to: string }) => {
  const navigate = useNavigate()

  
  
  return (
    <div>
    <button onClick={() => navigate(to)}>{title}</button>
  </div>
)
}

export default AppBarTab