import { Alert, AlertIcon, Input } from "@chakra-ui/react"
import { useState } from "react"
import ArtfyButton from "../ArtfyButton/ArtfyButton"
import useLogin from "../../hooks/useLogin"

const Login = ({ closeModal }) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const { loading, error, login } = useLogin()

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
                type="password"
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
                transition={"0.3s ease-out"}
                _placeholder={{ color: "action", textAlign: "center", textTransform: "uppercase", opacity: "0.5" }}
                focusBorderColor={"action"}
            />

            {error && (
                <Alert status="error" fontSize={"12px"} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            <ArtfyButton 
                title={"Zaloguj się"} 
                gradientStyle={true} 
                isLoading={loading}
                handleClick={() => login(inputs, closeModal)} 
            />
        </>
    )
}

export default Login