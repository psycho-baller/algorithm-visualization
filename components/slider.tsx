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

import { SetStateAction, useState } from "react";
import { HashTable } from "../classes/HashTables";

export default function MySlider() {
  function handleLenChange(value: number) {
    setSliderValue(value);
    const ht = new HashTable(value)
    setMap(ht.toString());

  }
  
  const [sliderValue, setSliderValue] = useState(50);

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
        <PopoverHeader>Change HashTable Length</PopoverHeader>
        <PopoverBody>
          <Box pt={6} pb={2}>
            <Slider
              aria-label="slider-ex-6"
              onChange={(val: number) => handleLenChange(val)}
            >
              <SliderMark
                value={sliderValue}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {sliderValue}
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
