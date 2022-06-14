import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import DarkMode from "../components/DarkMode";
import {
  Text,
  Flex,
  Box,
  Spacer,
  Input,
  Button,
  Grid,
  Wrap,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useToast,
} from "@chakra-ui/react";
import { HashTable } from "../classes/HashTables";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animations } from "../animations/index";

let ht: HashTable = new HashTable();
const Home: NextPage = () => {
  const toast = useToast();
  const [renderForm, setRenderForm] = useState("insert");
  const [map, setMap] = useState(ht.toString());

  function handleReset() {
    const updated: boolean = map.join().length !== 55; // 55 is the length of the hash table in string form, if the length is not 55, then the map is not empty hence the map is updated
    ht.reset();
    setMap(ht.toString());
    if (updated) {
      toast({
        description: "HashTable Reset",
        status: "success",
        duration: 2000,
        // isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        description: "HashTable is already empty",
        status: "error",
        duration: 2000,
        // isClosable: true,
        position: "top-right",
      });
    }
  }

  function HandleRenderForm() {
    // console.log(renderForm);
    if (renderForm === "insert") {
      return <InsertForm />;
    } else if (renderForm === "delete") {
      return <DeleteForm />;
    } else if (renderForm === "search") {
      return <SearchForm />;
    } else if (renderForm === "increment") {
      return <IncrementForm />;
    }
  }

  //Forms:
  function InsertForm() {
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
          duration: 5000,
          // isClosable: true,
          position: "top-right",
        });
      } else if (desc.includes("inserted")) {
        toast({
          title: `Student was inserted`,
          description: desc,
          status: "success",
          duration: 5000,
          // isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: `${insertName} was not inserted`,
          description: "Something went wrong",
          status: "error",
          duration: 5000,
          // isClosable: true,
          position: "top-right",
        });
      }
    };
    return (
      <motion.div
        key={renderForm}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animations.insert}
      >
        <Text className={styles.description} color="red.200">
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

  function DeleteForm() {
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
          // isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          description: `${deleteName} was deleted from the HashTable`,
          status: "success",
          duration: 4000,
          // isClosable: true,
          position: "top-right",
        });
      }
    };
    return (
      <motion.div
        key={renderForm}
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

  function SearchForm() {
    const [searchName, setSearchName] = useState("");
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const age: number = ht.search(searchName);
      if (age === -1) {
        toast({
          description: "Student not found in the HashTable",
          status: "error",
          duration: 4000,
          // isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Student found in the HashTable",
          description: `${searchName}'s age is ${age}`,
          status: "success",
          duration: 5000,
          // isClosable: true,
          position: "top-right",
        });
      }
    };
    return (
      <motion.div
        key={renderForm}
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
            <Button
              colorScheme="green"
              className={`mx-auto mt-4`}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </form>
        {/*todo: display the result of the search in a cool way*/}
      </motion.div>
    );
  }

  function IncrementForm() {
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
          // isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Student found in the HashTable",
          description: `${incrementName}'s age is now ${age}`,
          status: "success",
          duration: 5000,
          // isClosable: true,
          position: "top-right",
        });
      }
    };
    return (
      <motion.div
        key={renderForm}
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
            <Button
              colorScheme="yellow"
              className={`mx-auto mt-4`}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </motion.div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HashTable Implementation</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://cdn3.iconfinder.com/data/icons/elastic-search-blackfill/128/Elastic_Search_-_Black_Fill-16-1024.png"
        />
      </Head>
      <Flex>
        <Box p="4">
          <Popover>
            <PopoverTrigger>
              <Button>About</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              {/* <PopoverHeader></PopoverHeader> */}
              <PopoverBody>
                A simple HashTable implementation to store student&apos;s names
                and ages
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Spacer />
        <Box p="4">
          <DarkMode />
        </Box>
      </Flex>
      <main className={styles.main}>
        {/* <h1 className={styles.title}>HashTable implementation</h1> */}
        <div className={styles.description}>
          {map.map((line, index) => (
            <Text key={index}>
              {line.replace(",", " -> ").replace("[]", "[ ]")}
            </Text>
          ))}
        </div>
        <Wrap direction="row" spacing={4} className="grid">
          <Button
            // className={`mx-auto mt-4`}
            colorScheme="pink"
            variant="solid"
            onClick={() => setRenderForm("insert")}
          >
            Insert
          </Button>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => setRenderForm("delete")}
          >
            Delete
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            onClick={() => setRenderForm("search")}
          >
            Search
          </Button>
          <Button
            colorScheme="yellow"
            variant="solid"
            onClick={() => setRenderForm("increment")}
          >
            Increment
          </Button>
          <Button colorScheme="red" variant="solid" onClick={handleReset}>
            Reset
          </Button>
        </Wrap>
        <AnimatePresence>
          exitBeforeEnter={true}
          initial={false}
          {HandleRenderForm()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
