import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Posts from "./features/posts/Posts.tsx";
import FullPost from "./features/posts/FullPost.tsx";
import NewPost from "./features/posts/NewPost.tsx";


const App = () => {

  return (
    <>
        <CssBaseline />
        <ToastContainer/>
        <header>
            <AppToolbar/>
        </header>
        <main>
          <Container maxWidth="xl">
              <Routes>
                  <Route path="/" element={<Posts/>}/>
                  <Route path="/posts" element={<Posts/>}/>
                  <Route path="/posts/:id" element={<FullPost/>}/>
                  <Route path="/posts/new" element={<NewPost/>}/>
                  <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
              </Routes>
          </Container>
        </main>
    </>
  )
};

export default App
