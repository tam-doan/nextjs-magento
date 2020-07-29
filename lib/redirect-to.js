import Router from 'next/router'

export default (destination, { res, status = 302 }) => {
  if (res) {
    // server
    res.writeHead(status, { Location: destination })
    res.end()
  } else {
    // browser
    Router.push(destination)
  }
}
