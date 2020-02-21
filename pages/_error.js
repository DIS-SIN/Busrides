import Error from 'next/error'

/* 
    Using this custom error page to prevent the issues when a URL ends with a trailing slash
    Solution was found here: https://github.com/zeit/next.js/issues/5214#issuecomment-540562138
*/

const Page = ({ errorCode, stars }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>No error</div>
}

Page.getInitialProps = async ({req, res}) => {
  const errorCode = res.statusCode > 200 ? res.statusCode : false
  
  /*
    Handling ?= should be solved differently if you use dynamic routing,
    this will only remove the 404 for those urls.
  */
  let urlParts = req.url.split('?')
  if (urlParts[0].endsWith('/')) {
      urlParts[0] = urlParts[0].substring(0, urlParts[0].length - 1)
      res.writeHead(301, { Location: urlParts.join('?') })
      res.end()
  }

  return { errorCode }
}

export default Page