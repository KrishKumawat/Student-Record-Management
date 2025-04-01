import MainRouter from "./routes/router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <MainRouter />
      <Toaster />
    </div>
  )
}

export default App