﻿---
layout: index
title: lisblog
author: tonlog
---


<h4>最新速递</h4>

{% for post in site.posts limit: 5 %}
+ <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
  <label>{{ post.date | date_to_string }}</label>
{% endfor %}

{% for post in site.posts limit: 2 %}
<hr/>
> 我的LISt:
> {{ post.content }}
</br>

<hr/>
{% endfor %}

<br/>


<label>
> [View More LISblogs In LISt.]({{ site.baseurl }}all.html)
-----------------------------------------------------------

</label>
