---
layout: default
title:  "Transformer"
date:   2024-08-25 13:43:53 +0900
categories: posts
---
{% include post-header.html %}

## TL;DR
Transformer는 attention mechanisms을 적극적으로 활용한 encoder-decoder architecture입니다. RNN의 sequential architecture를 사용하지 않음으로써 parallelization을 enhence했습니다.


## Introduction
RNN(Recurrent Neural Network) 계열은 sequential model에서 SOTA였다. RNN은 this hidden state가 이전 hidden state를 inherent한다. inherent하는 sequential 구조가 parallelization에 방해된다. Factorization tricks이나 conditional computation 방법을 도입하면서 성능을 향상시켰으나, 여전히 RNN architecture의 fundamental constraint는 남아있다. Attention mechanisms은 input과 output sequence의 distance와 관계없는 모델링을 가능케 했으나, 여전히 RNN network를 사용함. Transformer는 전적으로 attention mechanism에 의존하는 model architecture로, RNN보다 more parallelization을 가능하게 한다.

## Architecture

{% include image.html 
path="/resources/transformer-architecture.png"
max-width="40%"
%}

{% include pseudocode.html 
id="transformer-encoder"
code="
    \begin{algorithm}
    \caption{Transformer Encoder}
    \begin{algorithmic}
        \INPUT {\\
            $E \text{: Embedding tensor} \in \mathbb{R}^{N \times L \times D }$ \\
            $H \text{: Number of heads} \in \mathbb{N}$ \\
            $padding\_mask \text{: Padding mask} \in \mathbb{R}^{N \times 1 \times 1 \times L }$ \\
            $N \text{: Number of encoder blocks}$
        }
        \OUTPUT {\\
            $encoder\_out \text{: Encoder output}$\\
        }
        \\
        \STATE $E = E + \text{PositionalEncoding}()$
        \STATE $encoder\_out = \text{EncoderBlock}(E, H, padding\_mask)$
        \FOR {$N - 1$}
            \STATE $encoder\_out = \text{EncoderBlock}(encoder\_out, H, padding\_mask)$
        \ENDFOR

        \RETURN $encoder\_out$

    \end{algorithmic}
    \end{algorithm}
" %}

{% include pseudocode.html 
id="transformer-encoder-block"
code="
    \begin{algorithm}
    \caption{Transformer Encoder Block}
    \begin{algorithmic}
        \INPUT {\\
            $E \text{: Input tensor} \in \mathbb{R}^{N \times L \times D }$ \\
            $H \text{: Number of heads} \in \mathbb{N}$ \\
            $padding\_mask \text{: Padding mask} \in \mathbb{R}^{N \times 1 \times 1 \times L }$ \\
        }
        \OUTPUT {\\
            $S \text{: Some Output}$\\
        }
        \\
        \STATE $W^{Q}, W^{K}, W^{V}, W^{O} \in \mathbb{R}^{D \times D}$
        \STATE $Q, K, V = EW_{Q}, EW_{K}, EW_{V}$
        \STATE $self\_attention = \text{MSA}(Q, K, V, H, padding\_mask)$
        \STATE $self\_attention = \text{BN}(self\_attention + E)$
        \STATE $encoder\_block\_out = \text{FFN}(heads)$
        \STATE $encoder\_block\_out = \text{BN}(encoder\_block\_out + heads)$
        \RETURN $encoder\_block\_out$

    \end{algorithmic}
    \end{algorithm}
" %}

{% include pseudocode.html 
id="transformer-decoder-block"
code="
    \begin{algorithm}
    \caption{Transformer Decoder Block}
    \begin{algorithmic}
        \INPUT {\\
            $E \text{: Input tensor} \in \mathbb{R}^{N \times L \times D }$ \\
            $H \text{: Number of heads} \in \mathbb{N}$ \\
            $encoder\_out \text{: Number of heads} \in \mathbb{N}$ \\
            $padding\_mask \text{: Padding mask} \in \mathbb{R}^{N \times 1 \times 1 \times L }$ \\
            $target\_mask \text{: Target mask} \in \mathbb{R}^{N \times 1 \times L \times L }$ \\
        }
        \OUTPUT {\\
            $S \text{: Some Output}$\\
        }
        \\
        \STATE $W^{Q}, W^{K}, W^{V}, W^{O} \in \mathbb{R}^{D \times D}$
        \STATE $Q, K, V = EW_{Q}, EW_{K}, EW_{V}$
        
        \STATE $self\_attention = \text{MSA}(Q, K, V, H, target\_mask)$
        \STATE $self\_attention = \text{BN}(self\_attention + E)$
        
        \STATE $cross\_attention = \text{MSA}(encoder\_out, encoder\_out, self\_attention, H, padding\_mask)$
        \STATE $cross\_attention = \text{BN}(cross\_attention + self\_attention)$
        
        \STATE $decoder\_out = \text{FFN}(heads)$
        \STATE $decoder\_out = \text{BN}(encoder\_out + heads)$
        \RETURN $decoder\_out$

    \end{algorithmic}
    \end{algorithm}
" %}

{% include pseudocode.html 
id="transformer-multi-head-attention"
code="
    \begin{algorithm}
    \caption{Multi-head Self Attention(MSA)}
    \begin{algorithmic}
        \INPUT {\\
            $Q, K, V \in \mathbb{R}^{N \times L \times D}$ \\
            $H \text{: Number of heads} \in \mathbb{N}$ \\
            $mask \text{: Masking tensor}$ \\
        }
        \OUTPUT {\\
            $heads \text{: } \in \mathbb{R}^{N \times L \times D}$\\
        }
        \\

        \STATE $Q, K, V \in \mathbb{R}^{N \times L \times D} 
        \xrightarrow{\text{reshape}}
        \mathbb{R}^{N \times L \times H \times D_{h}}
        \xrightarrow{\text{transpose}}
        \mathbb{R}^{N \times H \times L \times D_{h}}$
        
        \STATE $K \in \mathbb{R}^{N \times H \times L \times D_{h}}
        \xrightarrow{\text{transpose}}
        \mathbb{R}^{N \times H \times D_{h} \times L}$

        \STATE $D_{h} = D / H$

        \STATE $scores = QK / \sqrt{D_{h}} \in \mathbb{R}^{N \times H \times L \times L}$
        \IF {$mask$}
            \STATE $scores = \text{fill}(scores, mask, -\infty)$
        \ENDIF

        \STATE $heads = \text{softmax}(scores)V \in \mathbb{R}^{N \times H \times L \times D_{h}}$


        \STATE $heads \in \mathbb{R}^{N \times H \times L \times D_{h}}
        \xrightarrow{\text{transpose}}
        \mathbb{R}^{N \times L \times H \times D_{h}}
        \xrightarrow{\text{reshape}}
        \mathbb{R}^{N \times L \times D}$

        \STATE $heads = heads \times W^{O}$
        \RETURN $heads$

    \end{algorithmic}
    \end{algorithm}
" %}


## Questions

### Why use seperate weights on both Q and V?

$$
scores = \frac{QK^{T}}{\sqrt{D_{h}}} = \frac{EW^{Q}(W^{K})^{T}E^{T}}{\sqrt{D_{h}}}
$$

$W^{Q}(W^{K})^{T}$를 $W$로 합치면 안되는지 궁금했습니다. 분자의 모양새를 봤을 때 $EWE^{T}$에서 $W$를 factorization한 형태와 같습니다. 왜 factorization을 했는지는 논문에 나와있지 않았습니다. 검색 결과 동일한 질문을 한 사람이 있었고, matrix factorization하면 파라미터 수가 줄어들어 성능상 이점이 있다는 답변을 확인했습니다.[^1] 추가로 $EWE^{T}$ 형태가 bilinear form과 같다는 사실을 알았습니다.[^2]

#### Low Rank Approximation and SVD
Matrix factorizaiton $W^{Q}(W^{K})^{T}$ 은 Low Rank Approximation[^3]과 관련이 있습니다.

$$
\displaylines
{
\underset{B \in \mathbb{R}^{d \times k}, C \in \mathbb{R}^{k \times n}}{\text{min}} \parallel A - BC \parallel^{2}_{F},\\
\text{where } A = U\Sigma V^{T}, BC = U_{k} \Sigma_{k} V_{k}^{T}.
}
$$

$B=U_{k}, C=\Sigma_{k}V_{k}^{T}$로 설정하면 matrix factorization 형태가 됩니다. 그 $B=U_{K} \Sigma_{k}, C=V_{k}$로 설정해도 여전히 matrix factorization 입니다. Transformer의 $W^{Q}(W^{K})^{T}$는 최적의 SVD를 찾는 문제로 볼 수 있습니다.


### Why not concat for the positional encoding?

트랜스포머 QK 전개해서 additivity로 다뤘던 영상도 넣고,
로컬 정보, 글로벌 정보 관련 내용도 넣자. 


### 트랜스포머 단점
[1~3] https://www.quora.com/Which-are-the-weaknesses-of-transformers-in-deep-learning
한마디로 모델이 무겁다.
1. quadratic complexity w.r.t. sequence length in self-attention.
2. large number of parameters -> requiring vast amounts of labeled data, proning to overfitting.
3. interpretability
[]

### 트랜스포머 장점
1. catch global information well <-> bad at catch local information
모든 쿼리 벡터와 키 벡터를 내적하기 때문에 글로벌 feature를 잘 찾는다. 생각해보면 self-attention만 주구장창 사용한다. global feature를 잘 찾아야만 할 정도로... 반대로 생각하면 local feature는 학습하기 어렵다. 그래서 gaussian dist.를 섞어주는 등 방법으로 local information을 추가하는 연구가 진행되고 있다.







---
[^1]: https://stats.stackexchange.com/questions/515477/when-calculating-self-attention-for-transformer-ml-architectures-why-do-we-need
[^2]: https://187cm.tistory.com/88
[^3]: [COS 597A Lec. 11 by Matt Weinberg in Princeton University](https://www.cs.princeton.edu/~smattw/Teaching/Fa19Lectures/lec11/lec11.pdf)
[^4]: [Kernel trick post](/posts/2024/09/07/kernel-trick.html)
[3] https://www.reddit.com/r/MachineLearning/comments/cttefo/comment/exs7d08/?utm_source=reddit&utm_medium=web2x&context=3 <br>
https://stats.stackexchange.com/questions/599085/training-transformers-self-attention-weights-vs-embedding-layer?rq=1
https://www.reddit.com/r/MachineLearning/comments/184m63q/din_transformer_models_why_is_there_a_query_and/