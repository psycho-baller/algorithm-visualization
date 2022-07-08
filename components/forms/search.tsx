import { Input, Grid, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { HashTable } from "../../classes/HashTables";
import styles from "../../styles/Home.module.css";
import { animations } from "../../animations/index";
interface SearchFormProps {
    ht: HashTable;
    toast: (msg: {}) => void;
}
export default function SearchForm( props :SearchFormProps) {
  const { ht, toast } = props;
  const [searchName, setSearchName] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const age: number = ht.search(searchName);
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
        description: `${searchName}'s age is ${age}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <motion.div
      key={"search"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animations.search}
    >
      <Text className={styles.description} color="green.200">
        Search for a student in the HashTable:
      </Text>
      <form onSubmit={handleSearch}>
        <label htmlFor="name">Name:</label>
        <br />
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Mo Bamba"
          focusBorderColor="green.200"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <br />
        <Grid>
          <Button colorScheme="green" className={`mx-auto mt-4`} type="submit">
            Submit
          </Button>
        </Grid>
      </form>
      {/*todo: display the result of the search in a cool way*/}
    </motion.div>
  );
}