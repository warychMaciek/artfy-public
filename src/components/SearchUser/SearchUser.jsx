import { Avatar, Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { useRef } from "react"
import ArtfyButton from "../ArtfyButton/ArtfyButton"
import useSearchUser from "../../hooks/useSearchUser"
import { calculateAge } from "../../utils/calculateAge"
import { DeleteIcon } from "@chakra-ui/icons"

const SearchUser = ({ isOpen, onClose, addEventContributor, contributors, removeEventContributor }) => {
    const searchRef = useRef(null)
    const { isLoading, getUserProfile, users, setUsers } = useSearchUser()

    const handleSearchUser = e => {
        e.preventDefault()
        getUserProfile(searchRef.current.value)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"background"} border={"1px solid"} borderColor={"action"} maxW={{ base: "450px", md: "600px" }}>
                <ModalHeader color={"text"} fontFamily={"header"}>Wyszukaj partnera</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSearchUser}>
                        <Flex 
                            flexDirection={{ base: "column", md: "row" }} 
                            alignItems={{ md: "flex-end" }} 
                            gap={{ md: "20px" }}
                        >
                            <FormControl mb={{ base: 4, md: "0" }}>
                                <FormLabel>Nazwa lub imię i nazwisko partnera</FormLabel>
                                <Input ref={searchRef} />
                            </FormControl>
                            <ArtfyButton addedStyles={{ mx: "auto", display: "flex" }} title={"Szukaj"} gradientStyle={true} type={"submit"} isLoading={isLoading} />
                        </Flex>
                    </form>
                    {users && (
                        <VStack mt={{ base: 8, md: 12 }}>
                            {users.map(user => (
                                <Flex key={user.uid} position={"relative"} alignItems={"center"} justifyContent={"space-between"} w={"full"} gap={{ base: "20px", md: "70px" }}>
                                    <Avatar size={{ base: "xl", md: "2xl" }} src={user.profilePicURL} position={"absolute"} />
                                    <VStack
                                        borderRadius={"30px"}
                                        boxShadow={"0 10px 25px 0 rgba(0, 0, 0, 0.07)"}
                                        flex={1}
                                        alignItems={"flex-end"}
                                        gap={1}
                                        padding={{ base: "10px 20px 10px 100px", md: "10px 40px 10px 150px" }}
                                    >
                                        <Text textAlign={"right"} fontFamily={"header"} fontSize={"20px"} fontWeight={700} color={"header"} lineHeight={"29px"}>{user.fullName}</Text>
                                        <Text textAlign={"right"} fontWeight={400} fontSize={"16px"} lineHeight={"25px"} color={"text"} textTransform={"uppercase"}>{user.birthDate && `${calculateAge(user.birthDate)} lat(a)`}</Text>
                                        <Text textAlign={"right"} fontWeight={400} fontSize={"16px"} lineHeight={"25px"} color={"text"} textTransform={"uppercase"}>{user.location}</Text>
                                    </VStack>
                                    {
                                        contributors.some(contributor => contributor.uid === user.uid) ?
                                            <Button
                                                onClick={() => removeEventContributor(user.uid)}
                                                borderRadius={"50%"}
                                                background={"linear-gradient(101.43deg, #D90368 0%, transparent 101.4%) #820263"}
                                                position={"relative"}
                                                display={"block"}
                                                h={"60px"}
                                                w={"60px"}
                                                transition={"0.3s ease"}
                                                _hover={{
                                                    backgroundColor: "actionTertiary"
                                                }}
                                            >
                                                <DeleteIcon color={"background"} w={"20px"} h={"20px"} />
                                            </Button>
                                        :
                                            <Button
                                                onClick={() => addEventContributor(user)}
                                                borderRadius={"50%"}
                                                background={"linear-gradient(101.43deg, #D90368 0%, transparent 101.4%) #820263"}
                                                position={"relative"}
                                                display={"block"}
                                                h={"60px"}
                                                w={"60px"}
                                                _before={{
                                                    content: "''",
                                                    display: "block",
                                                    w: "30px",
                                                    h: "5px",
                                                    backgroundColor: "background",
                                                    borderRadius: "5px",
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)"
                                                }}
                                                _after={{
                                                    content: "''",
                                                    display: "block",
                                                    w: "5px",
                                                    h: "30px",
                                                    backgroundColor: "background",
                                                    borderRadius: "5px",
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)"
                                                }}
                                                transition={"0.3s ease"}
                                                _hover={{
                                                    backgroundColor: "actionTertiary"
                                                }}
                                            ></Button>
                                    }
                                </Flex>
                            ))}
                        </VStack>
                    )}
                </ModalBody>
                <ModalFooter
                    justifyContent={"flex-start"}
                    mt={{ base: 8, md: 12 }}
                    gap={4}
                >
                    { contributors.length > 0 && (
                        contributors.map(contributor => (
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
                                    transition={"0.3s ease"}
                                    _hover={{
                                        backgroundColor: "actionTertiary"
                                    }}
                                ></Button>
                                <Avatar size="lg" src={contributor.image} name={contributor.fullName} />
                            </Box>
                        ))
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SearchUser