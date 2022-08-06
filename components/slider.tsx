import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
} from "@chakra-ui/react";
import {   SettingsIcon } from '@chakra-ui/icons';
import { HashTable } from "../classes/HashTables";

interface NavbarProps {
  setMap: (value: string[]) => void;
  setTableLen: (value: number) => void;
  tableLen: number;
  ht: HashTable;
}

export default function MySlider({setMap, tableLen, setTableLen, ht}: NavbarProps) {
    // let ht = new HashTable(8) as HashTable;

  function handleLenChange(value: number) {
    setTableLen(value);
    // setHt(new HashTable(tableLen));
    ht = new HashTable(value);
    setMap(ht.toString());
  }


  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton icon={<SettingsIcon />} aria-label={""} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Change HashMap Length</PopoverHeader>
        <PopoverBody>
          <Box pt={6} pb={2}>
            <Slider
              aria-label="slider-ex-6"
              onChange={(val: number) => handleLenChange(val)}
              defaultValue={8}
              min={1}
              max={10}
            >
              <SliderMark
                value={tableLen}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {tableLen}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
