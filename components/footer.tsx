import styles from "../styles/Home.module.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiHomeAlt } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { HStack } from "@chakra-ui/react";
import {color} from "../lib/visualColor";


export default function Footer(props: { renderForm: string}) {
  const { renderForm } = props;
  var visColor = renderForm === "insert" ? color.insert
        : renderForm === "delete" ? color.delete
            : renderForm === "search" ? color.search
            : renderForm === "increment" ? color.increment
            : renderForm === "reset" ? color.reset
            : color.default;
  console.log(`text-[${visColor}]`);
  
  return (
      <section className="flex fixed bottom-0 flex-col w-full">
      <p className="text-right pb-4 mr-10">
        Made with ❤️ by{" "}
        <a
          href="https://rami-maalouf.vercel.app/"
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={`text-[${visColor}]`}
        >
          Rami
        </a>
      </p>

    <footer className={styles.footer}>
      <HStack spacing={20}>
        <a
          href="https://github.com/psycho-baller/open-seat-notifier"
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <BsGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/rami--maalouf/"
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <BsLinkedin />
        </a>
        <a
          href="https://rami-maalouf.vercel.app/"
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <BiHomeAlt />
        </a>
        <a
          href="mailto:rami.rami@ucalgary.ca"
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <HiOutlineMail />
        </a>
        <a
          href="https://www.youtube.com/channel/UCf9CoIzXxFcwlwaNuN5_1BQ"
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <AiFillYoutube />
        </a>
      </HStack>
    </footer>
    </section>

  );
}
