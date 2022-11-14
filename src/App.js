import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import AppContext from "./context/Appcontext";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/theme";
import { GlobalStyle } from "./style/GlobalStyle";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  const [selectedPost, setSelectedPost] = useState("");
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    async function fatch() {
      const { data: responsePostData } = await axios.get(
        "http://localhost:4000/post/all"
      );

      setPostData(responsePostData);
    }
    fatch();
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedPost,
        setSelectedPost,
        postData,
        openPost,
        setOpenPost,
        theme,
        setTheme,
        selectedTag,
        setSelectedTag,
      }}
    >
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
