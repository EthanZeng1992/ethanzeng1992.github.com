---
layout: post 
title: Oracle 之数据查询
description: 主要记录oracle数据库的查询技巧，对于一个数据库管理员的能力主要体现在对数据的查询上。
---

####基本查询

<span class='circle'></span><b>查询数据量，取消重复数据，取别名</b>

<pre>
<code id='code-customize'>
sql> select count(*) from users;        //查询数据量 
sql> select distinct job from table1;   //取消重复数据 
sql> select sal*12 "年工资" from table1; //取别名 
</code>
</pre>

<span class='circle'></span><b>对NULL值的处理</b>

<div class='block-blue'>
 查询表达式中只要有一个列为null值，则整个表达式为null值，例：sal * 12 + comm * 12;若comm为null，则整个表达式为null值；可用nvl()函数来解决，sal * 12 + nvl(comm, 0) * 12, 则若comm为null，则用0代替，若不为null,则使用原值。
</div>

<pre>
<code id='code-customize'>
sql> select sal*12+nvl(comm, 0) "年工资" from table1; 
</code>
</pre>

<span class='circle'></span><b>对日期的查询: </b><span class='emphasize'>注意日期的格式</span>

<pre>
<code id='code-customize'>
sql> select ename, hiredate from table1 where hiredate > '1-1月-1982'; 
</code>
</pre>

<span class='circle'></span><b>like in or and操作符</b>: % 表示任意多个字符； _ 表示任意单个字符

<pre>
<code id='code-customize'>
sql> select ename, sal from table1 where ename like 's%'; 
sql> select ename, sal from table1 where empno in (123, 234, 456); 
sql> select ename, sal from table1 where (sal>500 or job='MANAGER') and ename like 's%'; 
</code>
</pre>

<span class='circle'></span><b>order by 排序: </b> 多重排序，使用别名排序

<pre>
<code id='code-customize'>
sql> select ename, sal from table1 order by sal asc/desc; 
sql> select ename, sal from table1 order by deptno, sal desc; //多重排序 
sql> select ename, sal*12 '年薪' from table1 order by '年薪';   //使用别名排序 
</code>
</pre>

####复杂查询

<span class='circle'></span><b>分组函数 max min avg sum count</b>: 分组函数只能出现在选择列表，having, order by子句中。 

<pre>
<code id='code-customize'>
sql> select max(sal) from table1; 
sql> select ename, sal from table1 where sal = (select max(sal) from emp);
</code>
</pre>

<div class='block-blue'>
<b>group by 和 having</b>: group by 用于对查询的结果分组统计； having 用于限制分组显示结果; 同时包含group by, having, order by时的顺序为group by, having, order by. 
</div>

<span class='circle'></span><b>案例: </b>[每个部门的平均工资], [每个部门每种岗位的平均工资], [平均工资低于2000的部门]

<pre>
<code id='code-customize'>
sql> select avg(sal), deptno from table1 group by deptno;          //每个部门的平均工资 
sql> select avg(sal), deptno, job from table1 group by deptno, job;//每个部门每种岗位的平均工资 
sql> select avg(sal), deptno from table1 group by deptno having avg(sal) > 2000; //平均工资低于2000的部门 
</code>
</pre>

####多表查询

<p></p>

<pre>
<code id='code-customize'>
sql> select a1.ename, a2.dname from table1 a1, dept a2 where a1.deptno = a2.deptno;
sql> select a1.ename, a1.sal, a2.grade from table1 a1, salgrade a2 where a1.sal between a2.losal and a2.hisal;
</code>
</pre>

<span class='circle'></span><b>自连接: </b> 指在同一张表的连接查询 

<pre>
<code id='code-customize'>
sql> select worker.ename, boss.ename from table1 worker, table1 boss where worker.mgr=boss.empno and worker.ename='FORD';
</code>
</pre>

####子查询

<div class='block-blue'>
指嵌入在其它sql语句中的select语句，单行子查询：只返回一行数据的子查询； 多行子查询：返回多行数据的子查询；多列子查询：返回多列的子查询。
</div>

<pre>
<code id='code-customize'>
//和部门10的工作相同的雇员信息
sql> select * from table1 where job in (select distinct job from table1 where deptno=10);
//工资比部门30的员工工资都高的员工信息
sql> select * from table1 where sal > all (select sal from table1 where deptno=30);
sql> select * from table1 where sal > (select max(sal) from table1 where deptno=30);
//工资比部门30的至少一个员工工资高的员工信息
sql> select * from table1 where sal > any (select sal from table1 where deptno=30);
sql> select * from table1 where sal > (select min(sal) from table1 where deptno=30);
//与SMITH的部门和岗位相同的雇员信息
sql> select * from table1 where (deptno, job) = (select deptno, job from table1 where ename = 'SMITH'); 
</code>
</pre>

####分页查询

<p></p>

<pre>
<code id='code-customize'>
sql> select * from table1;                                                      //1 
sql> select a1.*, rownum rn from (select * from table1) a1;                     //2 
sql> select a1.*, rownum rn from (select * from table1) a1 where rownum <= 10;  //3 
sql> select * from (3) where rn >= 6; 
</code>
</pre>

<div class='block-red'>
只需要部分信息或者需要排序时，只需要改动最里层子查询即可。
</div>

####合并查询

<span class='circle'></span><b>union, union all, intersect, minus</b>

<pre>
<code id='code-customize'>
sql> select ename from table1 where sal > 2500 union select ename from table1 where job = 'MANAGER'; 
</code>
</pre>

<div class='block-blue'>
union 取两个结果集的并集，去掉结果中重复的数据； union all 取得两个结果集的并集，不去掉重复的数据； intersect 取得两结果集的交集； minus 取得两个结果集的差集，只显示存在第一个集合中，而不存在第二个集合中的数据。 
</div>


