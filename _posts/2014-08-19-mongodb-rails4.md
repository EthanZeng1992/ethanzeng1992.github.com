---
layout: post 
title: MongoDB and Mongoid for rails4 
description: Today we are going to walk through installing it on Ubuntu and setting up Rails with MongoDB, Use Mongoid to replace ActiveRecord.
---

####Getting Started

<span class="circle"></span><b>install MongoDB from their official repository</b>

<pre>
<code id='code-customize'>
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
$ sudo echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
$ sudo apt-get -y update
$ sudo apt-get -y install mongodb-10gen
</code>
</pre>

<div class="block-red">
  <p><b>Notice:</b></p>

  if you got 'tee: /etc/apt/sources.list.d/10gen.list: 权限不够' ; you should got super user: '$ sudo su' ; then try above command again.
</div>

<span class="circle"></span><b>Make sure you installed MongoDB, running the commands below will show corresponging infomations</b>

<pre> 
<code id='code-customize'>
$ mongod
$ mongo
MongoDB shell version: 2.4.10
connecting to: test
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        http://docs.mongodb.org/
Questions? Try the support group
        http://groups.google.com/group/mongodb-user
&gt;
</code>
</pre>

<span class="circle"></span><b>Generate Rails application and change Gemfile</b>

<pre>
<code id='code-customize'>
# Generate Rails application
$ rails new myapp --skip-active-record

# Change Gemfile
# remove 
# Use sqlite3 as the database for Active Record
gem 'sqlite3'

# add
# mongodb
gem 'mongoid', git: 'git://github.com/mongoid/mongoid.git'
</code>
</pre>

<span class="circle"></span><b>Generate the Mongoid configuration file</b>

<pre>
<code id='code-customize'>
$ rails g mongoid:config
</code>
</pre>

