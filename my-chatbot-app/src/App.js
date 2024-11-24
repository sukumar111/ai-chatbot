import SignInSide from "./sign-in-side/SignInSide";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./sign-up/SignUp";
import Chatbot from "./chat-bot/Chatbot";
// import AssetsChatbot from "./chat-bot/AssetsChatbot";
function App() {
  return (
   <Router>
      <Routes>
      <Route path="/" element={<SignInSide />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chatbot" element={<Chatbot />} />
        {/* <Route path="/asschatbot" element={<AssetsChatbot />} /> */}
      </Routes>
    </Router>
  )
}

export default App;
