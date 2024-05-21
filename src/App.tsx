import { Provider } from "react-redux";
import { store } from "./store";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Feed from "./components/Feed";

function App() {
  return (
    <Provider store={store}>
      <Background />
      <Header />
      <Feed />
      <Footer />
    </Provider>
  );
}

export default App;
