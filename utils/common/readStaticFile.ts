export default function readStaticFile ({
  url
}: {
  url: string
}) {
  return new Promise((resolve) => {
    const rawFile = new XMLHttpRequest()
    rawFile.open('GET', url, false)
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          resolve(rawFile.responseText)
        }
      }
    }
    rawFile.send(null)
  })
}
