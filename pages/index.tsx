import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Button,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { HashTable } from "../classes/HashTables";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import VisualizeMap from "../components/visualization";
import InsertForm from "../components/forms/insert";
import SearchForm from "../components/forms/search";
import DeleteForm from "../components/forms/delete";
import IncrementForm from "../components/forms/increment";
import { Navbar } from "../components/navbar";
import Footer from "../components/footer";


const ht = new HashTable(8) as HashTable;
const Home: NextPage = () => {
  const toast = useToast();
  const [renderForm, setRenderForm] = useState("insert");

  const [map, setMap] = useState(ht.toString()) as [
    string[],
    (value: string[]) => void
  ];
  const [tableLen, setTableLen] = useState(8);

  function handleReset() {
    setRenderForm("reset");
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
      <Navbar
        setMap={setMap}
        tableLen={tableLen}
        setTableLen={setTableLen}
        ht={ht}
      />
      <main className={styles.main}>
        {/* <h1 className={styles.title}>HashTable implementation</h1> */}
        <VisualizeMap ht={ht} renderForm={renderForm} />

        <Wrap direction="row" spacing={4} className="grid" justify="center">
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
      <Footer renderForm={renderForm} />
    </div>
  );
};

export default Home;
