import styles from "../styles/Home.module.css";
import { Text } from "@chakra-ui/react";
import { HashTable } from "../classes/HashTables";
import {color} from "../lib/visualColor";

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
  return (
    <div className={styles.description}>
      {map.map((line, index) => (
        <Text key={index} color={visColor}>
          {line.replace(",", " -> ").replace("[]", "[ ]")}
        </Text>
      ))}
    </div>
  );
}
);

export default VisualizeMap;