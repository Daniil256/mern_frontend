import Container from "@mui/material/Container";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/posts/:id/edit" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
