import { Avatar, Box, Button, Container, Flex, FormControl, FormLabel, Image, Input, Text, Textarea, VStack, useDisclosure } from "@chakra-ui/react"
import Select from "react-select"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"
import { useEffect, useState } from "react"
import AddEventPhoto from "../../components/Event/AddEventPhoto"
import useAddEvent from "../../hooks/useAddEvent"
import { DeleteIcon } from "@chakra-ui/icons"
import SearchUser from "../../components/SearchUser/SearchUser"

const AddEvent = () => {
    const [ inputs, setInputs ] = useState({
        title: "",
        price: "",
        desc: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        location: "",
        address: "",
        addressURL: "",
        scope: "",
        type: "",
        slots: "",
        contributors: [],
    })
    const [ images, setImages ] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading, addEvent } = useAddEvent()
    const {
        isOpen: isSearchOpen,
        onOpen: onSearchOpen,
        onClose: onSearchClose
    } = useDisclosure()
    const [ contributors, setContributors ] = useState([])
    const [ errors, setErrors ] = useState({})

    const saveEventImage = image => {
        setImages(images => ([...images, image]))
    }

    const removeEventImage = imageToRemove => {
        setImages(images => images.filter( (_, index) => index !== imageToRemove ))
    }

    const addEventContributor = user => {
        setInputs(inputs => ({...inputs, contributors: [...inputs.contributors, user.uid]}))
        setContributors(contributors => ([ ...contributors, {
            uid: user.uid,
            fullName: user.fullName,
            image: user.profilePicURL
        } ]))
    }

    const removeEventContributor = userId => {
        setInputs(inputs => ({
            ...inputs, 
            contributors: inputs.contributors.filter(contributor => contributor !== userId)
        }))
        setContributors(contributors => contributors.filter(contributor => contributor.uid !== userId))
    }

    const validateForm = () => {
        let isValid = true
        let errors = {}

        if (!inputs.title.trim()) {
            isValid = false
            errors.title = "Tytuł jest wymagany"
        } else if (inputs.title.length > 100) {
            isValid = false
            errors.title = "Tytuł nie może przekraczać 100 znaków"
        }

        if (!inputs.price.trim()) {
            isValid = false
            errors.price = "Cena jest wymagana"
        } else {
            const priceValue = parseFloat(inputs.price)

            if (isNaN(priceValue) || priceValue > 99999.99) {
                isValid = false
                errors.price = "Niepoprawna cena lub przekroczono limit (99999.99)"
            } else if (!/^\d{1,5}(\.\d{1,2})?$/.test(inputs.price)) {
                isValid = false
                errors.price = "Niepoprawny format ceny"
            }
        }

        if (!inputs.desc.trim()) {
            isValid = false
            errors.desc = "Opis jest wymagany"
        } else if (inputs.desc.length > 500) {
            isValid = false
            errors.desc = "Opis nie może przekraczać 500 znaków"
        }

        if (!inputs.startDate.trim()) {
            isValid = false
            errors.startDate = "Data rozpoczęcia jest wymagana"
        }

        if (!inputs.startTime.trim()) {
            isValid = false
            errors.startTime = "Godzina rozpoczęcia jest wymagana"
        }

        if (!inputs.endDate.trim()) {
            isValid = false
            errors.endDate = "Data zakończenia jest wymagana"
        }

        if (!inputs.endTime.trim()) {
            isValid = false
            errors.endTime = "Godzina zakończenia jest wymagana"
        }

        if (!inputs.location) {
            isValid = false
            errors.location = "Lokalizacja jest wymagana"
        }

        if (!inputs.address.trim()) {
            isValid = false
            errors.address = "Adres jest wymagany"
        } else if (inputs.address.length > 100) {
            isValid = false
            errors.address = "Adres nie może przekraczać 100 znaków"
        }

        if (inputs.addressURL.trim() && !(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(inputs.addressURL))) {
            isValid = false
            errors.addressURL = "Niepoprawny format adresu URL"
        }

        if (!inputs.scope) {
            isValid = false
            errors.scope = "Zakres jest wymagany"
        }

        if (!inputs.type) {
            isValid = false
            errors.type = "Rodzaj eventu jest wymagany"
        }

        if (!inputs.slots) {
            isValid = false
            errors.slots = "Liczba miejsc jest wymagana"
        }

        setErrors(errors)
        return isValid
    }

    const handleAddEvent = () => {
        if (validateForm()) {
            addEvent(inputs, images)
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            document.querySelector(".error").scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [errors])

    const selectLocationsOptions = [
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
        {value: "workshops-for-photographers", label: "Warsztaty fotograficzne dla fotografów"},
        {value: "workshops-for-models", label: "Warsztaty fotograficzne dla modelek/i"},
        {value: "photo-training", label: "Szkolenie"},
        {value: "tfp-session", label: "Sesja TFP"},
        {value: "photo-meeting", label: "Spotkanie fotograficzne"},
    ]
    const selectSlotesOptions = [
        {value: "1", label: "1"},
        {value: "2", label: "2"},
        {value: "3", label: "3"},
        {value: "4", label: "4"},
        {value: "5", label: "5"}
    ]
    const selectScopeOptions = [
        {value: 'portret', label: 'Portret'},
        {value: 'beauty', label: 'Beauty'},
        {value: 'glamour', label: 'Glamour'},
        {value: 'akt', label: 'Akt'},
        {value: 'nagosc-zakryta', label: 'Nagość zakryta'},
        {value: 'fashion', label: 'Fashion'},
        {value: 'stylizacja', label: 'Stylizacja'},
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
        fontSize: "20px",
        lineHeight: "29px"
    }
    const errorStyles = {
        color: "red",
        fontSize: "14px",
        marginTop: "4px"
    }

    return (
        <Container
            maxW={1920}
            py={"80px"}
            px={{ base: 4, xl: "100px" }}
        >
            <form>
                <VStack
                    gap={{ base: 8, md: "35px" }}
                >
                    <VStack
                        w={"full"}
                        gap={{ base: 8, md: "20px" }}
                        boxShadow={{ base: "none", sm: "0 10px 25px 0 rgba(0, 0, 0, 0.07)" }}
                        padding={{ base: "0", sm: "35px" }}
                        borderRadius={{ base: "0", sm: "30px" }}
                    >
                        <Flex
                            flexDirection={{ base: "column", md: "row" }}
                            w={"full"}
                            gap={8}
                        >
                            <FormControl flex={{ base: "1", md: "3" }}>
                                <FormLabel sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Tytuł</FormLabel>
                                <Input 
                                    placeholder="Treść" 
                                    type="text"
                                    value={inputs.title}
                                    onChange={e => setInputs(inputs => ({...inputs, title: e.target.value}))}
                                    sx={inputStyles}
                                    _placeholder={placeholderStyles}
                                />
                                {errors.title && <Text sx={errorStyles} className="error">{errors.title}</Text>}
                            </FormControl>
                            <FormControl flex={1}>
                                <FormLabel sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Cena</FormLabel>
                                <Input
                                    placeholder="Wpisz cenę"
                                    type="number"
                                    value={inputs.price}
                                    onChange={e => setInputs(inputs => ({...inputs, price: e.target.value}))}
                                    sx={inputStyles}
                                    _placeholder={placeholderStyles}
                                />
                                {errors.price && <Text sx={errorStyles} className="error">{errors.price}</Text>}
                            </FormControl>
                        </Flex>
                        <FormControl>
                            <FormLabel sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Opis</FormLabel>
                            <Textarea 
                                placeholder="Treść (max 500 znaków)" 
                                value={inputs.desc}
                                onChange={e => setInputs(inputs => ({...inputs, desc: e.target.value}))}
                                resize={"none"}
                                sx={inputStyles}
                                _placeholder={placeholderStyles}
                                minHeight={"140px"}
                            />
                            {errors.desc && <Text sx={errorStyles} className="error">{errors.desc}</Text>}
                        </FormControl>
                    </VStack>
                    <Flex
                        flexDirection={{ base: "column", xl: "row" }}
                        gap={8}
                        w={"full"}
                    >
                        <VStack 
                            gap={{ base: 8, md: "20px" }}
                            boxShadow={{ base: "none", sm: "0 10px 25px 0 rgba(0, 0, 0, 0.07)" }}
                            padding={{ base: "0", sm: "35px" }}
                            borderRadius={{ base: "0", sm: "30px" }}
                            flex={{ xl: 1 }}
                        >
                            <Text sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Rozpoczęcie</Text>
                            <FormControl display={"flex"} alignItems={"center"} gap={4}>
                                <FormLabel sx={labelStyles} flex={{ base: 1, xl: "unset" }} margin={0}>Data</FormLabel>
                                <Box flex={1}>
                                    <Input 
                                        placeholder="Wybierz"
                                        type="date"
                                        value={inputs.startDate}
                                        cursor={"pointer"}
                                        onChange={e => setInputs(inputs => ({...inputs, startDate: e.target.value}))}
                                        sx={inputStyles}
                                        _placeholder={placeholderStyles}
                                    />
                                    {errors.startDate && <Text sx={errorStyles} className="error">{errors.startDate}</Text>}
                                </Box>
                            </FormControl>
                            <FormControl display={"flex"} alignItems={"center"} gap={4}>
                                <FormLabel sx={labelStyles} flex={{ base: 1, xl: "unset" }} margin={0}>Godzina</FormLabel>
                                <Box flex={1}>
                                    <Input
                                        placeholder="Wybierz"
                                        type="time"
                                        cursor={"pointer"}
                                        value={inputs.startTime}
                                        onChange={e => setInputs(inputs => ({...inputs, startTime: e.target.value}))}
                                        sx={inputStyles}
                                        _placeholder={placeholderStyles}
                                        />
                                    {errors.startTime && <Text sx={errorStyles} className="error">{errors.startTime}</Text>}
                                </Box>
                            </FormControl>
                        </VStack>
                        <VStack
                            gap={{ base: 8, md: "20px" }}
                            boxShadow={{ base: "none", sm: "0 10px 25px 0 rgba(0, 0, 0, 0.07)" }}
                            padding={{ base: "0", sm: "35px" }}
                            borderRadius={{ base: "0", sm: "30px" }}
                            flex={{ xl: 1 }}
                        >
                            <Text sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Zakończenie</Text>
                            <FormControl display={"flex"} alignItems={"center"} gap={4}>
                                <FormLabel sx={labelStyles} flex={{ base: 1, xl: "unset" }} margin={0}>Data</FormLabel>
                                <Box flex={1}>
                                    <Input 
                                        type="date"
                                        cursor={"pointer"}
                                        value={inputs.endDate}
                                        onChange={e => setInputs(inputs => ({...inputs, endDate: e.target.value}))}
                                        sx={inputStyles}
                                    />
                                    {errors.endDate && <Text sx={errorStyles} className="error">{errors.endDate}</Text>}
                                </Box>
                            </FormControl>
                            <FormControl display={"flex"} alignItems={"center"} gap={4}>
                                <FormLabel sx={labelStyles} flex={{ base: 1, xl: "unset" }} margin={0}>Godzina</FormLabel>
                                <Box flex={1}>
                                    <Input
                                        type="time"
                                        cursor={"pointer"}
                                        value={inputs.endTime}
                                        onChange={e => setInputs(inputs => ({...inputs, endTime: e.target.value}))}
                                        sx={inputStyles}
                                    />
                                    {errors.endTime && <Text sx={errorStyles} className="error">{errors.endTime}</Text>}
                                </Box>
                            </FormControl>
                        </VStack>
                        <VStack
                            gap={{ base: 8, md: "20px" }}
                            boxShadow={{ base: "none", sm: "0 10px 25px 0 rgba(0, 0, 0, 0.07)" }}
                            padding={{ base: "0", sm: "35px" }}
                            borderRadius={{ base: "0", sm: "30px" }}
                            flex={{ xl: 2 }}
                        >
                            <Text sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Lokalizacja</Text>
                            <Flex
                                flexDirection={{ base: "column", md: "row" }}
                                w={"full"}
                                gap={{ base: 8, md: "20px" }}
                            >
                                <FormControl>
                                    <Select
                                        options={selectLocationsOptions}
                                        placeholder={"Miasto (wybierz z listy)"}
                                        styles={selectStyles}
                                        value={inputs.location}
                                        onChange={e => setInputs(inputs => ({...inputs, location: e}))}
                                    />
                                    {errors.location && <Text sx={errorStyles} className="error">{errors.location}</Text>}
                                </FormControl>
                                <FormControl>
                                    <Input 
                                        placeholder="Wpisz adres" 
                                        type="text"
                                        value={inputs.address}
                                        onChange={e => setInputs(inputs => ({...inputs, address: e.target.value}))}
                                        sx={inputStyles}
                                        _placeholder={placeholderStyles}
                                    />
                                    {errors.address && <Text sx={errorStyles} className="error">{errors.address}</Text>}
                                </FormControl>
                            </Flex>
                            <Input
                                placeholder="Link do strony (Airbnb/Google/inne)"
                                type="text"
                                value={inputs.addressURL}
                                onChange={e => setInputs(inputs => ({...inputs, addressURL: e.target.value}))}
                                sx={inputStyles}
                                _placeholder={placeholderStyles}
                            />
                            {errors.addressURL && <Text sx={errorStyles} className="error">{errors.addressURL}</Text>}              
                        </VStack>
                    </Flex>
                    <Flex
                        flexDirection={{ base: "column", xl: "row" }}
                        w={"full"}
                        gap={8}
                    >
                        <FormControl
                            boxShadow={{ base: "none", sm: "0 10px 25px 0 rgba(0, 0, 0, 0.07)" }}
                            padding={{ base: "0", sm: "35px" }}
                            borderRadius={{ base: "0", sm: "30px" }}
                            flex={{ xl: 1 }}
                        >
                            <FormLabel sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Zakres</FormLabel>
                            <Select 
                                options={selectScopeOptions}
                                isMulti
                                closeMenuOnSelect={false}
                                placeholder={"Wybierz z listy"}
                                styles={selectStyles}
                                value={inputs.scope}
                                onChange={e => setInputs(inputs => ({...inputs, scope: e}))}
                            />
                            {errors.scope && <Text sx={errorStyles} className="error">{errors.scope}</Text>}
                        </FormControl>
                        <VStack 
                            gap={4}
                            boxShadow={{ base: "none", sm: "0 10px 25px 0 rgba(0, 0, 0, 0.07)" }}
                            padding={{ base: "0", sm: "35px" }}
                            borderRadius={{ base: "0", sm: "30px" }}
                            flex={{ xl: 1 }}
                        >
                            <Text sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Partnerzy</Text>
                            <Button
                                onClick={onSearchOpen}
                                borderRadius={"30px"}
                                border={"1px solid"}
                                borderColor={"textLight"}
                                boxShadow={"0 4px 4px 0 rgba(0, 0, 0, 0.25)"}
                                color={"rgba(217, 3, 104, 0.5)"}
                                backgroundColor={"background"}
                                transition={"0.3s ease"}
                                textTransform={"uppercase"}
                                fontSize={"14px"}
                                lineHeight={"24px"}
                                fontWeight={600}
                                fontFamily={"header"}
                                _hover={{ backgroundColor: "action", color: "background" }}
                                w={"full"}
                            >
                                Wyszukaj
                            </Button>
                            { contributors.length > 0 && (
                                <Flex gap={4} flexWrap={"wrap"} mt={4}>
                                    {contributors.map(contributor => (
                                        <Box 
                                            key={contributor.uid}
                                            position={"relative"}
                                        >
                                            <Button
                                                position={"absolute"}
                                                backgroundColor={"action"}
                                                top={0}
                                                right={0}
                                                display={"flex"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                height={"20px"}
                                                width={"20px"}
                                                minW={"20px"}
                                                padding={0}
                                                borderRadius={"50%"}
                                                zIndex={1}
                                                onClick={() => removeEventContributor(contributor.uid)}
                                                _before={{
                                                    content: "'x'",
                                                    color: "background",
                                                    fontSize: "13px",
                                                    lineHeight: "13px",
                                                }}
                                            ></Button>
                                            <Avatar size="md" src={contributor.image} name={contributor.fullName} />
                                        </Box>
                                    ))}
                                </Flex>
                            )}
                        </VStack>
                        <VStack 
                            gap={{ base: 8, md: "20px" }}
                            boxShadow={{ base: "none", sm: "0 10px 25px 0 rgba(0, 0, 0, 0.07)" }}
                            padding={{ base: "0", sm: "35px" }}
                            borderRadius={{ base: "0", sm: "30px" }}
                            flex={{ xl: 2 }}
                        >
                            <FormControl>
                                <FormLabel sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Rodzaj eventu</FormLabel>
                                <Select
                                    options={selectEventType}
                                    placeholder={"Wybierz z listy"}
                                    styles={selectStyles}
                                    value={inputs.type}
                                    onChange={e => setInputs(inputs => ({...inputs, type: e}))}
                                />
                                {errors.type && <Text sx={errorStyles} className="error">{errors.type}</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel sx={labelStyles} mb={{ base: "8px", md: "20px" }}>Ile miejsc</FormLabel>
                                <Select
                                    options={selectSlotesOptions}
                                    placeholder={"Wybierz z listy"}
                                    styles={selectStyles}
                                    value={inputs.slots}
                                    onChange={e => setInputs(inputs => ({...inputs, slots: e}))}
                                />
                                {errors.slots && <Text sx={errorStyles} className="error">{errors.slots}</Text>}
                            </FormControl>
                        </VStack>
                    </Flex>
                    <Flex flexDirection={{ base: "column", lg: "row" }} gap={4} mt={"30px"}>
                        {images.map((image, index) => (
                            <Box w={"250px"} h={"250px"} border={"1px solid"} borderColor={"decorativeSecondary"} borderRadius={"42px"} position={"relative"} overflow={"hidden"} key={index}>
                                <Button 
                                    position={"absolute"} 
                                    top={"15px"} 
                                    right={"15px"}
                                    padding={0}
                                    border={"1px solid"}
                                    borderColor={"action"}
                                    backgroundColor={"background"}
                                    opacity={"0.6"}
                                    transition={"0.3s ease"}
                                    _hover={{ opacity: "1" }}
                                    onClick={() => removeEventImage(index)}
                                >
                                    <DeleteIcon color={"action"} />
                                </Button>
                                <Image w={"100%"} h={"100%"} src={image} objectFit={"cover"} />
                            </Box>
                        ))}

                        { images.length < 4 && (
                            <VStack w={"250px"} h={"250px"} border={"1px solid"} borderColor={"decorativeSecondary"} borderRadius={"42px"} justifyContent={"center"} position={"relative"}>
                                <ArtfyButton  title={"Wybierz zdjęcie"} handleClick={onOpen} />
                            </VStack>
                        )}
                    </Flex>
                    <ArtfyButton addedStyles={{ mt: "30px" }} title={"Dodaj ogłoszenie"} gradientStyle={true} isLoading={isLoading} handleClick={handleAddEvent} />
                </VStack>
            </form>
            { isOpen && <AddEventPhoto isOpen={isOpen} onClose={onClose} saveEventImage={saveEventImage} /> }
            { isSearchOpen && <SearchUser isOpen={isSearchOpen} onClose={onSearchClose} addEventContributor={addEventContributor} contributors={contributors} removeEventContributor={removeEventContributor} /> }
        </Container>
    )
}

export default AddEvent