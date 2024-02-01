---
banner: <URL para o banner do website>
title: <O título da página (que irá aparecer no navegador)>
subject: <Assunto/Matéria sobre o assunto>
creation-date: <dd/mm/YYYY HH:MM:SS>
class-date: <dd/mm/YYYY HH:MM:SS>
type: <Tipo do post>
related-posts: <Uma lista de posts relacionados a este, separadas por `;`>
tags: 
teacher-name: <O nome do professor relacionado ao assunto, ou vazio>
---
# Criando posts para o website
Regras e conselhos gerais a seguir para consistência das páginas, essas regras definem coisas como cabeçalhos e nomes de arquivos

## Tabela de Conteúdos
1. [[#O nome do arquivo]]
2. [[#O conteúdo do arquivo]]
3. [[#Assunto/matéria do arquivo]]
4. [[#Tipo do post]]
5. [[#Organização dos arquivos]]
6. [[#Exemplos de layouts de posts]]

## O nome do arquivo
O nome do arquivo deve seguir as seguintes regras:
  1. Sem espaços (use `-` no lugar para um URL mais simples de se ver);
  2. Sem caractéres especiais, como $, #, ?, etc;
  3. Sem acentuação;
  4. Usando apenas letras minúsculas.

## O conteúdo do arquivo
O arquivo deve começar com um cabeçalho primário (heading 1) e abaixo dele um mini-resumo do assunto do post. O cabeçalho tem que ser o nome do arquivo, só que sem seguir as regras de nome do arquivo, então é permitido espaços, acentuação, e etc.

Caso queira criar subtópicos, utilize cabeçalhos secundários (heading 2).

## Assunto/matéria do arquivo

O assunto/matéria do arquivo que fica nas propriedades do markdown, precisa seguir umas regras:
  1. Sem espaços (use `-` no lugar);
  2. Sem caractéres especiais, como $, #, ?, etc;
  3. Sem acentuação;
  4. Usando apenas letras minúsculas.

## Tipo do post

O tipo do post é o que irá especificar o tipo do conteúdo do post, como por exemplo:
- atividade-escolar
- assunto-escolar

Se você não souber como classificar o seu post, deixe vazio que ele irá ser considerado um post geral.

O tipo do post precisa seguir as seguintes regras:
  1. Sem espaços (use `-` no lugar);
  2. Sem caractéres especiais, como $, #, ?, etc;
  3. Sem acentuação;
  4. Usando apenas letras minúsculas.

## Organização dos arquivos

A organização dos arquivos deve seguir umas regras em nomenclaturas: 
  1. Sem espaços (use `-` no lugar);
  2. Sem caractéres especiais, como $, #, ?, etc;
  3. Sem acentuação;
  4. Usando apenas letras minúsculas.
  
Os arquivos irão ser organizados da seguinte forma:

1. Crie uma pasta para o assunto do post, como por exemplo:
	- portugues
	- matematica
	- programacao
2. Caso o assunto do post seja bem extenso, e você queira separá-lo em partes, crie uma categoria com o nome do assunto
3. Todos os assuntos devem conter um `index.md`, onde irá conter uma tela de explicação sobre o assunto, como português, matemática, etc.
4. NÃO PODE TER ARQUIVOS SEM CATEGORIA.

#### Exemplos:
```
biologia/
  assuntos/
    celula/
      celulas-tronco.md
      nucleo.md
    aquecimento-global.md
  atividades/
    atividade-1.md
    atividade-2.md
  index.md
```
## Exemplos de layouts de posts:
- https://github.blog/category/engineering/
- https://github.blog/2024-01-22-10-unexpected-ways-to-use-github-copilot/
