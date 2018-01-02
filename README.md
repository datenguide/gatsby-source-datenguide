# gatsby-source-datenguide

Plugin for pulling data into [Gatsby](https://www.gatsbyjs.org) from
the [Datenguide API](https://github.com/datenguide/datenguide-backend)

## Install

`yarn add gatsby-source-datenguide`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-datenguide',
    options: {
      queryUrl: 'http://127.0.0.1:5000/\?query\=',
    }
  }
];
```

## How to query

You can query nodes created from Datenguide like the following:

```graphql
query StoriesQuery {
  allDistrict
}
```
