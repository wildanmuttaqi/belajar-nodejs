var axios = require('axios')
var url = 'https://jsonplaceholder.typicode.com/users';

exports.getApi = async (params = {}) => {
  const { data } = await axios.get(url, { params })
  return data
}
