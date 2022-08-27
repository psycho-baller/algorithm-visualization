import styles from "../styles/Home.module.css";
import {
  Circle,
  HStack,
  Square,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HashTable } from "../classes/HashTables";
import {color} from "../lib/visualColor";
import { ArrowUpIcon } from "@chakra-ui/icons";

// https://stackoverflow.com/questions/64884309/how-to-create-circle-square-shapes-using-react-with-text-inside-them-without-usi

interface VisualizeMapProps {
    ht: HashTable;
    renderForm: string
}
const VisualizeMap = ((props: VisualizeMapProps) => {
    const { ht, renderForm } = props;
    const visColor = renderForm === "insert" ? color.insert
        : renderForm === "delete" ? color.delete
            : renderForm === "search" ? color.search
            : renderForm === "increment" ? color.increment
            : renderForm === "reset" ? color.reset
            : color.default;
    const map = ht.toString();
    const borderColor = useColorModeValue("#f0e7db", "#202023");

  return (
    <div className={styles.description}>
      <HStack m={0} align="end">
        {/* maps through the hashmap and stacks them horizontally */}
        {map.map((line, index) => (
          <VStack key={index} padding={1} m={0}>
            <VStack m={0}>
              {
                // maps through the line and stacks them vertically
                line
                  ? line // creates a list for each node in the line then maps through it and creates a square pair for each node
                      .split(",")
                      .map((node, index) => (
                        <VStack key={index} m={0}>
                          <Square key={index} border={`1px solid ${visColor}`}>
                            <Square
                              borderRight={`1px solid ${borderColor}`}
                              key={index}
                              // size="20px"
                              bg={visColor}
                              px={1}
                            >
                              <Text>{node.split(":")[0]}</Text>
                            </Square>
                            <Square
                              px={1}
                              borderLeft={`1px solid ${borderColor}`}
                              key={index}
                              // size="20px"
                              bg={visColor}
                            >
                              <Text>{node.split(":")[1]}</Text>
                            </Square>
                          </Square>
                          <ArrowUpIcon />
                        </VStack>
                      ))
                      .reverse()
                  : null
              }
            </VStack>
            <Square className="" p={3} bg={visColor}>
              <Text>{index}</Text>
            </Square>
          </VStack>
        ))}
      </HStack>
    </div>
  );
}
);

export default VisualizeMap;