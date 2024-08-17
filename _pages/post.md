---
layout: default
title: Pages
permalink: /posts/
---

<div class="post-list">
    {% for post in site.posts %}
        <h2 class="font-weight-normal"><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }} </a></h2>
        <p>{{ post.date | date: '%B %d, %Y' }}</p>
        <hr/>
    {% endfor %}
</div>