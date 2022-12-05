import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const [isAddNote, setIsAddNote] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (window.localStorage.getItem('token'))
            dispatch(fetchAuthMe())
    }, [])

    return (
        <>
            <Header setIsAddNote={setIsAddNote}/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home isAddNote={isAddNote} setIsAddNote={setIsAddNote} />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="*" element={<h2>Страница не существует</h2>} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
