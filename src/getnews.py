#!/usr/bin/python
# -*- coding: UTF-8 -*-

import MySQLdb
import urllib2,urllib,os,json,time,cgi
from bs4 import BeautifulSoup
import socket
import sys
import httplib
reload(sys)   
sys.setdefaultencoding('utf8')
#获取文章分类信息
def getNews(url):
    print url
    xinwen = ''
    request = urllib2.Request(url)
    request.add_header('User-Agent','Mozilla/5.0 (Windows NT 6.1; \
        WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36')
    try:
        html = urllib2.urlopen(request)
    except urllib2.HTTPError, e:
        print e.code
    xinwen = {}
    
    soup = BeautifulSoup(html,'html.parser')
    xinwen['title'] = soup.select(".newsTitle")[0].get_text().encode('utf-8')
    xinwen["summary"] = ""
    for time in soup.select("div.message"):
        summary = time.get_text().decode('utf-8')
        xinwen["summary"] += summary[0:34]
    xinwen["text"] = ""
    for news in soup.select('div#news_content'):
        xinwen["text"] += news.encode('utf-8').replace("'","''")
        for img in news.select("img"):
            src = img.get("src")
            name = src.split("/")[-1]
            save_img("http://www.zhcw.com"+src,name,'/data/code/'+src.replace(name,''))
    return xinwen

#保存图片
def save_img(img_url,file_name,file_path='/data/code/'):
    #保存图片到磁盘文件夹 file_path中，默认为当前脚本运行目录下的 book\img文件夹
    try:
        if not os.path.exists(file_path):
            print '文件夹',file_path,'不存在，重新建立'
            #os.mkdir(file_path)
            os.makedirs(file_path)
        #获得图片后缀
        # file_suffix = os.path.splitext(img_url)[1]
        #拼接图片名（包含路径）
        filename = '{}{}{}'.format(file_path,os.sep,file_name)
       #下载图片，并保存到文件夹中
        urllib.urlretrieve(img_url,filename=filename)
    except IOError as e:
        print '文件操作失败',e
    except Exception as e:
        print '错误 ：',e
#插入数据库



def initNews():
    db = MySQLdb.connect("127.0.0.1","user_name","password","db_name" )

    request = urllib2.Request("http://www.zhcw.com/xinwen/caizhongxinwen/index_3.shtml")
    request.add_header('User-Agent','Mozilla/5.0 (Windows NT 6.1; \
        WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36')
    try:
        html = urllib2.urlopen(request)
    except urllib2.HTTPError, e:
        print e.code

    soup = BeautifulSoup(html,'html.parser')
    list = soup.select('ul.Nlistul a')
    for news in list:
        aa  = getNews("http://www.zhcw.com"+news.get("href"))
        print json.dumps(aa, encoding="UTF-8", ensure_ascii=False)
        id = insert(db,aa)
        insertContent(db,aa['text'],id)

    # exit()
    # aa  = getNews("http://www.zhcw.com/xinwen/caizhongxinwen-ssq/14575792.shtml")
    # print json.dumps(aa, encoding="UTF-8", ensure_ascii=False)
    # id = insert(db,aa)
    # insertContent(db,aa,id)

    db.close()


# 打开数据库连接
def insertContent(db,content,id):
     # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    # SQL 插入语句
    sql = "INSERT INTO article_content values ("+id+", '"+content+"')"
    print sql
    try:
    # 执行sql语句
        cursor.execute(sql)
    # 提交到数据库执行
        db.commit()
    except:
    # Rollback in case there is any error
        db.rollback()


def insert(db,aa):
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()

    # SQL 插入语句
    sql = "INSERT INTO articles(uid,title, summary, create_time) VALUES ('1', '"+aa['title']+"', '"+aa['summary']+"', "+str(int(round(time.time())))+")"
    print sql
    id = 0
    try:
    # 执行sql语句
        cursor.execute(sql)
        id = str(cursor.lastrowid) #最后插入行的主键ID 
    # 提交到数据库执行
        db.commit()
    except:
    # Rollback in case there is any error
        db.rollback()
    return id


initNews()