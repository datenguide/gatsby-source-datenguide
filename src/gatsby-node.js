const axios = require(`axios`)
const crypto = require(`crypto`)

const get = query =>
  axios.get(
    `http://127.0.0.1:5000/\?query\=${encodeURIComponent(query)}`
  )

exports.sourceNodes = async ({
  boundActionCreators,
  getNode,
  hasNodeChanged,
}) => {
  const { createNode } = boundActionCreators

  // Do the initial fetch:

  console.time(` --> fetch Datenguide data`)
  const result = await get(`
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
