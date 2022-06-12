import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const DarkMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
            onClick={toggleColorMode}
            // variant="ghost"
        />
    );
}

export default DarkMode;