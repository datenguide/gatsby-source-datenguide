const axios = require(`axios`)
const crypto = require(`crypto`)

const rootQuery = `
{
  districts
}`

const detailsQuery = id => `
{
  district(id: "${id}") {
    area
    munis
    name
  }
}`

const get = (url, query) =>
  axios.get(`${url}${encodeURIComponent(query)}`)

exports.sourceNodes = async ({
  boundActionCreators,
  getNode,
  hasNodeChanged,
}, pluginOptions) => {
  const { createNode } = boundActionCreators
  const { queryUrl } = pluginOptions

  console.time(` --> fetch Datenguide data`)

  // Fetch district identifiers:
  const ids = await get(queryUrl, rootQuery)
  const { districts } = ids.data.data

  // Recursively fetch district nodes:
  // (async fetching is currently not properly supported by the API)
  const getDetails = async (i) => {
    const details = await get(queryUrl, detailsQuery(districts[i]))
    const { district } = details.data.data
    
    createNode({
      ...district,
      id: districts[i],
      parent: null,
      children: [],
      internal: {
        type: `District`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(district))
          .digest(`hex`),
      }
    })

    if (++i < districts.length) {
      return getDetails(i)
    }
  }
  
  await getDetails(0)

  console.timeEnd(` --> fetch Datenguide data`)

  return
}
