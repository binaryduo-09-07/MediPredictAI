import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SymptomGrid from "./components/SymptomGrid";
import ChatDoctor from "./components/ChatDoctor";

function App() {

  return (

    <div
      className="
                bg-[#050816]
                min-h-screen
                text-white
                overflow-x-hidden
            "
    >

      <Navbar />

      <Hero />

      <Features />

      <SymptomGrid />

      <ChatDoctor />

    </div>
  );
}

export default App;
