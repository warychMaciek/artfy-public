import { useParams } from "react-router-dom"
import useGetEventById from "../../hooks/useGetEventById"
import { Container, Flex } from "@chakra-ui/react"
import EventMain from "./EventMain"
import EventSide from "./EventSide"
import EventGallery from "./EventGallery"
import EventComments from "./EventComments"

const Event = () => {
    const { id } = useParams()
    const { isLoading, event } = useGetEventById(id)

    const eventNotFound = !isLoading && !event
    if (eventNotFound) return <h1>Brak eventu</h1>

    return (
        <Container
            maxW={1920} 
            bgColor={"background"} 
            py={"80px"} 
            px={{ base: 4, xl: "100px" }}
            position={"relative"}
        >
            <Flex flexDirection={{ base: "column", lg: "row" }} gap={{ base: 4, md: 6, lg: 10, "2xl": 20 }} mb={{ base: 4, md: 6, lg: 10, "2xl": 20 }}>
                { !isLoading && event && (
                    <EventMain
                        createdAt={event.createdAt}
                        title={event.title}
                        description={event.desc}
                        type={event.type.label}
                        startDate={event.startDate}
                        startTime={event.startTime}
                        endDate={event.endDate}
                        endTime={event.endTime}
                        location={event.location.label}
                        address={event.address}
                        contributorsIds={event.contributors}
                        scope={event.scope}
                        addressURL={event.addressURL}
                    />
                ) }
                { !isLoading && event && (
                    <EventSide 
                        photo={event.photos[0]}
                        price={event.price}
                        participantsIds={event.participants}
                        slots={event.slots}
                        eventId={event.uid}
                    />
                ) }
            </Flex>
            { !isLoading && event && event.photos.length > 1 && (
                <EventGallery photos={event.photos} />
            ) }
            { !isLoading && event && <EventComments /> }
        </Container>
    )
}

export default Event