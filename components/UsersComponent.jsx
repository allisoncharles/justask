import styles from "../styles/UsersComponents.module.css";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Link from "next/link";

const UsersComponent = ({ usersRes }) => {
  const [users, setUsers] = useState(usersRes);

  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [recordsPerPage] = useState(8);

  const indexedOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexedOfLastRecord - recordsPerPage;

  // records to be displayed on the current page
  const currentRecords = users?.slice(indexOfFirstRecord, indexedOfLastRecord);

  // calculating the number of pages
  const nPages = Math.ceil(users?.length / recordsPerPage);

  useEffect(() => {
    if (email === "") {
      setUsers(usersRes);
    } else {
      setUsers(
        usersRes.filter((user) => {
          email.toLowerCase();
          return user.email.includes(email);
        })
      );
    }
  }, [email, usersRes]);

  return (
    <div className={styles.usersComponent}>
      <div className={styles.usersComponent__input__wrapper}>
        <input
          className={styles.usersComponent__input}
          type="search"
          placeholder="search..."
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <svg className={styles.usersComponent__search__icon}>
          <use xlinkHref="/svg/search.svg#search"></use>
        </svg>
      </div>

      <div className={styles.usersComponent__users__wrapper}>
        {currentRecords?.map((user, idx) => (
          <Link
            key={idx}
            href={{
              pathname: `/admin/${user.email}`,
              // query: user.email,
            }}
          >
            <div className={styles.usersComponent__users__item}>
              <div className={styles.usersComponent__users__text}>
                {user.fullname}
              </div>
              <div className={styles.usersComponent__users__text}>
                {user.email}
              </div>
              <div className={styles.usersComponent__users__text}>
                {user.access}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.pagination__wrapper}>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersComponent;
