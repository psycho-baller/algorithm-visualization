import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import DarkMode from "../components/DarkMode";
import {
  Text,
  Heading,
  Flex,
  Box,
  Spacer,
  Input,
  Stack,
  Button,
  Grid,
  Link,
  Wrap,
} from "@chakra-ui/react";
import { HashTable } from "../classes/HashTables";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animations } from "../animations/index";
import { useRouter } from "next/router";



let ht: HashTable = new HashTable();
const Home: NextPage = () => {
  const [renderForm, setRenderForm] = useState("insert");
  const [map, setMap] = useState(ht.toString());

  function handleReset() {
    ht.reset();
    setMap(ht.toString());
  }

  function HandleRenderForm() {
    console.log(renderForm);
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
      ht.insert(insertName, parseInt(insertAge, 10));
      setMap(ht.toString());
    };
    return (
      <motion.div
        key={renderForm}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animations.variants}
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
      ht.delete(deleteName);
      setMap(ht.toString());
    };
    return (
<motion.div
        key={renderForm}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animations.variants}
        >        <Text className={styles.description} color="blue.200">
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
      // setMap(ht.toString());
    };
    return (
      <motion.div
        key={renderForm}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animations.variants}
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

  function IncrementForm() {
    const [incrementName, setIncrementName] = useState("");
    const handleIncrement = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      ht.increment(incrementName);
      setMap(ht.toString());
    };
    return (
      <motion.div
        key={renderForm}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animations.variants}
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
          <DarkMode />
        </Box>
        <Spacer />
        <Box p="2">
          <p className={styles.description}>
            A simple Hash Table implementation in React.
          </p>
        </Box>
        <Spacer />
        <Box p="2">
          <DarkMode />
        </Box>
      </Flex>
      <main className={styles.main}>
        {/* <h1 className={styles.title}>HashTable implementation</h1> */}
        <div className={styles.description}>{map}</div>
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
          {HandleRenderForm()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
