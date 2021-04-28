var express = require('express');
var router = express.Router();
var mysql = require('../mysql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* 中国广播网查询 */
// 用户查询返回新闻
router.get('/get_news_info', function(request, response) {
    //sql字符串和参数
    console.log(request);

    var searchSql = 'INSERT INTO newssearch(title,publish_date,author,content)' + ' VALUES (?,?,?,?)'
    var searchSql_Params = [request.query.title,request.query.publish_time,request.query.author,request.query.content] 
    mysql.query(searchSql, searchSql_Params, function(err, result, fields) {
        if (err) console.log(err)
    })

    var fetchSql = "select url,source,title,author,cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date from news_info where title like '%" +
    request.query.title + "%' and author like '%" + 
    request.query.author + "%' and content like '%" +
    request.query.content + "%' and publish_date like '%" + 
    request.query.publish_time + "%'";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.status = true;
        response.write(JSON.stringify(result));
        response.end()
    })
})

// 用户不查询，返回推荐的最新新闻
router.get('/get_recommand_news_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select url,source,title,author,cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date from news_info order by publish_date DESC limit 5";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.status = true;
        response.write(JSON.stringify(result));
        response.end()
    })
})

// 返回标题查询词的热度分析
router.get('/news_title_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select title,count(*) from newssearch where title != '' group by title order by count(*) desc";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['title']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

// 返回内容查询词的热度分析
router.get('/news_content_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select content,count(*) from newssearch where content != '' group by content order by count(*) desc";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['content']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

// 返回查询词的时间热度分析
router.get('/news_time_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date,count(*) from news_info where title like '%" + 
    request.query.title  + "%' group by publish_date order by publish_date";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        console.log(result)
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['new_publish_date']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

/* 网易体育查询 */
// 用户查询返回新闻
router.get('/get_sports_info', function(request, response) {
    //sql字符串和参数
    console.log(request);

    var searchSql = 'INSERT INTO sportssearch(title,publish_date,author,editor,content)' + ' VALUES (?,?,?,?,?)'
    var searchSql_Params = [request.query.title,request.query.publish_time,request.query.author,request.query.editor,request.query.content] 
    mysql.query(searchSql, searchSql_Params, function(err, result, fields) {
        if (err) console.log(err)
    })

    var fetchSql = "select url,source,title,author,editor,cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date from sports_info where title like '%" +
    request.query.title + "%' and author like '%" + 
    request.query.author + "%' and content like '%" +
    request.query.content + "%' and publish_date like '%" + 
    request.query.publish_time + "%'";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.status = true;
        response.write(JSON.stringify(result));
        response.end()
    })
})

// 用户不查询，返回推荐的最新新闻
router.get('/get_recommand_sports_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select url,source,title,author,editor,cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date from sports_info order by publish_date DESC limit 5";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.status = true;
        response.write(JSON.stringify(result));
        response.end()
    })
})

// 返回标题查询词的热度分析
router.get('/sports_title_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select title,count(*) from sportssearch where title != '' group by title order by count(*) desc";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['title']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

// 返回内容查询词的热度分析
router.get('/sports_content_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select content,count(*) from sportssearch where content != '' group by content order by count(*) desc";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['content']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

// 返回查询词的时间热度分析
router.get('/sports_time_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date,count(*) from sports_info where title like '%" + 
    request.query.title  + "%' group by publish_date order by publish_date";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        console.log(result)
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['new_publish_date']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

/* 东方财富网查询 */
// 用户查询返回新闻
router.get('/get_finance_info', function(request, response) {
    //sql字符串和参数
    console.log(request);

    var searchSql = 'INSERT INTO financesearch(title,publish_date,editor,description,content)' + ' VALUES (?,?,?,?,?)'
    var searchSql_Params = [request.query.title,request.query.publish_time,request.query.editor,request.query.description,request.query.content] 
    mysql.query(searchSql, searchSql_Params, function(err, result, fields) {
        if (err) console.log(err)
    })

    var fetchSql = "select url,source,title,editor,cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date,participate_number from finance_info where title like '%" +
    request.query.title + "%' and editor like '%" + 
    request.query.editor + "%' and content like '%" +
    request.query.content + "%' and publish_date like '%" + 
    request.query.publish_time + "%' and description like '%" + 
    request.query.description + "%'";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.status = true;
        response.write(JSON.stringify(result));
        response.end()
    })
})

// 用户不查询，返回推荐的最新新闻
router.get('/get_recommand_finance_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select url,source,title,editor,cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date,participate_number from finance_info order by publish_date DESC limit 5";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.status = true;
        response.write(JSON.stringify(result));
        response.end()
    })
})

// 返回标题查询词的热度分析
router.get('/finance_title_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select title,count(*) from financesearch where title != '' group by title order by count(*) desc";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['title']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

// 返回内容查询词的热度分析
router.get('/finance_content_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select content,count(*) from financesearch where content != '' group by content order by count(*) desc";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['content']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

// 返回查询词的时间热度分析
router.get('/finance_time_info', function(request, response) {
    //sql字符串和参数
    console.log(request);
    var fetchSql = "select cast(date_format(publish_date,'%Y-%m-%d') as char) as new_publish_date,count(*) from finance_info where title like '%" + 
    request.query.title  + "%' group by publish_date order by publish_date";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        var search = [];
        var the_count = [];
        console.log(result)
        for (var i = 0; i < result.length; i++) {
            search[i] = (result[i]['new_publish_date']).toString();
            the_count[i] = result[i]['count(*)'];
        }
        var tempt = [search,the_count]
        response.write(JSON.stringify(tempt));
        response.end()
    })
})

module.exports = router;