---
title: Continuação de Matrizes
tags:
  - Matemática
assessement: 1
type: subject
subject: Matemática
date: 1707966000
---
# Assunto: Matrizes
- **Matriz Transposta** (ou Transposta de uma Matriz): $M^{t}$
	- Regras: Representada pela Letra $t$ acima da *Matriz*(Letra).
	- *Linhas* transformam-se em *Colunas*

$$
A=\begin{bmatrix}
4 & 6 & 9 & 12 \\
\sqrt{5} & 10 & 3 & 4 \\
5 & 5 & \pi & 7 \\
\end{bmatrix}_{3×4}
$$
$$
A^t=\begin{bmatrix}
4 & \sqrt{5} & 5\\
6 & 10 & 5\\
9 & 3 & \pi \\
12 & 4 & 7\\
\end{bmatrix}_{4×3}
$$
- **Matriz Genérica**
	- *Exemplo:* $A=(a_{ij})_{2×2}$ 
$$
A=\begin{pmatrix}
a_{11} & a_{12}\\
a_{21} & a_{22}\\
\end{pmatrix}_{2×2}
$$

- **Lei de Formação**
	- Podemos usar a *lei de formação*(que será alguma equação) para **formarmos** a *Matriz*

$$
\begin{align}
a_{ij}&= 2\cdot i-j\\
a_{11}&= 2\cdot 1-1=2-1=1\\
a_{12}&=2\cdot 1-2=2-2=0\\
a_{21}&=2\cdot2-1=4-1=3\\
a_{22}&=2\cdot2-2=4-2=2
\end{align}
$$
$$
A=\begin{pmatrix}
1 & 0\\
3 & 2\\
\end{pmatrix}_{2×2}
$$
## 1) Obtenha a Matriz
$B=(b_{ij})_{3×2}$ tal que:
*Lei de Formação:*
$$
b_{ij}
\begin{cases}
    i-j& \text{se } & i \leq j\\
    i+j& \text{se } & i > j
\end{cases}

$$
$$
B=\begin{bmatrix}
b_{11} & b_{12}\\
b_{21} & b_{22}\\
b_{31} & b_{32}\\
\end{bmatrix}
$$

## Igualdade de Matrizes
Duas *Matrizes* são iguais quando elas são do mesmo tipo *(mesma quantidade de linhas e mesma quantidade de colunas)* e os elementos correspondentes tem que ser iguais.
$$
A=\begin{pmatrix}
3 & x^{2}-5\\
1 & x\\
\end{pmatrix}_{2×2}
$$
$$
B=\begin{pmatrix}
3 & 11\\
1 & 4\\
\end{pmatrix}_{2×2}
$$
$$A+B=(?)$$
$$
\begin{align}
x&=4\\
x^{2}-5&=4^{2}-5\\
16-5&=11
\end{align}
$$
$$
A=B=\begin{pmatrix}
3 & 11\\
1 & 4\\
\end{pmatrix}
$$