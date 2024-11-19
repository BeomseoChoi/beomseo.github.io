---
layout: default
title:  "Logistic Regression"
date:   2024-08-18 01:04:53 +0900
categories: posts
---
{% include post-header.html %}

## Overview
Logistic regression이란 **베르누이 분포를 따르는 종속변수를 예측하는 확률적 판별 모델(discriminative model)**입니다. 추론 과정은 선형 변환과 시그모이드 함수로 구성됩니다. 선형 변환의 출력 변수는 logit[^1]입니다.

Logit이란 관심있는 사건의 상대적 비율인 odds ratio에 log를 씌운 값입니다. 예를 들어, 비가 올 확률이 75%, 비가 오지 않을 확률이 25%입니다. 비가 올 확률에 관심이 있다면 odds ratio는 3:1로 3입니다.

Logit transform은 관심있는 사건의 확률을 logit으로 변환합니다($L : [0, 1] \rightarrow \mathbb{R}$). Logit transform은 연속함수이고 역함수가 존재합니다. 시그모이드 함수는 logit transform의 역함수입니다.

따라서 logistic regression은 **선형 변환으로 logit을 예측하고 시그모이드 함수를 사용하여 확률로 해석하는 모델**이라고 말할 수 있습니다.

$$
\text{Odds ratio} = O(x) = \frac{x}{1-x} , \text{where }0 \le x \le 1.
$$

$$
O(x) = 
\begin{cases}
0, & \text{if } x = 0 \\
1, & \text{if } x = 0.5 \\ 
\infty, & \text{if } x = 1 
\end{cases}
$$

$$
\text{Logit(Log-odds)} = L(x) = \ln O(x) = \ln \frac{x}{1-x} 
$$

$$
L(x) = 
\begin{cases}
-\infty, & \text{if } x = 0 \\
0, & \text{if } x = 0.5 \\
\infty, & \text{if } x = 1
\end{cases}
$$

---
## Model fitting
확률을 estimate하는데, 확률의 확률 분포를 알면 그냥 그 확률 분포를 쓰겠지. 로지스틱 회귀를 확률 예측에 사용한다면 모수가 관심있는 사건의 확률임. 

https://www.quora.com/Why-do-we-use-the-maximum-likelihood-estimation-in-logistic-regression
### Estimation


### Evaluation









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


---

[^1]: 선형 변환으로 logit을 예측하는 이유는 선형 변환 결과를 확률로 해석할 수 없기 때문입니다. 선형 변환 후 종속변수 값은 실수 전체 범위($\mathbb{R}$)에 속합니다. 반면 확률은 0과 1 사이 구간에($[0, 1]$) 속합니다. 그래서 선형 변환의 결과를 확률로 해석할 수 없습니다.


---
## References
https://www.cs.cmu.edu/~aarti/Class/10701_Spring23/Lecs/Lecture4_inked.pdf
