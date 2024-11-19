import { Avatar, Container, Flex, FormControl, Heading, Input, Text, Textarea, VStack, useDisclosure } from "@chakra-ui/react"
import useAuthStore from "../../store/authStore"
import useUserProfileStore from "../../store/userProfileStore"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"
import EditProfileImage from "../../components/Profile/EditProfileImage"
import { useEffect, useState } from "react"
import { calculateAge } from "../../utils/calculateAge"
import useEditProfileData from "../../hooks/useEditProfileData"
import useShowToast from "../../hooks/useShowToast"
import Select from 'react-select'

const ProfilePageHeader = () => {
    const { userProfile } = useUserProfileStore()
    const authUser = useAuthStore(state => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ isEditing, setIsEditing ] = useState(false)
    const [ inputs, setInputs ] = useState({
        fullName: "",
        birthDate: "",
        location: "",
        bio: "",
        scope: ""
    })
    const { isUpdating, editProfileData } = useEditProfileData()
    const showToast = useShowToast();
    const [ errors, setErrors ] = useState({})

    const handleEditProfileData = async () => {
        if (!validateForm()) return

        try {
            
            await editProfileData(inputs)
            setIsEditing(false)

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    const handleEditCancellation = () => {
        setIsEditing(false)
        setInputs({
            fullName: authUser.fullName,
            birthDate: authUser.birthDate,
            location: authUser.location,
            bio: authUser.bio,
            scope: authUser.scope
        })
        setErrors({})
    }

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username
    // const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username

    useEffect(() => {
        visitingOwnProfileAndAuth && (
            setInputs({
                fullName: authUser.fullName,
                birthDate: authUser.birthDate,
                location: authUser.location,
                bio: authUser.bio,
                scope: authUser.scope
            })
        )
    },[])

    const validateForm = () => {
        let errors = {}
        let isValid = true

        if (!inputs.fullName.trim()) {
            errors.fullName = "Imię i nazwisko są wymagane"
            isValid = false
        } else if (inputs.fullName.length > 100) {
            errors.fullName = "Imię i nazwisko nie mogą przekraczać 100 znaków"
            isValid = false
        }

        if (!inputs.birthDate) {
            errors.birthDate = "Data urodzenia jest wymagana"
            isValid = false
        }

        if (!inputs.location.trim()) {
            errors.location = "Lokalizacja jest wymagana"
            isValid = false
        } else if (inputs.location.length > 100) {
            errors.location = "Lokalizacja nie może przekraczać 100 znaków"
            isValid = false
        }

        if (!inputs.bio.trim()) {
            errors.bio = "Opis jest wymagany"
            isValid = false
        } else if (inputs.bio.length > 500) {
            errors.bio = "Opis nie może przekraczać 500 znaków"
            isValid = false
        }

        if (inputs.scope.length === 0) {
            errors.scope = "Zakres jest wymagany"
            isValid = false
        }

        setErrors(errors)
        return isValid
    }

    const textStyles = {
        color: "text",
        fontWeight: 400,
        fontSize: "17px",
        lineHeight: "26px"
    }
    const boxStyles = {
        backgroundColor: "background",
        borderRadius: "30px",
        padding: "35px",
        boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.07)",
        position: "relative",
        margin: "20px 0"
    }

    const selectOptions = [
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
            borderRadius: 0,
            cursor: "pointer",
            borderColor: "#e2e8f0",
        }),
        container: baseStyles => ({
            ...baseStyles,
            width: "100%"
        })
    }

    return (
        <Container 
            maxW={1920} 
            bgColor={"background"} 
            py={"80px"} 
            px={{ base: 4, xl: "100px" }}
            position={"relative"}
            _before={{
                content: "''",
                display: "block",
                width: "100%",
                height: "40%",
                position: "absolute",
                top: "0",
                left: "0",
                background: "linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)"
            }}
        >
            <Flex maxW={1240} mx={"auto"} alignItems={{ md: "stretch" }} flexDir={{ base: "column", md: "row" }}>
                <VStack sx={boxStyles} alignItems={"flex-start"} spacing={1} justifyContent={"center"} flex={2}>

                    { visitingOwnProfileAndAuth && isEditing ?
                        <>
                            <FormControl>
                                <Input 
                                    placeholder="Full Name" 
                                    size={"sm"} 
                                    type="text"
                                    value={inputs.fullName}
                                    onChange={e => setInputs(inputs => ({...inputs, fullName: e.target.value}))}
                                />
                                {errors.fullName && <Text fontSize={"12px"} color={"red"}>{errors.fullName}</Text>}
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder="Birthdate"
                                    size={"sm"}
                                    type="date"
                                    value={inputs.birthDate}
                                    onChange={e => setInputs(inputs => ({...inputs, birthDate: e.target.value}))}
                                />
                                {errors.birthDate && <Text fontSize={"12px"} color={"red"}>{errors.birthDate}</Text>}
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder="Location"
                                    size={"sm"}
                                    type="text"
                                    value={inputs.location}
                                    onChange={e => setInputs(inputs => ({...inputs, location: e.target.value}))}
                                />
                                {errors.location && <Text fontSize={"12px"} color={"red"}>{errors.location}</Text>}
                            </FormControl>
                        </>
                        :
                        <>
                            <Heading as={"h1"}
                                fontFamily={"header"}
                                fontWeight={700}
                                fontSize={"20px"}
                                lineHeight={"29px"}
                                color={"header"}
                                textTransform={"uppercase"}
                                >
                                {userProfile.fullName}
                            </Heading>
                            <Text sx={textStyles} textTransform={"uppercase"}>{userProfile.birthDate && `${calculateAge(userProfile.birthDate)} lat(a)`}</Text>
                            <Text sx={textStyles} textTransform={"uppercase"}>{userProfile.location}</Text>
                        </>
                    }
                    
                </VStack>
                <VStack flex={2} position={"relative"} right={{ lg: "20px" }} justifyContent={"center"}>
                    <Avatar 
                        width={"190px"} 
                        height={"190px"} 
                        name={userProfile.fullName} 
                        src={userProfile.profilePicURL} 
                        boxShadow={"0 10px 10px 1px rgba(0, 0, 0, 0.25)"} 
                    />
                    { visitingOwnProfileAndAuth && (
                        <Flex position={"absolute"} bottom={{ base: "10px", md: "20px" }} mx={"auto"} transform={"translateY(50%)"}>
                            <ArtfyButton 
                                title={"Zamień zdjęcie"} 
                                gradientStyle={true} 
                                handleClick={onOpen}
                            />
                        </Flex>
                    )}
                </VStack>
                <Flex sx={boxStyles} flex={6} gap={"20px"} flexDir={{ base: "column", lg: "row" }}>

                    <VStack alignItems={"flex-start"} flex={1}>
                        <Text
                            color={"header"}
                            fontFamily={"header"}
                            fontWeight={700}
                            fontSize={"20px"}
                            lineHeight={"29px"}
                        >
                            Scope
                        </Text>

                        {visitingOwnProfileAndAuth && isEditing ?
                            <>
                                <Select 
                                    options={selectOptions} 
                                    isMulti
                                    closeMenuOnSelect={false}
                                    placeholder={"Wybierz..."}
                                    value={inputs.scope}
                                    onChange={e => setInputs(inputs => ({...inputs, scope: e}))}
                                    styles={selectStyles}
                                />
                                {errors.scope && <Text fontSize={"12px"} color={"red"}>{errors.scope}</Text>}
                            </>
                            :
                            <Text sx={textStyles}>{userProfile.scope && userProfile.scope.map((el, index) => (
                                index === 0 ? el.label : `, ${el.label}`
                            ))}</Text>
                        }
                        
                    </VStack>

                    {visitingOwnProfileAndAuth && isEditing ?
                        <FormControl flex={2}>
                            <Textarea
                                placeholder="Bio"
                                size={"sm"}
                                value={inputs.bio}
                                onChange={e => setInputs(inputs => ({...inputs, bio: e.target.value}))}
                                resize={"none"}
                            />
                            {errors.bio && <Text fontSize={"12px"} color={"red"}>{errors.bio}</Text>}
                        </FormControl>
                        :
                        <Text flex={2} sx={textStyles}>{userProfile.bio}</Text>
                    }

                    { visitingOwnProfileAndAuth && !isEditing && (
                        <Flex position={"absolute"} bottom={0} right={0} mx={"auto"} transform={"translateY(50%)"}>
                            <ArtfyButton 
                                title={"Edytuj"} 
                                gradientStyle={true} 
                                handleClick={() => setIsEditing(true)}
                            />
                        </Flex>
                    )}

                    { visitingOwnProfileAndAuth && isEditing && (
                        <Flex position={"absolute"} bottom={0} right={0} mx={"auto"} transform={"translateY(150%)"} gap={4}>
                            <ArtfyButton 
                                title={"Anuluj"} 
                                handleClick={handleEditCancellation}
                            />
                            <ArtfyButton 
                                title={"Zapisz"} 
                                gradientStyle={true} 
                                handleClick={handleEditProfileData}
                                isLoading={isUpdating}
                            />
                        </Flex>
                    )}
                </Flex>
            </Flex>
            {isOpen && <EditProfileImage isOpen={isOpen} onClose={onClose} />}
        </Container>
    )
}

export default ProfilePageHeader