---
layout: post 
title: Oracle 数据类型和表操作 
description: 主要记录oracle数据库的基本数据类型以及如何创建表和对数据的一些基本操作。 
---

####Oracle 数据类型 

<p></p>

<table class='table-i'>
  <tr>
    <th class='th-i'>数据类型</th>
    <th class='th-i'>注释</th>
  </tr>
  <tr>
    <td class='td-i'>char()</td>
    <td class='td-i'> char定长，最大2000字符，char型查询速度快，效率高,长度固定且经常查询的字段选char；char(10)对于'小寒'，前四个字符放'小寒',后添6个空格补全。</td>
  </tr>
  <tr>
    <td class='td-i'>varchar2()</td>
    <td class='td-i'>(character large object),字符型大对象，最大4G。</td>
  </tr>
  <tr>
    <td class='td-i'>clob()</td>
    <td class='td-i'> char定长，最大2000字符，char型查询速度快，效率高,长度固定且经常查询的字段选char；char(10)对于'小寒'，前四个字符放'小寒',后添6个空格补全。</td>
  </tr>
  <tr>
    <td class='td-i'>number()</td>
    <td class='td-i'>-10^38 ~ 10^38;可表示整数也可表示小数，number(5,2)：-999.99 ~ 999.99; number(5)：-99999 ~ 99999。</td>
  </tr>
  <tr>
    <td class='td-i'>date()</td>
    <td class='td-i'>日期类型，包含年月日时分秒。</td>
  </tr>
  <tr>
    <td class='td-i'>timestamp()</td>
    <td class='td-i'>日期类型，相对date更精确，ms级别。</td>
  </tr>
  <tr>
    <td class='td-i'>blob()</td>
    <td class='td-i'>图片/声音类二进制数据，最大4G；图片/声音类文件通常存放在某个文件夹下，而数据库中只存路径，如果对数据安全性很高，则存于数据库中。</td>
  </tr>
</table>

<p></p>

####Oracle 常用表操作 

<span class='circle'></span><b>表操作：</b>创建，删除，修改

<pre>
<code id='code-customize'>
sql> create table student (xuehao number(4), //创建
sql>   name varchar2(20), sex char(2),
sql>   birthday date, salary number(7,2)
sql> ); 
sql> drop table student;                     //删除
sql> rename student to stu;                  //修改
</code>
</pre>

<span class='circle'></span><b>字段操作：</b>添加，修改，删除
<pre>
<code id='code-customize'>
sql> alter table student add (classid number(2));    //添加 
sql> alter table student modify (name varchar2(30)); //修改 
sql> alter table student drop column salary;         //删除 
</code>
</pre>

<span class='circle'></span><b>数据操作：</b>添加，修改，删除

<pre>
<code id='code-customize'>
sql> insert into student values ('A001', '张三', '男', '10');          //添加 
sql> insert into student (xuehao, name) values ('A001', '张三');       //添加 
sql> update student set sex='男', salary=salary/2 where xuehao='A001'; //修改
sql> delete from student where xuehao='A001';                          //删除 
sql> delete from student;        //删除所有 
sql> truncate table student;     //删除所有 
</code>
</pre>

<div class='block-blue'>
其中truncate table student; 删除表中的所有记录，表结构还在，不写日志，无法找回删除记录，但是删除速度快；delete from student;删除后可以恢复数据，通过设置回滚点：
</div>

<pre>
<code id='code-customize'>
sql> savepoint point1; 
sql> delete from student; 
sql> rollback to point1; 
</code>
</pre>

