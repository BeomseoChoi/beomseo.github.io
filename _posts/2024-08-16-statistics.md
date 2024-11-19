---
layout: default
title:  "Statistics"
date:   2024-08-18 01:04:53 +0900
categories: posts
---
{% include post-header.html %}

### 표본공간과 사건공간
표본공간($\Omega$, Sample Sapce)은 가능한 모든 확률실험의 결과의 집합입니다. 사건($E$, Event)은 표본공간의 부분집합입니다. 사건의 집합을 사건공간[^1]($\mathcal{F}$, Event space)이라고 합니다. 표본공간과 사건공간으로 구성된 공간$(\Omega, \mathcal{F})$을 측도공간(Measurable space)이라고 합니다.

### 확률변수, 확률측도, 그리고 확률
표본공간의 원소는 숫자로 나타내어지지 않습니다. 예를 들어, 동전을 두 번 던지는 확률실험에서 표본공간의 원소들은($\\{\text{H}\\}, \\{\text{T}\\}, \\{\text{H, T}\\}$ 등) 수치가 아닙니다. 그리고 확률변수($X$, Random variable)란 정의역 표본공간에서 치역 실수로 매핑하는 함수입니다.

$$
X : \Omega \rightarrow \mathbb{R}
$$
사건이 발생할 가능성을 수량화한 것을 확률($P(E)$, Probability)이라고 합니다. 그리고 확률변수에 의해 변환된 실수 값에 확률을 부여하는 함수를 확률측도($P$, Probability measure)라고 합니다.


$$
P : \mathbb{R} \rightarrow [0, 1] \subset \mathbb{R}
$$

표본공간, 사건공간, 확률측도로 구성된 공간$(\Omega, \mathcal{F}, P)$을 확률공간(Probability space)이라고 합니다.

### 확률분포
확률분포란 확률변수 $X$에 관한 확률이 실직선 위에 어떻게 분포되는지를 나타내는 함수입니다.

확률변수가 이산 값을 가지는 경우 이산확률분포(PMF, Probability Mass Function)라고 부릅니다. 또한 확률변수가 연속 값을 가지는 경우 연속확률분포(PDF, Probability Density Function)라고 부릅니다.

$$
P(X=x)
$$

### 확률분포의 특성치
#### 평균

$$
\displaylines
{
E[x] = \sum_{x}{xf(x)}\\
E[x] = \int_{-\infty}^{\infty}{xf(x)dx}
}

$$

#### 분산[^2], 표준편차

$$
\displaylines
{
Var(x) = \sum_{x}(x-\mu)^{2}f(x)\\
Var(x) = \int_{-\infty}^{\infty}{(x-\mu)^{2}f(x)dx}\\
Sd(x) = \sqrt{Var(x)}
}
$$



{% include image.html 
path="/resources/distribution.png"
max-width="80%"
%}

[^1]: 사건들의 집합을 sigma field of events라고 한다. sigma field는 다음 조건을 만족한다. 1. 전체 집합을 포함한다. 2. 여집합에 닫혀있다. 3. 가산무한번 합집합에 닫혀있다.

[^2]: $Var(x) = E[(x-\mu)^{2}f(x)] = E(x^{2}) - E(x)^{2}$

## References
[1] https://gem763.github.io/probability%20theory/%ED%99%95%EB%A5%A0%EC%9D%98-%EC%9D%B4%ED%95%B4.html<br>
[2] 김우철 수리통계학