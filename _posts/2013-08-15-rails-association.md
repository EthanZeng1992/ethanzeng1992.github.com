---
layout: post 
title: Rails Polymorphic many-to-many
description: Setting up polymorphic many-to-many associations in Rails is more difficult, but only slightly.
---

####Understand <span class='emphasize'>[:source]</span> option of <span class='emphasize'>[has_one/has_many through]</span>

<div class='block-blue'> Sometimes, you want to use different names for different associations. If the name you want to use for an association on the model is not the same as the association on the <b>[:through]</b> model, you can use <b>[:source]</b> option to specify it.
</div>

<span class='circle'></span><b>Here is an example:</b> Assume we have three models: Pet, Dog and Dog::Breed

<pre>
<code id='code-customer'>
class Pet < ActiveRecord::Base
  has_many :dogs
end

class Dog < ActiveRecord::Base
  belongs_to :pet
  has_many :breeds
end

class Dog::Breed < ActiveRecord::Base
  belongs_to :dog
end
</code>
</pre>

<div class='block-blue'>In this case, we have chosen to namespace the <span class='emphasize'>Dog::Breed</span>, because we want to access <span class='emphasize'>Dog.find(123).breeds</span> as a nice and convenient association. Now, if we want to create a <span class='emphasize'>has_many :dog_breeds, :through => :dogs</span> association on Pet, we suddenly have a problem. Rails will not be able to find a <span class='emphasize'>:dog_breeds</span> association on Dog, so Rails can not possibly know which Dog association you want to use. With <span class='emphasize'>:source</span>, we are telling Rails to look for an association called :breeds on the Dog model, and use that.
</div>

<pre>
<code id='code-customer'>
class Pet < ActiveRecord::Base
  has_many :dogs
  has_many :dog_breeds, :through => :dogs, :source => :breeds
end
</code>
</pre>

####Understand <span class='emphasize'>:source_type</span> option of Polymorphic

<span class='circle'></span><b>Assume we have models: Tag, Tagging, Book and Movie</b>

<pre>
<code id='code-customer'>
class Tag < ActiveRecord::Base
  has_many :taggings, :dependent => :destroy
  has_many :books, :through => :tagings, :source => :taggable, :source_type => "Book"
  has_many :movies, :through => :tagings, :source => :taggable, :source_type => "Movie"     
end

class Tagging < ActiveRecord::Base
  belongs_to :taggable, :polymorphic => true
  belongs_to :tag
end

class Book < ActiveRecord::Base
  has_many :taggings, :as => :taggable
  has_many :tags, :through => :taggings
end
    
class Movie < ActiveRecord::Base
  has_many :taggings, :as => :taggable
  has_many :tags, :through => :taggings
end
</code>
</pre>

<div class='block-blue'>From the above code, we know that <span class='emphasize'>:source_type</span> option is used only when <span class='emphasize'>:source</span> option can not specify the target model in polymorphic.</div>

####Reference

<pre>
<code id='code-customer'>
<a href="http://www.brentmc79.com/posts/polymorphic-many-to-many-associations-in-rails">http://www.brentmc79.com/posts/polymorphic-many-to-many-associations-in-rails</a>
<a href="http://stackoverflow.com/questions/9500922/need-help-to-understand-source-type-option-of-has-one-has-many-through-of-rails">http://stackoverflow.com/questions/9500922/need-help-to-understand-source-type-option-of-has-one-has-many-through-of-rails</a>
</code>
</pre>

