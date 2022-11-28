import { LoadingImg } from "../theme"
const loading = require("../theme/assets/loading.gif")

const Loading = () => {
  return <div>
    <LoadingImg src={loading} alt="loading..." />
  </div>
}

export default Loading