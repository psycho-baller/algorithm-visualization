import styles from "../styles/Home.module.css";
import { Text } from "@chakra-ui/react";
import { HashTable } from "../classes/HashTables";

interface VisualizeMapProps {
    ht: HashTable;
}
const VisualizeMap = ((props: VisualizeMapProps) => {
    const { ht } = props;
    const map = ht.toString();
  return (
    <div className={styles.description}>
      {map.map((line, index) => (
        <Text key={index}>
          {line.replace(",", " -> ").replace("[]", "[ ]")}
        </Text>
      ))}
    </div>
  );
}
);

export default VisualizeMap;