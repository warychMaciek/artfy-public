import { Container, Grid, GridItem, Text } from "@chakra-ui/react"
import { collection, getCountFromServer } from "firebase/firestore"
import { firestore } from "../../firebase/firebase"
import { useEffect, useState } from "react"

const Numbers = () => {
    const [ counts, setCounts ] = useState({})

    const getCollectionsCounts = async () => {
        const usersSnapshot = await getCountFromServer(collection(firestore, "users"))
        const eventsSnapshot = await getCountFromServer(collection(firestore, "events"))
        const imagesSnapshot = await getCountFromServer(collection(firestore, "images"))
        const usersCount = usersSnapshot.data().count
        const eventsCount = eventsSnapshot.data().count
        const imagesCount = imagesSnapshot.data().count

        setCounts({
            users: usersCount,
            events: eventsCount,
            images: imagesCount
        })
    }

    useEffect(() => {
        getCollectionsCounts()
    }, [])

    return (
        <Container 
            maxW={1920} 
            bg={"linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)"}
            py={"50px"}
        >
            <Grid mx={"auto"} maxW={"1240px"} templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }} gap={"30px"}>
                <GridItem
                    textAlign={"center"}
                >
                    <Text
                        color={"background"}
                        fontFamily={"header"}
                        fontWeight={700}
                        fontSize={"45px"}
                        lineHeight={"59px"}
                        position={"relative"}
                        display={"inline-block"}
                        _before={{
                            content: "'+'",
                            fontFamily: "header",
                            color: "background",
                            opacity: "0.75",
                            fontSize: "18px",
                            lineHeight: "27px",
                            fontWeight: "700",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            transform: "translateX(200%)"
                        }}
                    >
                        {counts.users}
                    </Text>
                    <Text
                        color={"background"}
                        opacity={"0.75"}
                        fontFamily={"header"}
                        fontSize={"20px"}
                        lineHeight={"29px"}
                        fontWeight={700}
                        mt={2}
                    >
                        Użytkowników
                    </Text>
                </GridItem>
                <GridItem
                    textAlign={"center"}
                >
                    <Text
                        color={"background"}
                        fontFamily={"header"}
                        fontWeight={700}
                        fontSize={"45px"}
                        lineHeight={"59px"}
                        position={"relative"}
                        display={"inline-block"}
                        _before={{
                            content: "'+'",
                            fontFamily: "header",
                            color: "background",
                            opacity: "0.75",
                            fontSize: "18px",
                            lineHeight: "27px",
                            fontWeight: "700",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            transform: "translateX(200%)"
                        }}
                    >
                        {counts.events}
                    </Text>
                    <Text
                        color={"background"}
                        opacity={"0.75"}
                        fontFamily={"header"}
                        fontSize={"20px"}
                        lineHeight={"29px"}
                        fontWeight={700}
                        mt={2}
                    >
                        Eventów
                    </Text>
                </GridItem>
                <GridItem
                    textAlign={"center"}
                >
                    <Text
                        color={"background"}
                        fontFamily={"header"}
                        fontWeight={700}
                        fontSize={"45px"}
                        lineHeight={"59px"}
                        position={"relative"}
                        display={"inline-block"}
                        _before={{
                            content: "'+'",
                            fontFamily: "header",
                            color: "background",
                            opacity: "0.75",
                            fontSize: "18px",
                            lineHeight: "27px",
                            fontWeight: "700",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            transform: "translateX(200%)"
                        }}
                    >
                        {counts.images}
                    </Text>
                    <Text
                        color={"background"}
                        opacity={"0.75"}
                        fontFamily={"header"}
                        fontSize={"20px"}
                        lineHeight={"29px"}
                        fontWeight={700}
                        mt={2}
                    >
                        Zdjęć
                    </Text>
                </GridItem>
                <GridItem
                    textAlign={"center"}
                >
                    <Text
                        color={"background"}
                        fontFamily={"header"}
                        fontWeight={700}
                        fontSize={"45px"}
                        lineHeight={"59px"}
                        position={"relative"}
                        display={"inline-block"}
                        _before={{
                            content: "'+'",
                            fontFamily: "header",
                            color: "background",
                            opacity: "0.75",
                            fontSize: "18px",
                            lineHeight: "27px",
                            fontWeight: "700",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            transform: "translateX(200%)",
                            display: "none"
                        }}
                    >
                        {"<1"}
                    </Text>
                    <Text
                        color={"background"}
                        opacity={"0.75"}
                        fontFamily={"header"}
                        fontSize={"20px"}
                        lineHeight={"29px"}
                        fontWeight={700}
                        mt={2}
                    >
                        Rok działalności
                    </Text>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Numbers