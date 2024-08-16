---
layout: default
title: Pages
permalink: /posts/
---

<ul>
    {% for post in site.posts %}
        <li class="no-dots">
            <h2 class="post-title"><a class="post-link" href="{{ post.url }}">{{ post.title }} </a></h2>
            <p>{{ post.date | date: '%B %d, %Y' }}</p>
        </li>
    {% endfor %}
</ul>
