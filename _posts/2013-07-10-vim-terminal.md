---
layout: post 
title: Terminal & vim with solarized 
description: Tmux is a terminal multiplexer,Vim is a highly configurable text editor. using them on ubuntu is amazing!
---

####Getting Started

<span class="circle"></span><b>Install oh-my-zsh</b>

<pre>
<code id='code-customize'>
$ sudo apt-get install zsh 
$ wget --no-check-certificate http://install.ohmyz.sh -O - | sh
$ chsh -s `which zsh` #change your shell to zsh
</code>
</pre>

<span class="circle"></span><b>Install and config tmux</b>

<pre>
<code id='code-customize'>
$ sudo apt-get install tmux 
$ vim .tmux.conf
</code>
</pre>

<script src="https://gist.github.com/EthanZeng1992/4ad83707c65e344e5842.js"></script>

####Setup terminal and vim color: solarized

<span class="circle"></span><b>Setup terminal dircolors</b>

<pre>
<code id='code-customize'>
$ git clone git://github.com/seebi/dircolors-solarized.git
$ cp ~/dircolors-solarized/dircolors.256dark ~/.dircolors
$ eval 'dircolors .dircolors'
$ source .bashrc
</code>
</pre>

<span class="circle"></span><b>Setup terminal color:solarized</b>

<pre>
<code id='code-customize'>
$ git clone git://github.com/sigurdga/gnome-terminal-colors-solarized.git
$ cd gnome-terminal-colors-solarized
$ ./set_dark.sh
</code>
</pre>

<span class="circle"></span><b>Install vundleInstall vundle</b>

<pre>
<code id='code-customize'>
$ git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle
</code>
</pre>

<span class="circle"></span><b>Copy my_vimrc to '/etc/vim/vimrc'</b>

<pre>
<code id='code-customize'>
[my_vimrc]: https://github.com/EthanZeng1992/my-config-file/blob/master/my_vimrc
</code>
</pre>

<span class="circle"></span><b>Move solarized.vim to '/.vim/colors/'</b>

<pre>
<code id='code-customize'>
[solarized.vim]: https://github.com/EthanZeng1992/my-config-file/blob/master/solarized.vim
</code>
</pre>

<span class="circle"></span><b>Config vim in tmux color: solarized</b>

<pre>
<code id='code-customize'>
alias tmux="TERM=screen-256color-bce tmux" #Add this line to .zshrc
set -g default-terminal "screen-256color"  #add this line to .tmux.conf
</code>
</pre>

####Config neocomplcache work with "sudo vim"

<b>Comment these line in: < .vim/bundle/neocomplcache/plugin/neocomplcache.vim ></b>

<pre>
<code id='code-customize'>
if v:version < 702  
  echohl Error  
  echomsg 'neocomplcache does not work this version of Vim (' . v:version . ').'  
 #echohl None  
 #finish  
 #eseif $SUDO_USER != '' && $USER !=# $SUDO_USER  
 #    \ && $HOME !=# expand('~'.$USER)  
 #    \ && $HOME ==# expand('~'.$SUDO_USER)  
 #echohl Error  
 #echomsg 'neocomplcache disabled: "sudo vim" is detected and $HOME is set to '  
 #      \.'your user''s home. '  
 #      \.'You may want to use the sudo.vim plugin, the "-H" option '  
 #      \.'with "sudo" or set always_set_home in /etc/sudoers instead.'  
  echohl None  
  finish  
endif  
</code>
</pre>

####Reference

<pre>
<code id='code-customize'>
<a href="http://blog.csdn.net/angle_birds/article/details/11694325">http://blog.csdn.net/angle_birds/article/details/11694325</a>
<a href="http://happycasts.net/episodes/41">http://happycasts.net/episodes/41</a>
<a href="https://gist.github.com/tsabat/1498393">https://gist.github.com/tsabat/1498393</a>
<a href="http://rhnh.net/2011/08/20/vim-and-tmux-on-osx">http://rhnh.net/2011/08/20/vim-and-tmux-on-osx</a>
<a href="https://geakit.com/lilydjwg/dotvim/commit/eeae45ffcb380b6a8d5643f8a3c052c61bbf694e">https://geakit.com/lilydjwg/dotvim/commit/eeae45ffcb380b6a8d5643f8a3c052c61bbf694e</a>
</code>
</pre>
