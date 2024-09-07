---
layout: default
title:  "Kernel trick"
date:   2024-09-07 23:43:00 +0900
categories: posts
---
{% include post-header.html %}

{% 
include pdf-embed.html 
src="/resources/CS229 Stanford Kernel and SVM.pdf" 
title="CS229 Stanford Kernel and SVM"
%}

$$
\displaylines
{
K(x, z) \triangleq \langle \phi(x), \phi(z) \rangle, \\
\text{where } \phi : \mathbb{R}^{d} \rightarrow \mathbb{R}^{p}, \\
\text{kernel function } K : \mathcal{X} \times \mathcal{X} \rightarrow \mathbb{R} \text{ and symmetric positive semi-definite.}
}
$$

The attributes $x \in \mathcal{X} \subset \mathbb{R}^{d}$이고 the features $\phi(x) \in \mathbb{R}^{p}$입니다. $p > d$일 때, 유효한 커널 함수 $K$를 정의하면 $p$차원에서 $\langle \phi(x), \phi(z) \rangle$를 계산하는 대신 $d$차원에서 $K(x, z)$를 계산할 수 있습니다. 따라서 연산량을 $O(p)$에서 $O(d)$로 줄일 수 있습니다. 또한 $\phi$를 정의하지 않아도 됩니다. 하단 공식들은 알려진 $K(x, z)$입니다.

$$
\begin{aligned}
\textit{linear} \quad & : \quad K(x, z) = x^T z \\
\textit{polynomial} \quad & : \quad K(x, z) = (x^T z + c)^d, \quad c > 0 \\
\textit{sigmoid} \quad & : \quad K(x, z) = \tanh \left\{ a (x^T z) + b \right\}, \quad a, b \geq 0 \\
\textit{gaussian} \quad & : \quad K(x, z) = \exp \left\{ - \frac{\| x - z \|_2^2}{2\sigma^2} \right\}, \quad \sigma \neq 0
\end{aligned}
$$

$K(x, z) \triangleq \langle \phi(x), \phi(z) \rangle$는 $\phi(x)$와 $\phi(z)$ 또는 $x$와 $z$의 similarity function으로 볼 수 있습니다. $\phi(x)$와 $\phi(z)$가 유사하다면 $K(x, z)$의 값은 큽니다. 반대로 두 함수가 orthogonal에 가깝다면 그 값은 매우 작습니다.[^1]










---
[^1]: 여담으로 고차원에서 랜덤하게 두 벡터를 선택하면 orthogonal일 확률이 높습니다.