import { Container, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react"
import { services } from "./servicesData"
import Brain from "../../assets/icons/brain.svg?react"
import Comments from "../../assets/icons/comments.svg?react"
import Laptop from "../../assets/icons/laptop.svg?react"
import LineChart from "../../assets/icons/line-chart.svg?react"
import Pen from "../../assets/icons/pen.svg?react"
import Video from "../../assets/icons/video.svg?react"
import ArtfyLink from "../../components/ArtfyButton/ArtfyLink"

const Services = () => {
    return (
        <Container maxW={1920} bgColor={"backgroundSecondary"} py={"100px"} px={{ base: 4, xl: "100px" }}>
            <VStack alignItems={"center"} spacing={4}>
                <Heading 
                    as="h4" 
                    fontFamily={"header"} 
                    color={"actionSecondary"}
                    textTransform={"uppercase"}
                    fontSize={"14px"}
                    fontWeight={600}
                    position={"relative"}
                    w={"100%"}
                    textAlign={"center"}
                    _before={{ 
                        content: "''", 
                        display: "block", 
                        position: "absolute", 
                        width: { base: "25px", lg: "40px"}, 
                        height: { base: "25px", lg: "40px"},
                        borderRadius: "50%",
                        top: "-30px",
                        left: "25%",
                        border: "2px solid",
                        borderColor: "actionSecondary",
                        zIndex: "1",
                        transform: "translateY(-35%)"
                    }}
                    _after={{ 
                        content: "''", 
                        display: "block", 
                        position: "absolute", 
                        width: { base: "25px", lg: "40px"}, 
                        height: { base: "25px", lg: "40px"},
                        borderRadius: "50%",
                        top: "-30px",
                        left: "25%",
                        backgroundColor: "decorativeSecondary",
                        border: "2px solid",
                        borderColor: "decorativeSecondary",
                    }}
                >
                    What we do
                </Heading>
                <Heading
                    as="h2"
                    fontFamily={"header"}
                    color={"header"} 
                    fontSize={{ base: "32px", md: "45px" }}
                    mb={10}
                    textAlign={"center"}
                >
                    Co Oferuje Strona <Text display={"inline"} color={"actionSecondary"} textTransform={"uppercase"}>Art</Text><Text display={"inline"} color={"action"} textTransform={"uppercase"}>fy</Text>
                </Heading>
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }} gap={{ base: "15px", md: "30px"}}>
                    {services.map((service, index) => (
                        <GridItem 
                            key={index}
                            bgColor={"background"}
                            borderRadius={"30px"}
                            p={{ base: "20px", md: "35px"}}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            flexDir={"column"}
                            gap={"25px"}
                        >
                            <SingleService icon={service.icon} title={service.title} desc={service.desc} url={service.url} buttonTitle={service.buttonTitle} />
                        </GridItem>
                    ))}
                </Grid>
            </VStack>
        </Container>
    )
}

export default Services

const SingleService = ({ icon, title, desc, url, buttonTitle }) => {
    let Icon
    switch (icon) {
        case 'brain':
            Icon = Brain
            break
        case 'comments':
            Icon = Comments
            break
        case 'laptop':
            Icon = Laptop
            break
        case 'line-chart':
            Icon = LineChart
            break
        case 'pen':
            Icon = Pen
            break
        case 'video':
            Icon = Video
            break
    }

    return (
        <>
            <Icon />
            <Heading as="h3" fontFamily={"header"} fontSize={"25px"} fontWeight={700} color={"header"} textAlign={"center"}>{title}</Heading>
            <Text fontSize={"17px"} color={"text"} textAlign={"center"}>{desc}</Text>
            {/* <ArtfyLink title={buttonTitle} gradientStyle={true} url={url} withIcon={true} /> */}
        </>
    )
}