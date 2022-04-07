const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const record = await graphql(`
    query {
      allNodeRecord(sort: { fields: field_start_time, order: DESC }) {
        edges {
          node {
            id
            drupal_internal__nid
            field_start_time(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  `)
  if (record.errors) {
    reporter.panicOnBuild(`There was an error in the GraphQL query.`)
  }
  record.data.allNodeRecord.edges.forEach((edge) => {
    createPage({
      path: `/${edge.node.drupal_internal__nid}/`,
      component: path.resolve(`./src/templates/print-screen.js`),
      context: {
        id: edge.node.id,
      },
    })
  })
}
