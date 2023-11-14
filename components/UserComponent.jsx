import styles from "../styles/UserComponent.module.css";
import { updateToken } from "../client/requests";
import { useState } from "react";

const UserComponent = ({ userRes }) => {
  const [access, setAccess] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const user = {
    email: userRes.email,
    access: +access,
  };

  const update = async () => {
    const res = await updateToken(user);
    if (res.status !== 201) {
      setError(true);
    } else {
      setSuccess(true);
    }
  };

  const changeInput = (e) => {
    setError(false);
    setSuccess(false);
    setAccess(e.target.value);
  };

  return (
    <div className={styles.userComponent}>
      <div className={styles.userComponent__wrapper}>
        <div className={styles.userComponent__container}>
          <div className={styles.userComponent__details}>
            <p className={styles.userComponent__name}>{userRes.fullname}</p>
            <p className={styles.userComponent__email}>{userRes.email}</p>
            <div className={styles.userComponent__tokens}>
              <p className={styles.userComponent__token}>Tokens Left:</p>
              <p className={styles.userComponent__token__value}>
                <input
                  className={styles.userComponent__token__input}
                  type="number"
                  placeholder={userRes.access}
                  onChange={(e) => changeInput(e)}
                />
              </p>
            </div>
          </div>

          <button
            onClick={() => update()}
            className={styles.userComponent__btn}
          >
            Update
          </button>
        </div>
      </div>
      {success && <p className={styles.success}>Updated Successfully!</p>}
      {error && <p className={styles.error}>Update Failed!</p>}
    </div>
  );
};

export default UserComponent;
