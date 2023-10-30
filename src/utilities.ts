export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\d\sa-zA-Z.,]).{8,}$/
