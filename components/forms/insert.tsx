import { Input, Grid, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { HashTable } from "../../classes/HashTables";
import styles from "../../styles/Home.module.css";
import { animations } from "../../animations/index";
import { color } from "../../lib/visualColor";

interface InsertFormProps {
  ht: HashTable;
  setMap: (map: string[]) => void;
  toast: (msg: {}) => void;
}

export default function InsertForm(props: InsertFormProps) {
  const { ht, setMap, toast } = props;
  const [insertName, setInsertName] = useState("");
  const [insertAge, setInsertAge] = useState("");

  const handleInsert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const desc = ht.insert(insertName, parseInt(insertAge, 10));
    setMap(ht.toString());
    if (desc.includes("modified")) {
      toast({
        title: `Student's age was modified`,
        description: desc,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else if (desc.includes("inserted")) {
      toast({
        title: `Student was inserted`,
        description: desc,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: `${insertName} was not inserted`,
        description: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <motion.div
      key={"insert"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animations.insert}
    >
      <Text className={styles.description} color={color.insert}>
        Insert a new key-value pair into the HashTable:
      </Text>
      <form onSubmit={handleInsert}>
        <label htmlFor="name">Name:</label>
        <br />
        <Input
          variant="outline"
          type="text"
          id="name"
          name="name"
          required
          placeholder="Mo Bamba"
          focusBorderColor="red.200"
          // _placeholder={{ color: "teal.300" }}
          value={insertName}
          onChange={(e) => setInsertName(e.target.value)}
        />
        <br />
        <label htmlFor="age">Age:</label>
        <br />
        <Input
          variant="outline"
          type="number"
          id="age"
          name="age"
          required
          placeholder="42"
          focusBorderColor="red.200"
          value={insertAge}
          onChange={(e) => setInsertAge(e.target.value)}
        />
        <br />
        <Grid>
          <Button colorScheme="pink" className={`mx-auto mt-4`} type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </motion.div>
  );
}
