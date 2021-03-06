import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './Navbar.module.scss';
import { CSSTransition } from 'react-transition-group';
import Industries from './NavigationTypes/Industries';

import Services from './NavigationTypes/Services';
import InsightsEvents from './NavigationTypes/InsightsEvents';
import About from './NavigationTypes/About';
import Careers from './NavigationTypes/Careers';
import Contact from './NavigationTypes/Contact';

import LogoDarkIcon from '../../public/logoDark.svg';
import LogoIcon from '../../public/logo.svg';
import { NavbarStateContext } from '../../state/navbarState';
const navTypes = [
  <Industries />,
  <Services />,
  <InsightsEvents />,
  <About />,
  <Careers />,
  <Contact />,
];
function Navbar() {
  const navbarRef = useRef();
  const { navbarThemeIsLight, setNavbarTheme, setNavbarRef } =
    useContext(NavbarStateContext);
  const [selectingLanguage, setSelectingLanguage] = useState(false);
  const [activeChild, setActiveChild] = useState(-1);
  const [prevActiveChild, setPrevActiveChild] = useState();
  const [showNavbar, setShowNavbar] = useState(true);
  const [navFixed, setNavFixed] = useState(false);
  const navTimeoutRef = useRef();
  const [lightThemeIsActive, setLightThemeIsActive] = useState();
  useEffect(() => {
    if (activeChild !== -1 || navbarThemeIsLight) {
      setLightThemeIsActive(true);
    } else {
      setLightThemeIsActive(false);
    }
  }, [activeChild, navbarThemeIsLight]);
  useEffect(() => {
    window.onscroll = (e) => {
      // console.log(e);
      // console.log(window.scrollY);
      if (window.scrollY > 900) {
        setNavFixed(true);
        setNavbarTheme('light');
        setShowNavbar(true);
      } else if (window.scrollY > 500) {
        setShowNavbar(false);
      } else {
        setNavFixed(false);
        setNavbarTheme('dark');
        setShowNavbar(true);
      }
    };
    setNavbarRef(navbarRef);
  }, []);
  function Wrapper({ children }) {
    return (
      <div
        onMouseEnter={() => {
          // console.log('in wrapper');
          clearTimeout(navTimeoutRef.current);
        }}
        onMouseLeave={() => {
          // console.log('leave wrapper');
          navTimeoutRef.current = setTimeout(() => {
            setActiveChild(-1);
          }, 500);
        }}
      >
        {children}
      </div>
    );
  }

  const properties = (index) => {
    let style = {
      color: lightThemeIsActive ? 'var(--text-color)' : 'white',
    };
    if (activeChild !== -1) {
      style = {
        ...style,
        color:
          activeChild === index ? 'var(--text-color)' : 'var(--color-mid-gray)',
      };
    }
    return {
      onMouseEnter: () => {
        clearTimeout(navTimeoutRef.current);
        setActiveChild(index);
      },
      onMouseLeave: () => {
        navTimeoutRef.current = setTimeout(() => {
          setActiveChild(-1);
        }, 500);
      },
      style,
    };
  };
  useEffect(() => {
    if (activeChild !== -1) {
      setPrevActiveChild(activeChild);
    }
  }, [activeChild]);
  return (
    <CSSTransition
      classNames={`navbar`}
      timeout={300}
      in={showNavbar}
      unmountOnExit
    >
      <div
        className={styles.container}
        style={{
          position: navFixed ? 'fixed' : 'absolute',
          backgroundColor: lightThemeIsActive ? 'white' : 'transparent',
        }}
        ref={navbarRef}
      >
        <nav className={styles.nav} onClick={() => setSelectingLanguage(false)}>
          <div className={styles.logo}>
            {lightThemeIsActive ? <LogoDarkIcon /> : <LogoIcon />}
          </div>
          <div
            className={styles.line}
            style={{
              backgroundColor: lightThemeIsActive
                ? 'var(--color-light-gray)'
                : 'white',
            }}
          ></div>
          <div className={styles.rest}>
            <p {...properties(0)}>industries</p>

            <p {...properties(1)}>services</p>
            <p {...properties(2)}>insights & events</p>
            <p className={styles.spacer}></p>
            <p {...properties(3)}>about</p>
            <p {...properties(4)}>careers</p>
            <p {...properties(5)}>contact us</p>
            <div className={styles.language}>
              <div
                className={styles.languageSelect}
                onClick={(e) => {
                  setSelectingLanguage(true);
                  e.stopPropagation();
                }}
                style={{
                  color: lightThemeIsActive ? 'var(--text-color)' : 'white',
                }}
              >
                en
              </div>

              <CSSTransition
                classNames="language-select"
                timeout={300}
                in={selectingLanguage}
                unmountOnExit
              >
                <div className={styles.languageOptions}>
                  <p className={styles.option}>en</p>
                  <p className={styles.divider}></p>
                  <p className={styles.option}>de</p>
                </div>
              </CSSTransition>
            </div>
          </div>
        </nav>

        <CSSTransition
          classNames="modal"
          timeout={300}
          in={activeChild !== -1}
          unmountOnExit
        >
          <div className={styles.modal}>
            <Wrapper>{navTypes[prevActiveChild]}</Wrapper>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

export default Navbar;
