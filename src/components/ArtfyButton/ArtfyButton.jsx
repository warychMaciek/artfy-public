import { Button } from "@chakra-ui/react"

const ArtfyButton = ({ title, gradientStyle, handleClick, isLoading, type, addedStyles }) => {
    return (
        <Button
            type={type ? type : "button"}
            onClick={handleClick}
            isLoading={isLoading}
            fontFamily={"header"}
            fontWeight={600}
            fontSize={"14px"}
            lineHeight={"24px"}
            textTransform={"uppercase"}
            padding={"15px 38px"}
            borderRadius={"30px"}
            cursor={"pointer"}
            minW={"130px"}
            sx={addedStyles}
            background={
                gradientStyle ? 
                    "linear-gradient(101.43deg, #D90368 0%, transparent 101.4%) #820263"
                :
                    "transparent"
            }
            color={
                gradientStyle ?
                    "background"
                :
                    "action"
            }
            border={
                gradientStyle ?
                    "none"
                :
                    "1px solid #D90368"   
            }
            transition={"0.3s ease"}
            _hover={
                gradientStyle ?
                    { bgColor: "actionTertiary" }
                :
                    { boxShadow: "0px 0px 10px 0px #D90368" }
            }
        >
            {title}
        </Button>
    )
}

export default ArtfyButton