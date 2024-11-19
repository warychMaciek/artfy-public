import { Box, Container, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, VStack } from "@chakra-ui/react"
import useGetEvents from "../../hooks/useGetEvents"
import EventPreview from "../../components/Events/EventPreview"
import Select from "react-select"
import { useState } from "react"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"

const Events = () => {
    const { isLoading, events, getMoreEvents, isLoadingMore, searchEvents, isSearching, showMoreButton } = useGetEvents()
    const [ inputs, setInputs ] = useState({
        location: "",
        startDate: "",
        endDate: "",
        type: ""
    })

    const handleSearch = e => {
        e.preventDefault()
        searchEvents(inputs)
    }

    const selectLocationsOptions = [
        {value: "all", label: "Wszystkie"},
        {value: "warszawa", label: "Warszawa"},
        {value: "krakow", label: "Kraków"},
        {value: "poznan", label: "Poznań"},
        {value: "wroclaw", label: "Wrocław"},
        {value: "lodz", label: "Łódź"},
        {value: "gdansk", label: "Gdańsk"},
        {value: "szczecin", label: "Szczecin"},
        {value: "bydgoszcz", label: "Bydgoszcz"},
        {value: "lublin", label: "Lublin"},
        {value: "bialystok", label: "Białystok"},
        {value: "katowice", label: "Katowice"},
    ]
    const selectEventType = [
        {value: "all", label: "Wszystkie"},
        {value: "workshops-for-photographers", label: "Warsztaty fotograficzne dla fotografów"},
        {value: "workshops-for-models", label: "Warsztaty fotograficzne dla modelek/i"},
        {value: "photo-training", label: "Szkolenie"},
        {value: "tfp-session", label: "Sesja TFP"},
        {value: "photo-meeting", label: "Spotkanie fotograficzne"},
    ]

    const selectStyles = {
        control: baseStyles => ({
            ...baseStyles,
            cursor: "pointer",
            borderRadius: "30px",
            border: "1px solid rgba(255, 255, 255, 0.75)",
            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
        }),
        container: baseStyles => ({
            ...baseStyles,
            width: "100%"
        }),
        placeholder: baseStyles => ({
            ...baseStyles,
            color: "#D90368",
            opacity: "0.5",
            textTransform: "uppercase",
            fontSize: "14px",
            lineHeight: "24px",
            fontFamily: "Oswald, sans-serif",
            fontWeight: "600",
            textAlign: "center"
        }),
        option: baseStyles => ({
            ...baseStyles,
            color: '#291720'
        }),
        singleValue: baseStyles => ({
            ...baseStyles,
            color: '#D90368'
        }),
        multiValue: baseStyles => ({
            ...baseStyles,
            backgroundColor: "#D90368",
            color: "#fff"
        }),
        multiValueLabel: baseStyles => ({
            ...baseStyles,
            backgroundColor: "#D90368",
            color: "#fff"
        })
    }

    const inputStyles = {
        borderRadius: "30px",
        border: "1px solid",
        borderColor: "textLight",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        color: "action",
    }
    const placeholderStyles = {
        color: "action",
        textTransform: "uppercase",
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: 600,
        fontFamily: "header",
        opacity: 0.5,
        textAlign: "center"
    }
    const labelStyles = {
        fontFamily: "header",
        color: "header",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "20px",
        margin: "0"
    }

    return (
        <Container
            maxW={1920} 
            bgColor={"backgroundSecondary"} 
            py={"80px"} 
            px={{ base: 4, xl: "100px" }}
            position={"relative"}
        >
            <Heading
                as="h1"
                fontFamily={"header"}
                color={"header"}
                fontWeight={700}
                fontSize={{ base: "32px", md: "45px" }}
                position={"relative"}
                textAlign={"center"}
                pb={"30px"}
                mb={"30px"}
                _after={{
                    content: "''",
                    width: "100%",
                    maxW: "514px",
                    height: "4px",
                    background: "linear-gradient(101.43deg, #D90368 0%, transparent 101.4%) #820263",
                    display: "block",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    left: "0",
                    margin: "0 auto"
                }}
            >
                Znajdź Event
            </Heading>
            <Box mb={"60px"} p={{ base: "20px", lg: "35px"}} borderRadius={"30px"} boxShadow={"0 10px 25px 0 rgba(0, 0, 0, 0.07)"} backgroundColor={"background"}>
                <form>
                    <Flex
                        flexDirection={{ base: "column", lg: "row" }}
                        gap={6}
                        alignItems={{ lg: "center" }}
                    >
                        <FormControl>
                            <Select 
                                options={selectLocationsOptions}
                                placeholder={"Lokalizacja"}
                                styles={selectStyles}
                                value={inputs.location}
                                onChange={e => setInputs(inputs => ({...inputs, location: e}))}
                                />
                        </FormControl>
                        <VStack gap={6}>
                            <FormControl display={"flex"} alignItems={"center"} gap={4}>
                                <FormLabel sx={labelStyles} flex={"60px"}>Początek</FormLabel>
                                <Input type="date" placeholder="Data początkowa" value={inputs.startDate} onChange={e => setInputs(inputs => ({...inputs, startDate: e.target.value}))} sx={inputStyles} _placeholder={placeholderStyles} />
                            </FormControl>
                            <FormControl display={"flex"} alignItems={"center"} gap={4}>
                                <FormLabel sx={labelStyles} flex={"60px"}>Koniec</FormLabel>
                                <Input type="date" placeholder="Data końcowa" value={inputs.endDate} onChange={e => setInputs(inputs => ({...inputs, endDate: e.target.value}))} sx={inputStyles} _placeholder={placeholderStyles} />
                            </FormControl>
                        </VStack>
                        <FormControl>
                            <Select 
                                options={selectEventType}
                                placeholder={"Typ eventu"}
                                styles={selectStyles}
                                value={inputs.type}
                                onChange={e => setInputs(inputs => ({...inputs, type: e}))}
                            />
                        </FormControl>
                        <ArtfyButton
                            gradientStyle={true} 
                            title={"Szukaj"}
                            isLoading={isSearching}
                            handleClick={handleSearch}
                        >
                            Szukaj
                        </ArtfyButton>
                    </Flex>
                </form>
            </Box>
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "35px", lg: "35px 75px" }}>
                {!isLoading && events !== null && events.length > 0 && events.map(
                    event => (
                        <GridItem key={event.id}><EventPreview event={event} /></GridItem>
                    )
                )}
            </Grid>
            {
                isLoadingMore ?
                    'loading more'
                :
                    events !== null && showMoreButton && <ArtfyButton isLoading={isLoadingMore} gradientStyle={true} title={"Pokaż więcej"} handleClick={getMoreEvents} addedStyles={{ display: "flex", margin: "60px auto 0"}} />
            }
            {!isLoading && events === null && <Heading fontFamily={"header"} fontSize={"24px"} textAlign={"center"}>Brak eventów spełniających podane kryteria wyszukiwania.</Heading>}
        </Container>
    )
}

export default Events