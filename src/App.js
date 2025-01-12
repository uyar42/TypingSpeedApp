import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Input from "./components/Input";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen bg-slate-200">
      <Header />
      <Main />
      <Input />
    {/* <Footer /> */}
    </div>
  );
}

export default App;
