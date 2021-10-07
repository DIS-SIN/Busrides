import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang={this.props["__NEXT_DATA__"].props.pageProps.locale}>
                <Head>
                    <link href="/favicon.ico" rel="icon" type="image/x-icon" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="/theme/GCWeb/css/theme.min.css" />
                    <noscript><link rel="stylesheet" href="/theme/GCWeb/wet-boew/css/noscript.min.css"/></noscript>
                </Head>
                <body vocab="http://schema.org/" resource="#wb-webpage" typeof="WebPage">
                    <Main />
                    <NextScript />

                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.js"></script>
                    <script src="/theme/wet-boew/js/wet-boew.min.js"></script>
                    <script src="/theme/GCWeb/js/theme.min.js"></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument