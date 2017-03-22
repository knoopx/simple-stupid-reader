import Axios from 'axios'

export default class Lobsters {
  static key = 'lobsters'
  static title = 'Lobste.rs'
  static color = '#ee0000'
  static isPaginable = true

  static async fetch(page) {
    const response = await Axios.get('https://lobste.rs/hottest.json', { params: { page } })
    return response.data.map(({ title, short_id, submitter_user, created_at, url }) => ({
      key: short_id,
      title,
      url,
      date: created_at,
      author: submitter_user.username
      // avatar: submitter_user.avatar_url
    }))
  }
}
