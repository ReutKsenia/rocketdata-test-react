export default {
  login: (login, password) => {
    return new Promise((resolve, reject) => {
      if (login === 'user@gmail.com' && password === '12345678')
        resolve({ data: 'OK' })
      else resolve({ data: 'error' })
    })
  },
}
