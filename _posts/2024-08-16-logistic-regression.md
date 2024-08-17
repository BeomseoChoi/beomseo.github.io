---
layout: default
title:  "Logistic Regression"
date:   2024-08-18 01:04:53 +0900
categories: posts
---
{% include post-header.html %}

$$
\text{Odds ratio} = O(x) = \frac{x}{1-x}
$$


$$
O(x) = 
\begin{cases}
0, & \text{if } x = 0 \\
1, & \text{if } x = 0.5 \\ 
\inf, & \text{if } x = 1 
\end{cases}
\text{, where } 0 \le x \le 1.
$$

$$
\text{Log-odds (Logit)} = \ln O(x) = \ln \frac{x}{1-x} 
$$

$$
L(x) = 
\begin{cases}
-\inf, & \text{if } x = 0 \\
0, & \text{if } x = 0.5 \\
\inf, & \text{if } x = 1
\end{cases}
\text{, where } 0 \le x \le 1.
$$

---

In binary classification, The random variables 

$$
y \in \{ 0,1 \}
$$

The problem is to find the probability that y equals 1 given $X$.

$$
P(y = 1 | X)
$$

We would like to solve this using a `Linear problem`. The linear problem is:

$$
\hat{y}=WX+b
$$

There, however, is a critical issue. The range of $P(y|X)$ is $[0, 1]$, but $\hat{y}$ is $[-\infty, \infty]$. We cannot interpret the $\hat{y}$ as the probability. The key to solving this problem is the `Logit transform`. The logit transform can transform the range $[0, 1]$ to $[-\infty, \infty]$.

Now that we have matched the ranges, the problem can be modeled as below:

$$
\ln \frac{p}{1-p} = WX + b \text{, where }p = P(y=1|X)
$$

This is the problem to find $\text{log-odds(logit)}$ using the linear model.

Solving the above equation for $x$, we get:

$$
p = \frac{1}{1 + \exp (-(WX+b))}
$$

If we define $f(x)$ as below,

$$
p = f(\hat{y}) = \frac{1}{1 + \exp (-\hat{y})}
$$

then the equation will be

$$
p = f(WX + b).
$$

We call the non-linear function $f(x)$ `Sigmoid function`, and the process of finding $x$ is known as `Logistic regression`.