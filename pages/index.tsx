import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { NextPage } from "next";
import { withApollo } from '../lib/apollo';

interface IntialProps {
    greeting: string
}

interface Props extends IntialProps { }

const Home: NextPage<Props, IntialProps> = props => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            {props.greeting}
                        </p>
                    </a>
                </div>
            </main>
        </div>
    )
}

Home.getInitialProps = async () => ({
    greeting: 'Hello World'
})

export default withApollo({ ssr: true })(Home);
