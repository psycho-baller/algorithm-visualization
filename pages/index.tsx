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
import MySlider from "../components/slider";
import VisualizeMap from "../components/visualization";
import InsertForm from "../components/forms/insert";
import SearchForm from "../components/forms/search";
import DeleteForm from "../components/forms/delete";
import IncrementForm from "../components/forms/increment";

const ht = new HashTable(8) as HashTable;
const Home: NextPage = () => {
  const toast = useToast();
  const [renderForm, setRenderForm] = useState("insert");
  // const [ht, setHt] = useState(new HashTable(8));

  const [map, setMap] = useState(ht.toString()) as [
    string[],
    (value: string[]) => void
  ];
  const [tableLen, setTableLen] = useState(8);

  function handleReset() {
    const updated: boolean = map.join().length !== tableLen * 7 - 1; // 55 is the length of the hash table in string form, if the length is not 55, then the map is not empty hence the map is updated
    ht.reset();
    setMap(ht.toString());
    if (updated) {
      toast({
        description: "HashTable Reset",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        description: "HashTable is already empty",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HashTable Implementation</title>
        <meta name="description" content="" />
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
              <PopoverHeader>
                A simple HashTable implementation to store student&apos;s names
                and ages
              </PopoverHeader>
              <PopoverBody>
                This web app was made to visualize my solutions for the third
                Assignment in the Data Structures and Algorithms course in
                University of Calgary (CPSC 331) You can find the github
                repository for this website{" "}
                <a
                  className={`text-lime-300 hover:text-orange-300`}
                  href="https://github.com/psycho-baller/algorithm-visualization"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>{" "}
                and the hashTable implementation{" "}
                <a
                  className={`text-lime-300 hover:text-orange-300`}
                  href="https://github.com/psycho-baller/algorithm-visualization/blob/main/classes/HashTables.ts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>{" "}
                and the hashTable implementation in java (Assignment submission){" "}
                <a
                  className={`text-lime-300 hover:text-orange-300`}
                  href="https://github.com/psycho-baller/storing-in-hashTables"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Spacer />
        <Box p="4">
          <DarkMode />

          <MySlider
            setMap={setMap}
            tableLen={tableLen}
            setTableLen={setTableLen}
            // setHt={setHt}
            ht={ht}
          />
        </Box>
      </Flex>
      <main className={styles.main}>
        {/* <h1 className={styles.title}>HashTable implementation</h1> */}
        <VisualizeMap ht={ht} />

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
          {renderForm === "insert" ? (
            <InsertForm ht={ht} setMap={setMap} toast={toast} />
          ) : renderForm === "delete" ? (
            <DeleteForm ht={ht} setMap={setMap} toast={toast} />
          ) : renderForm === "search" ? (
            <SearchForm ht={ht} toast={toast} />
          ) : renderForm === "increment" ? (
            <IncrementForm ht={ht} setMap={setMap} toast={toast} />
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
