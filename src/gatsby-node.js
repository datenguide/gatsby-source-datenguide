const axios = require(`axios`)
const crypto = require(`crypto`)

const get = (url, query) =>
  axios.get(
    `${url}${encodeURIComponent(query)}`
  )

exports.sourceNodes = async ({
  boundActionCreators,
  getNode,
  hasNodeChanged,
}, pluginOptions) => {
  const { createNode } = boundActionCreators
  const { queryUrl } = pluginOptions

  // Do the initial fetch:
  console.time(` --> fetch Datenguide data`)
  const result = await get(queryUrl, `
{
  districts
}
  `)
  console.timeEnd(` --> fetch Datenguide data`)

  // Create district nodes:

  result.data.data.districts.forEach((id) => {
    createNode({
      id,
      parent: null,
      children: [],
      internal: {
        type: `DgDistrict`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(id))
          .digest(`hex`),
      }
    })
  })

  return
}
