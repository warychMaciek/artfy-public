import Footer from "./components/Footer/Footer"
import HomePage from "./pages/HomePage/HomePage"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import Navbar from "./components/Navbar/Navbar"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase/firebase"
import AddEvent from "./pages/AddEvent/AddEvent"
import Event from "./pages/Event/Event"
import Events from "./pages/Events/Events"
import { useEffect } from "react"
import { Heading } from "@chakra-ui/react"

function App() {
    const [authUser, loading] = useAuthState(auth)
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    if (!authUser && loading) return <h1>loading</h1>

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:username" element={<ProfilePage />} />
                <Route path="/add-event" element={authUser ? <AddEvent /> : <Navigate to="/" />} />
                <Route path="/event/:id" element={<Event />} />
                <Route path="/events" element={<Events />} />
                <Route path="/privacy-policy" element={<Page404 />} />
                <Route path="/disclaimer" element={<Page404 />} />
                <Route path="/terms-and-conditions" element={<Page404 />} />
                <Route path="/gdpr" element={<Page404 />} />
                <Route path="/contact" element={<Page404 />} />
                <Route path="/subscription" element={<Page404 />} />
            </Routes>
            <Footer />
        </>
    )
}
  
export default App

const Page404 = () => {
    return (
        <Heading
            my={20}
            textAlign="center"
            fontSize="3xl"
        >Strona w budowie</Heading>
    )
}