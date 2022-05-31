import * as React from "react"
import {StaticImage} from "gatsby-plugin-image";
import {graphql, Link} from "gatsby";
import Seo from "../components/seo";

// query
export const query = graphql`
    query {
        currentBuildDate {
            currentDate
        }
        allNodeRecord(sort: {fields: field_start_time, order: DESC}) {
            edges {
                node {
                    title
                    drupal_internal__nid
                    field_place
                    field_number_participants
                    field_general_entry
                    field_weather
                    field_start_time(formatString: "YYYY/MM/DD")
                }
            }
        }
    }
`

// markup
const IndexPage = ({location, data}) => {
  return (
    <>
      <Seo />
      <section className="index_width">
        <div className="header">
          <div className="h_image">
            <StaticImage src="../images/site_logo.png" alt="LOGO" width="320" height="80"/>
          </div>
          <div className="h_data">
            <p>特定非営利活動法人名古屋シティフォレスター倶楽部</p>
            <p>{data.currentBuildDate.currentDate}</p>
            <p>nagoya-forester.or.jp</p>
          </div>
        </div>
        <div className="main">
          <h1 className="m_title">報告書印刷システム</h1>
          <table className="m_list_table">
            <thead>
            <tr>
              <th>
                印刷
              </th>
              <th>
                日時
              </th>
              <th>
                活動場所
              </th>
              <th>
                人数-部員:一般
              </th>
              <th>
                天気
              </th>
              <th>
                事業内容
              </th>
            </tr>
            </thead>
            <tbody>
            {data.allNodeRecord.edges.map(({node}) => (
              <tr>
                <td className="print_button">
                  <Link to={`/${node.drupal_internal__nid}/`}>
                    <span>
                      🖨️
                    </span>
                  </Link>
                </td>
                <td>
                  {node.field_start_time}
                </td>
                <td>
                  {node.field_place}
                </td>
                <td>
                  {node.field_number_participants}:{node.field_general_entry}
                </td>
                <td>
                  {node.field_weather}
                </td>
                <td>
                  {node.title}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="footer">
        </div>
      </section>
    </>
  )
}

export default IndexPage
