import Layout from '../components/Layout';
import '../styles/index.css';

function MyApp({ Component, pageProps }: any) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>;
}

export default MyApp
