import { Input, Grid, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { HashTable } from "../../classes/HashTables";
import styles from "../../styles/Home.module.css";
import { animations } from "../../animations/index";

interface IncrementFormProps {
  ht: HashTable;
  setMap: (map: string[]) => void;
  toast: (msg: {}) => void;
}

export default function IncrementForm(
  props: IncrementFormProps,
) {
    const { ht, setMap, toast } = props;
  const [incrementName, setIncrementName] = useState("");
  const handleIncrement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const age: number = ht.increment(incrementName);
    setMap(ht.toString());
    if (age === -1) {
      toast({
        description: "Student not found in the HashTable",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Student found in the HashTable",
        description: `${incrementName}'s age is now ${age}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <motion.div
      key={"increment"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animations.increment}
    >
      <Text className={styles.description} color="yellow.200">
        Increment a student&apos;s age in the HashTable:
      </Text>
      <form onSubmit={handleIncrement}>
        <label htmlFor="name">Name:</label>
        <br />
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Mo Bamba"
          focusBorderColor="yellow.200"
          value={incrementName}
          onChange={(e) => setIncrementName(e.target.value)}
        />
        <br />
        <Grid>
          <Button colorScheme="yellow" className={`mx-auto mt-4`} type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </motion.div>
  );
}