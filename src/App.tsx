import './App.css';
import Layout from './Components/Layout/Layout';

function App() {
  return (
    <div className={`flex justify-center dark:bg-[#161722] bg-[#f9f9f9] min-h-screen py-10 md:py-[68px] px-6 font-josefin
      dark:bg-[url("/src/assets/images/bg-mobile-dark.jpg")] dark:md:bg-[url("/src/assets/images/bg-desktop-dark.jpg")]
      bg-[url("/src/assets/images/bg-mobile-light.jpg")] md:bg-[url("/src/assets/images/bg-desktop-light.jpg")]
      bg-[length:100%_auto] bg-no-repeat transition-all`}>
      <Layout />
    </div>
  )
}

export default App
