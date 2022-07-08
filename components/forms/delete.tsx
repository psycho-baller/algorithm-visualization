import { Input, Grid, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { HashTable } from "../../classes/HashTables";
import styles from "../../styles/Home.module.css";
import { animations } from "../../animations/index";

interface DeleteFormProps {
    ht: HashTable;
    setMap: (map: string[]) => void;
    toast: (msg: {}) => void;
}

export default function DeleteForm(
  props: DeleteFormProps) {
    const { ht, setMap, toast } = props;
  const [deleteName, setDeleteName] = useState("");

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = ht.delete(deleteName);
    setMap(ht.toString());
    if (result === false) {
      toast({
        description: `${deleteName} was not found in the HashTable`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        description: `${deleteName} was deleted from the HashTable`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <motion.div
      key={"delete"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animations.delete}
    >
      {" "}
      <Text className={styles.description} color="blue.200">
        Delete a student from the HashTable:
      </Text>
      <form onSubmit={handleDelete}>
        <label htmlFor="name">Name:</label>
        <br />
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Mo Bamba"
          focusBorderColor="blue.200"
          value={deleteName}
          onChange={(e) => setDeleteName(e.target.value)}
        />
        <br />
        <Grid>
          <Button colorScheme="blue" className={`mx-auto mt-4`} type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </motion.div>
  );
}