import styles from "../../styles/Search.module.css";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import SearchComponent from "../../components/SearchComponent";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { useSession, getSession } from "next-auth/react";
import { storeUser } from "../../client/requests";
import SubcribeNotify from "../../components/SubcribeNotify";

const Search = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState();
  const [result, setResult] = useState([]);
  const [blockAccess, setBlockAccess] = useState(false);
  const resultRef = useRef();
  const botLoadRef = useRef(null);

  let loadInterval;
  const loader = (element) => {
    element.textContent = "";

    loadInterval = setInterval(() => {
      element.textContent += ".";

      if (element.textContent === "....") {
        element.textContent = "";
      }
    }, 300);
  };

  const typeText = (element, text) => {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    resultRef.current.scrollTop = resultRef.current.scrollHeight;
  };

  const chatStripe = (isAi, content) => {
    const uniqueKey = Date.now();
    return (
      <React.Fragment key={uniqueKey}>
        <div className={`${styles["result__item"]} + ${styles["user__item"]}`}>
          <div className={styles.result__profile}>
            <Image
              className={styles.profile}
              src={session.user.image}
              layout="fill"
              alt="image"
            />
          </div>
          <div className={styles.result__content}>{content}</div>
        </div>
        <div className={styles.result__item}>
          <div className={styles.result__profile}>
            <h4 className={styles.bot__profile}>
              J<span>A</span>
            </h4>
          </div>
          <div ref={botLoadRef} className={styles.result__content__bot}></div>
        </div>
      </React.Fragment>
    );
  };

  const handleQuery = async (value, query) => {
    setQuery(query);
    setResult((oldResult) => [...oldResult, value]);
  };

  useEffect(() => {
    if (botLoadRef?.current?.textContent == "") {
      loader(botLoadRef.current);
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
      const fetchRes = async () => {
        const response = await fetch("https://justaskk.vercel.app/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: query, user: session.user }),
        });

        clearInterval(loadInterval);
        botLoadRef.current.textContent = "";

        if (response.ok) {
          const data = await response.json();
          const parsedData = data.bot.trim();
          typeText(botLoadRef.current, parsedData);
          resultRef.current.scrollTop = resultRef.current.scrollHeight;
        } else if (response.status === 401) {
          setBlockAccess(true);
          botLoadRef.current.textContent = "something went wrong!";
          resultRef.current.scrollTop = resultRef.current.scrollHeight;
        } else {
          botLoadRef.current.textContent = "something went wrong!";
          resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
      };

      fetchRes();
    }
  });

  return (
    <div className={styles.search}>
      <Navbar />
      {blockAccess && <SubcribeNotify />}

      <div ref={resultRef} className={styles.search__results}>
        {query && result}
      </div>
      <div className={styles.search__bar}>
        <SearchComponent chatStripe={chatStripe} handleQuery={handleQuery} />
      </div>
    </div>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }

  await storeUser(session);

  return {
    props: { session },
  };
};
