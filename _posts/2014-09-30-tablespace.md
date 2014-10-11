---
layout: post 
title: Oracle 之表空间
description: oracle数据库被划分成称作为表空间的逻辑区域,形成oracle数据库的逻辑结构,oracle逻辑结构包括：表空间，段，区，块。oracle数据库能够有一个或多个表空间,而一个表空间则对应着一个或多个物理的数据库文件。表空间是oracle数据库恢复的最小单位,容纳着许多数据库实体,如表、视图、索引、聚簇、回退段和临时段等。 
---

####Oracle 表空间作用 

<div class='block-blue'>
dba可以将不同数据类型部署到不同的位置，有利于控制数据库占用的磁盘空间，有利于提高i/o性能，有利于备份和恢复管理操作。
</div>

####Oracle 表空间常用操作

<span class="circle"></span><b>建立表空间，使用表空间，表空间脱机/联机，表空间只读，删除表空间</b>

<pre>
<code id='code-customize'>
sql> create tablespace sp1 datafile 'd:\sp1.dbf' size 20m uniform size 128k;   //建表空间20m,区大小为128k 
sql> create table mypart(deptno number(4), dname varchar2(14)) tablespace sp1; //在表空间建表 
sql> alter tablespace tablespace_name offline;   //表空间脱机 
sql> alter tablespace tablespace_name online;    //表空间联机
sql> alter tablespace tablespace_name read only; //表空间只读
sql> drop tablespace tablespace_name including contents and datafiles; //删除表空间 
</code>
</pre>

####扩展表空间

<span class="circle"></span><b>增加数据文件，增加数据文件的大小，设置文件的自动增长</b>

<pre>
<code id='code-customize'>
sql> alter tablespace sp1 add datafile 'd:\sp1.dbf' size 20m; //增加数据文件 
sql> alter tablespace sp1 datafile 'd:\sp1.dbf' resize 40m;   //增加数据文件的大小 
sql> alter tablespace sp1 datafile 'd:\sp1.dbf' autoextend on next 10m maxsize 500m; //设置文件的自动增长
</code>
</pre>

####移动数据文件

<span class="circle"></span>若数据文件所在的磁盘损坏时，需要将这些文件的副本移动到其他的磁盘，然后恢复。移动数据文件的步骤：脱机-->移动-->修改表空间-->联机

<pre>
<code id='code-customize'>
sql> alter tablespace sp1 offline;        //脱机 
sql> host move 'd:\sp1.dbf' 'c:\sp1.dbf'; //移动 
sql> alter tablespace sp1 rename datafile 'd:\sp1.dbf' to 'c:\sp1.dbf'; //修改表空间逻辑 
sql> alter tablespace sp1 online; //联机
</code>
</pre>



