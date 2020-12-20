import './App.css';
import Layout from "./components/Layout"
import NavBar from "./components/UI/NavBar"
import Footer from "./components/UI/Footer"
import AppContextProvider from "./AppContext"

const App = () => {
    return (
        <div id="App">
            <AppContextProvider >
                <NavBar />
                <div id="main">
                    <Layout />
                </div>
                <Footer />
            </AppContextProvider>
        </div>
    );
}

export default App;
