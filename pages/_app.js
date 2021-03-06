import Head from 'next/head';
import Footer from '../components/Common/Footer';
import Navbar from '../components/Common/Navbar';
import '../styles/globals.css';
import { NavbarStateProvider } from '../state/navbarState';
function MyApp({ Component, pageProps }) {
  return (
    <NavbarStateProvider>
      <div>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <title>Nagarro</title>
          <link rel="icon" href="/nag.jpg" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </NavbarStateProvider>
  );
}

export default MyApp;
