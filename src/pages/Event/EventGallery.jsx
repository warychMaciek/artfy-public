import { Box, Flex, Image } from "@chakra-ui/react"

const EventGallery = props => {
    const { photos } = props

    return (
        <Flex flexDirection={{ base: "column", md: "row" }} gap={{ base: 4, md: 6, lg: 8, "2xl": 16 }}>
            {photos.map((photo, index) => (
                (index !== 0 &&
                    <Box key={index} flex={1} overflow={"hidden"} borderRadius={"42px"} w={"full"} maxH={"600px"}>
                        <Image src={photo} objectFit={"cover"} h={"100%"} w={"100%"} />
                    </Box>
                )
            ))}
        </Flex>
    )
}

export default EventGallery