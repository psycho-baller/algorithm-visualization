import { Flex, Box, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Spacer} from "@chakra-ui/react";
import MySlider from "./slider";
import DarkMode from "./DarkMode";
import { HashTable } from "../classes/HashTables";

interface NavbarProps {
    setMap: (value: string[]) => void;
    setTableLen: (value: number) => void;
    tableLen: number;
    ht: HashTable;
}

export const Navbar = ({ setMap, tableLen, setTableLen, ht }: NavbarProps) => {
  return (
    <Flex>
      <Box p="4">
        <Popover>
          <PopoverTrigger>
            <Button>About</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              A simple HashMap implementation to store student&apos;s names
              and ages
            </PopoverHeader>
            <PopoverBody>
              This web app was made to visualize my solutions for the third
              Assignment in the Data Structures and Algorithms course in
              University of Calgary (CPSC 331) You can find the github
              repository for this website{" "}
              <a
                className={`text-lime-300 hover:text-orange-300`}
                href="https://github.com/psycho-baller/algorithm-visualization"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{" "}
              and the hashMap implementation{" "}
              <a
                className={`text-lime-300 hover:text-orange-300`}
                href="https://github.com/psycho-baller/algorithm-visualization/blob/main/classes/HashTables.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{" "}
              and the hashMap implementation in java (Assignment submission){" "}
              <a
                className={`text-lime-300 hover:text-orange-300`}
                href="https://github.com/psycho-baller/storing-in-hashTables"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <Spacer />
      <Box p="4">
        <DarkMode />

        <MySlider
          setMap={setMap}
          tableLen={tableLen}
          setTableLen={setTableLen}
          // setHt={setHt}
          ht={ht}
        />
      </Box>
    </Flex>
  );
};