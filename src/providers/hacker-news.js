import Axios from 'axios'

export default class HackerNews {
  static key = 'hacker-news'
  static title = 'Hacker News'
  static color = '#ff6600'
  static isPaginable = true

  static async fetch(page = 1) {
    const response = await Axios.get('https://node-hnapi.herokuapp.com/news', { params: { page } })
    return response.data.map(item => ({
      key: item.id,
      url: item.url,
      title: item.title,
      author: item.user,
      date: item.time,
      commentCount: item.comments_count
    }))
  }
}
