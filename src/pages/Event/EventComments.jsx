import { Heading, VStack } from "@chakra-ui/react"

const EventComments = () => {
    return (
        <VStack mt={8} alignItems={"flex-start"}>
            <Heading
                as={"h3"}
                fontFamily={"header"}
                color={"header"}
                fontSize={"20px"}
            >
                Pytania
            </Heading>
        </VStack>
    )
}

export default EventComments