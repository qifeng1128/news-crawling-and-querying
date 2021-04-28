# news-crawling-and-querying
 爬取新闻网站内容并在前端搜索新闻信息

相关文件内容介绍：

spider文件夹：

1、爬取三个新闻网站的js代码（东方财富数据的爬取.js、中国广播网数据的爬取.js、网易体育数据的爬取.js）

2、连接数据库的js代码（mysql.js）

sql表格形式文件夹：

1、存储爬取网站信息的三张表格格式（存储东方财富网查询数据.sql、存储中国广播网查询数据.sql、存储网易体育网查询数据.sql）

2、存储用户查询字段信息的三张表格格式（爬取东方财富网.sql、爬取中国广播网.sql、爬取网易体育.sql）

public文件夹：

1、主页面（home.html）

2、三个网站信息查询页面（news_info.html、sports_info.html、finance_info.html）

3、三个网站的查询词热度分析的页面（news_search.html、sports_search.html、finance_search.html）

routes文件夹：

后端代码（index.js）