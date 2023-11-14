import styles from "../styles/Navbar.module.css";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navbarMenuRef = useRef();
  const closeRef = useRef();
  const { data: session } = useSession();

  const closeMobile = () => {
    setMobileOpen(false);
    if (window.innerWidth < 501) {
      navbarMenuRef.current.style.display = "none";
    }
  };

  const openMobile = () => {
    setMobileOpen(true);
    if (window.innerWidth < 501) {
      navbarMenuRef.current.style.display = "block";
    }
  };

  useEffect(() => {
    if (window.innerWidth < 501) {
      function handleClickOutside(event) {
        if (
          navbarMenuRef?.current &&
          mobileOpen &&
          !navbarMenuRef.current.contains(event.target) &&
          !closeRef.current.contains(event.target)
        ) {
          closeMobile();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [mobileOpen]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__left}>
          <Link href="/">
            <h2 className={styles.navbar__icon__text}>
              Just<span className={styles.navbar__icon__age}>Ask</span>
            </h2>
          </Link>
        </div>
        <div className={styles.navbar__right}>
          <div className={styles.navbar__mobile}>
            {mobileOpen ? (
              <svg
                ref={closeRef}
                onClick={closeMobile}
                className={styles.navbar__ham__icon}
              >
                <use xlinkHref="/svg/close-sharp.svg#close-sharp"></use>
              </svg>
            ) : (
              <svg onClick={openMobile} className={styles.navbar__ham__icon}>
                <use xlinkHref="/svg/menu-sharp.svg#menu-sharp"></use>
              </svg>
            )}
          </div>
          <ul ref={navbarMenuRef} className={styles.navbar__menu}>
            <Link href="/ask">
              <li>
                <button className={styles.navbar__btn}>Ask</button>
              </li>
            </Link>
            {session && (
              <Link href="/profile">
                <li className={styles.navbar__menu__item}>
                  <Image
                    src={session.user.image}
                    className={styles.profile_img}
                    layout="fill"
                    alt=""
                  />
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
