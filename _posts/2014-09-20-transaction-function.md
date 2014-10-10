---
layout: post 
title: Oracle 事务处理及常用函数 
description: 事务处理是所有大型数据库产品的一个关键问题，各数据库厂商都在这个方面花费了很大精力，不同的事务处理方式会导致数据库性能和功能上的巨大差异。事务处理也是数据库管理员与数据库应用程序开发人员必须深刻理解的一个问题，对这个问题的疏忽可能会导致应用程序逻辑错误以及效率低下。 
---

####Oracle 事务处理 

<div class="block-blue">
事务可以看作是由对数据库的若干操作组成的一个单元，这些操作要么都完成，要么都取消，从而保证数据满足一致性的要求。事务的一个典型例子是银行中的转帐操作，帐户A把一定数量的款项转到帐户B上，这个操作包括两个步骤，一个是从帐户A上把存款减去一定数量，二是在帐户B上把存款加上相同的数量。这两个步骤显然要么都完成，要么都取消，否则银行就会受损失。显然，这个转帐操作中的两个步骤就构成一个事务。
</div>

<span class="circle"></span><b>锁</b>: 当执行事务操作时，oracle会在被作用的表上加锁，防止其它用户改表的结构。首先应用进程先检查是否有等待队列，若有等待队列则直接排队等候，若没有则检查锁的状态，看是否可以对表进行操作。

<span class="circle"></span><b>提交事务</b>: 当执行commit语句后，可以提交事务，会确认事务的变化，结束事务，删除保存点，释放锁。

<span class="circle"></span><b>只读事务</b>: set transaction read only; 只允许执行查询操作，而不允许执行任何其他dml操作的事务，使用只读事务可以确保用户只能取得某时间点的数据。 

####Oracle 常用函数

<span class="circle"></span><b>字符函数</b>

<pre>
<code id='code-customize'>
lower(char)        //转化为小写格式
upper(char)        //转化为大写格式
length(char)       //返回字符串的长度
substr(char, m, n) //从m个字符开始取n个字符
char1 || char2     //连接字符串
replace(char1, search_string, replace_string) //替换字符串
</code>
</pre>

<span class="circle"></span><b>数学函数</b>

<pre>
<code id='code-customize'>
round(n, m) //四舍五入，保留m为小数；若m为负数，则四舍五入到小数点前m位
trunc(n, m) //截取数字，m为正则截取到小数点的m位；m为负数则截取到小数点前m位
floor(n)    //返回小于或者等于n的最大整数
ceil(n)     //返回大于或者等于n的最小整数
mod(n, m)   //返回n/m的余数
</code>
</pre>

<span class="circle"></span><b>日期函数</b>

<pre>
<code id='code-customize'>
sysdate             //返回系统时间
add_months(date, n) //时间date加n个月   
sql> select * from emp where sysdate > add_months(hiredate, 8);
last_day(date)      //返回指定日期那个月的倒数第一天
</code>
</pre>

