import Axios from 'axios'
import shortid from 'shortid'

export default class Lobsters {
  title = 'Lobsters'

  constructor() {
    this.key = shortid.generate()
  }

  async fetchItems() {
    const response = await Axios.get('https://lobste.rs/hottest.json')
    return response.data.map(({ title, short_id, submitter_user, url }) => ({
      key: short_id,
      title,
      url,
      author: submitter_user.username,
      avatar: submitter_user.avatar_url
    }))
  }
}
