---
layout: post 
title: Ruby 元编程： 对象模型 
description: 《Ruby元编程》以案例形式循序渐进地介绍了Ruby特有的实用编程技巧,通过分析案例、讲解例题、回顾Ruby代码库的实现细节，这是我看后的个人笔记。
---

####Open classes [打开类]

<span class='circle'></span>有一个函数用来去掉字符串中的标点符号和特殊字符，自保留字母，数字，空格。

<pre>
<code id='code-customize'>
def to_alphanumeric(s)
  s.gsub /[^\w\s]/, ''
end
#unit test
require 'test/unit'
class ToAlphanumericTest &lt; Test::Unit::TestCase
  def test_strips_non_alphanumeric_characters
    assert_equal '3 the Magic Number', to_alphanumeric('#3, the *Magic, Number* ?')
  end
end
</code>
</pre>

<div class='block-blue'>
这个to_alphanumeric方法不太符合面向对象的思想，面向对象的做法是：让字符串本身来做这种转换，而不是把工作交给一个外部方法。可以打开String类，植入to_alphanumeric()方法，修改后的代码：
</div>

<pre>
<code id='code-customize'>
class String
  def to_alphanumeric
    gsub /[^\w\s]/, ''
  end
end
#unit test
require 'test/unit'
class StringExtensionsTest &lt; Test::Unit::TestCase
  def test_strips_non_alphanumeric_characters
    assert_equal '3 the Magic Number', '#3, the *Magic, Number* ?'.to_alphanumeric
  end
end
</code>
</pre>

<span class='circle'></span><b>这样的做法会对Ruby 的标准库造成"污染",也可能造成冲突,应该三思而后行,看下面的例子[替换]：</b>

<pre>
<code id='code-customize'>
def replace(array, from, to) 
  array.each_with_index do |e, i|
    array[i] = to if e == from
  end
end
#unit test
def test_replace
  book_topics = ['html', 'java', 'css']
  replace(book_topics, 'java', 'ruby')
  expected = ['html', 'ruby', 'css']
  assert_equal expected, book_topics
end
</code>
</pre>

<span class='circle'></span><b>按照[打开类]的思想，我们可以把这个方法移植到Array类中去：</b>

<pre>
<code id='code-customize'>
class Array
  def replace(from, to)
    each_with_index do |e, i|
      self[i] = to if e == from
    end
  end
end
#unit test
def test_replace
  book_topics = ['html', 'java', 'css']
  book_topics.replace('java', 'ruby')
  expected = ['html', 'ruby', 'css']
  assert_equal expected, book_topics
end
</code>
</pre>

<div class='block-blue'>
<p>可是测试失败了，我们来看Array 类中所有以"re"大头的方法：</p>
<p>[ ].methods.grep /^re/ # => [:replace, :reject, :reject!, :respond_to?, ...] 。</p>
<p>已经有replace方法了，产生冲突。</p>
</div>

####Self

<div class='block-blue'>
你的代码调用的是哪个对象的方法，那么这个对象就成为self
</div>

####实例变量

<div class='block-blue'>
Ruby 中对象的类和他的实例变量没有关系，当给实例变量赋值时，他们才生成，不调用obj.method()方法，那么obj对象根本不会有任何的实例变量。
</div>

####Module搞定命名冲突问题

<span class='circle'></span><b>使用命名空间可以轻松搞定命名冲突问题：</b>

<pre>
<code id='code-customize'>
module Bookworm
  class Text
    # ...
  end
end
</code>
</pre>

####方法调用过程

<span class='circle'></span><b>一：查找方法，二：执行方法.通过祖先链向上一级一级查找方法,来看一个复杂的例子：</b>

<pre>
<code id='code-customize'>
module Printable
  def print
    #...
  end
  def prepare_cover
    #...
  end
end
module Document
  def print_to_screen
    prepare_cover
    format_for_cover
    print
  end
  def format_for_screen
    #...
  end
  def print
    #...
  end
end
class Book
  include Document
  include Printable
  #...
end
</code>
</pre>

<span class='circle'></span><b>创建了一个对象，并调用print_to_screen()</b>

<pre>
<code id='code-customize'>
b = Book.new
b.print_to_screen
</code>
</pre>

<div class='block-blue'>

<p>根据bug管理系统，这段代码有问题：print_to_screen()方法没有调用正确的print()方法，除此之外没有其他信息。到底调用的是哪个print()方法呢？我们来看看Book的祖先链：</p>

<p>Book.ancestors # => [Book, Printable, Document, Object, Kernel, ...]</p>

<p>Printable在Document前面，所以是调用的Printable的print方法，而本意是调用Document的print方法，所以我们只需让Document的位置在Printable之前：</p> 

</div>
<pre>
<code id='code-customize'>
class Book
  include Printable
  include Document
  #...
end
</code>
</pre>

<span class='circle'></span><b>Book.ancestors # => [Book, Document, Printable, Object, Kernel, ...]</b>

