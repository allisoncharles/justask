import styles from "../styles/SearchComponent.module.css";
import { useRef } from "react";

const SearchComponent = (props) => {
  const { handleQuery, chatStripe } = props;

  const formRef = useRef();
  const searchDetailRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchDetailRef.current.value == "") return;
    const userQuery = searchDetailRef.current.value;
    searchDetailRef.current.value = "";
    let res = chatStripe(true, userQuery);
    handleQuery(res, userQuery);
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (searchDetailRef.current.value.trim() == "") return;
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.searchComponent}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles.search__form}
        onKeyUp={(e) => handleKeyUp(e)}
      >
        <textarea
          placeholder="Just ask..."
          ref={searchDetailRef}
          className={styles.search__area}
          name="prompt"
          row="1"
          cols="1"
        />
        <button className={styles.search__button} type="submit">
          <svg className={styles.search__icon} width="30" height="24">
            <use
              xlinkHref="/svg/paper-airplane.svg#paper-airplane"
              aria-hidden="true"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
