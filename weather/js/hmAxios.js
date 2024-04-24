function hmAxios(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    if (config.params) {
      const params = new URLSearchParams(config.params)
      const query = params.toString()
      config.url += `?${query}`
    }
    xhr.open(config.method || 'GET', config.url)

    xhr.addEventListener('loadend', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject(new Error(xhr.response))
      }
    })
    if (config.data) {
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(config.data))
    } else {
      xhr.send()
    }
  })
}