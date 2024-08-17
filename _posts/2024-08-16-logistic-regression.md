---
layout: default
title:  "Logistic Regression"
date:   2024-08-18 01:04:53 +0900
categories: posts
---
{% include post-header.html %}

Logistic regression이란 베르누이 분포를 따르는 종속변수를 예측하는 확률적 판별 모델(discriminative model)입니다. 입력 변수를 선형 변환하여 logit 값을 예측하고 시그모이드(sigmoid) 함수를 통과시켜 관심 있는 사건의 확률을 얻을 수 있습니다. 여기서 logit이란 관심있는 사건의 상대적 비율인 odds ratio에 log를 씌운 값입니다. 비가 올 확률이 75%, 비가 오지 않을 확률이 25%라면 3:1로 odds ratio는 3입니다.

logit을 예측하는 이유는 선형 변환 후 종속변수 값의 범위가 실수 전체 범위이기 때문에, 결과 값을 확률로 해석할 수 없기 때문입니다. logit 함수는 $\mathbb{R} \rightarrow [0, 1]$인 함수이며 역함수가 존재하고, logit 함수의 역함수를 시그모이드 함수라고 부릅니다. 따라서 실수 전체 범위를 갖는 logit 값을 선형 변환으로 예측하고 시그모이드 함수를 통과시켜 관심있는 사건의 확률을 구합니다.





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
P(y = 1 \vert X)
$$

We would like to solve this using a `Linear problem`. The linear problem is:

$$
\hat{y}=WX+b
$$

There, however, is a critical issue. The range of $P(y \vert X)$ is $[0, 1]$, but $\hat{y}$ is $[-\infty, \infty]$. We cannot interpret the $\hat{y}$ as the probability. The key to solving this problem is the `Logit transform`. The logit transform can transform the range $[0, 1]$ to $[-\infty, \infty]$.


Now that we have matched the ranges, the problem can be modeled as below:

$$
\ln \frac{p}{1-p} = WX + b \text{, where }p = P(y=1 \vert X)
$$

This is the problem to find $\text{log-odds(logit)}$ using the linear model.

Solving the above equation for $p$, we get:

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