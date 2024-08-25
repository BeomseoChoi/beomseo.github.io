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
            $mask \text{: Masking tensor}$ \\
            $N \text{: Number of encoder blocks}$
        }
        \OUTPUT {\\
            $S \text{: Some Output}$\\
        }
        \\
        \STATE $E = E + \text{PositionalEncoding}()$
        \STATE $out = \text{EncoderBlock}(E, H, mask)$
        \FOR {$N - 1$}
            \STATE $out = \text{EncoderBlock}(out, H, mask)$
        \ENDFOR

        \RETURN $out$

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
            $I \text{: Input tensor} \in \mathbb{R}^{N \times L \times D }$ \\
            $H \text{: Number of heads} \in \mathbb{N}$ \\
            $mask \text{: Masking tensor}$ \\
        }
        \OUTPUT {\\
            $S \text{: Some Output}$\\
        }
        \\
        \STATE $W^{Q}, W^{K}, W^{V}, W^{O} \in \mathbb{R}^{D \times D}$
        \STATE $Q, K, V = IW_{Q}, IW_{K}, IW_{V}$
        \STATE $heads = \text{MSA}(Q, K, V, H, None)$
        \STATE $heads = \text{BN}(heads + E)$
        \STATE $encoder\_block\_out = \text{FFN}(heads)$
        \STATE $encoder\_block\_out = \text{BN}(encoder\_block\_out + heads)$
        \RETURN $encoder\_block\_out$

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
        \STATE $heads = \text{softmax}(QK / \sqrt{D_{h}})V \in \mathbb{R}^{N \times H \times L \times D_{h}}$

        \IF {$mask$}
            \STATE $heads = \text{fill}(heads, mask, -\infty)$
        \ENDIF

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
Transformer 논문을 읽으면서 의아한 부분이 있었다. 다행히도 나만 궁금해한게 아니었고, 인터넷에 동일한 질문과 그에 대한 답변이 올라와 있었다.

### Why not concat for the positional encoding?

### Why use seperate weight on both Q and V?
EWE 대신 EWqWkE를 사용하는 이유는 W는 n by n인 반면 Wq, Wk는 d by d/h 이기 때문에 파라미터가 훨씬 적어 성능이 좋다는 주장이다. 해당 주장은 일리가 있으나, Q와 K를 define한 의도를 설명하지는 못하는 것 같다. 결국 W matrix를 factorization 한 것과 동일한건데... 왜 저자는 처음부터 Q와 K를 정의했을까.

추천시스템... matrix factorization이랑 비슷...?

## Reference
[1] https://www.reddit.com/r/MachineLearning/comments/cttefo/comment/exs7d08/?utm_source=reddit&utm_medium=web2x&context=3 <br>
[2] https://stats.stackexchange.com/questions/515477/when-calculating-self-attention-for-transformer-ml-architectures-why-do-we-need
https://stats.stackexchange.com/questions/599085/training-transformers-self-attention-weights-vs-embedding-layer?rq=1
https://www.reddit.com/r/MachineLearning/comments/184m63q/din_transformer_models_why_is_there_a_query_and/