import { Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { ArrowForwardIcon } from "@chakra-ui/icons"

const ArtfyLink = ({ title, gradientStyle, url, withIcon, addedStyles }) => {
    return (
        <Link
            as={RouterLink}
            to={url}
            fontFamily={"header"}
            fontWeight={600}
            fontSize={"14px"}
            lineHeight={"24px"}
            textTransform={"uppercase"}
            padding={"15px 38px"}
            borderRadius={"30px"}
            cursor={"pointer"}
            minW={"130px"}
            h={"40px"}
            display={"inline-flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
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
            transition={"0.3s"}
            _hover={
                gradientStyle ?
                    { bgColor: "actionTertiary" }
                :
                    { boxShadow: "0px 0px 10px 0px #D90368" }
            }
        >
            {title}
            {withIcon && <ArrowForwardIcon color={gradientStyle ? "background" : "action"} />}
        </Link>
    )
}

export default ArtfyLink