import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import ArtfyButton from "../ArtfyButton/ArtfyButton"
import useRegisterWithCredentials from "../../hooks/useRegisterWithCredentials"

const Register = ({ closeModal }) => {
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        fullName: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error, signup } = useRegisterWithCredentials()

    return (
        <>
            <Input 
                type="email"
                placeholder="email"
                value={inputs.email}
                onChange={e => setInputs(inputs => ({...inputs, email: e.target.value}))}
                fontSize={"14px"}
                fontWeight={600}
                lineHeight={"24px"}
                fontFamily={"header"}
                border={"1px solid"}
                borderColor={"action"}
                borderRadius={"30px"}
                color={"action"}
                textAlign={"center"}
                transition={"0.3s ease-out"}
                _placeholder={{ color: "action", textAlign: "center", textTransform: "uppercase", opacity: "0.5" }}
                focusBorderColor={"action"}
            />
            <Input 
                type="text"
                placeholder="username"
                value={inputs.username}
                onChange={e => {
                    const newValue = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
                    setInputs(inputs => ({...inputs, username: newValue}));
                }}
                fontSize={"14px"}
                fontWeight={600}
                lineHeight={"24px"}
                fontFamily={"header"}
                border={"1px solid"}
                borderColor={"action"}
                borderRadius={"30px"}
                color={"action"}
                textAlign={"center"}
                transition={"0.3s ease-out"}
                _placeholder={{ color: "action", textAlign: "center", textTransform: "uppercase", opacity: "0.5" }}
                focusBorderColor={"action"}
            />
            <Input 
                type="text"
                placeholder="Imię i nazwisko"
                value={inputs.fullName}
                onChange={e => setInputs(inputs => ({...inputs, fullName: e.target.value}))}
                fontSize={"14px"}
                fontWeight={600}
                lineHeight={"24px"}
                fontFamily={"header"}
                border={"1px solid"}
                borderColor={"action"}
                borderRadius={"30px"}
                color={"action"}
                textAlign={"center"}
                transition={"0.3s ease-out"}
                _placeholder={{ color: "action", textAlign: "center", textTransform: "uppercase", opacity: "0.5" }}
                focusBorderColor={"action"}
            />
            <InputGroup>
                <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="hasło"
                    value={inputs.password}
                    onChange={e => setInputs(inputs => ({...inputs, password: e.target.value}))}
                    fontSize={"14px"}
                    fontWeight={600}
                    lineHeight={"24px"}
                    fontFamily={"header"}
                    border={"1px solid"}
                    borderColor={"action"}
                    borderRadius={"30px"}
                    color={"action"}
                    textAlign={"center"}
                    pl={10}
                    transition={"0.3s ease-out"}
                    _placeholder={{ color: "action", textAlign: "center", textTransform: "uppercase", opacity: "0.5" }}
                    focusBorderColor={"action"}
                />
                <InputRightElement h={"full"}>
                    <Button _hover={{ bg: "transparent" }} variant={"ghost"} size={"sm"} 
                        onClick={() => setShowPassword(showPassword => !showPassword)}
                    >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {error && (
                <Alert status="error" fontSize={"12px"} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            <ArtfyButton 
                title={"Zarejestruj się"} 
                gradientStyle={true} 
                handleClick={() => signup(inputs, closeModal)} 
                isLoading={loading}
            />
        </>
    )
}

export default Register