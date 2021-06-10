module.exports = {
  IsValidiateUsername: (username) => {
    return /^[a-zA-Z0-9_]{4,16}$/.test(username)
  },

  IsValidiatePassword: (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
  },


}