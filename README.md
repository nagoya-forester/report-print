# **ReportPrint Website**
**Project name** report-print

This site is built with [Gatsby](https://gatsbyjs.org).

## 🖥️ System used
- Gatsby
    - yarn
- Drupal
    - Apache
    - MariaDB

## 🔰 Development
### 1.Install
To set up the development environment, install the [Gatsby CLI (yarn)](https://www.gatsbyjs.com/docs/glossary/yarn/) and then follow the steps below.
```shell
gatsby new report-print [GitHub Url]
```
### 2.Edit file
```shell
cd report-print/
```
Rename `.env.example` file to `.env.local` and edit this file.
```text
# .env.local
SITE_URL=https://report.nagoya-forester.or.jp
API_URL=https://app.nagoya-forester.or.jp
```
### 3.Start development
```shell
gatsby develop
```
Your site can be viewed at `http://localhost:8000`.

## Change schedule
- Add New layout
- Organize CSS
- Using Typescript
## Others
This site is developed using Windows Subsystem for Linux.
