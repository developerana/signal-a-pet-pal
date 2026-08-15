# Pet Patrol Now

SinalizaPet — MVP da Plataforma

Crie uma primeira versão funcional, moderna e responsiva do SinalizaPet, uma plataforma web comunitária para ajudar tutores a localizar animais desaparecidos e conectar pessoas que perderam, encontraram ou avistaram um animal.

O sistema deve funcionar perfeitamente em desktop, tablet e celular, com abordagem mobile-first, pois grande parte dos usuários acessará a plataforma pelo celular.

1. Identidade da marca

O nome do projeto é:

SinalizaPet

Slogan principal:

“Viu? Sinaliza. Encontrou? Avisa.”

O conceito da plataforma é:

Uma informação pode ser a diferença entre um animal continuar perdido e voltar para casa.

Utilize os dois logos anexados como referência oficial da identidade visual.

Logo principal

Utilize o logo horizontal fornecido, contendo o ícone do gato preto e o texto SinalizaPet, como principal identificação da plataforma.

Ícone

Utilize o ícone do gato preto isolado como símbolo da marca, principalmente em:

favicon;

avatar;

menus;

telas mobile;

carregamento;

marcadores relacionados à marca;

elementos onde o logo completo não tenha espaço.

Não redesenhe, distorça ou substitua os logos fornecidos. Preserve suas proporções e características originais.

2. Paleta oficial

Utilize exclusivamente esta paleta como base da interface:

#000000 — Preto / identidade principal

#FF0000 — Vermelho / desaparecido / alerta

#E6D5B7 — Bege / cor de apoio

#FFFFFF — Branco / fundos e contraste

#FFAE00 — Laranja / avistamento / atenção

#34C759 — Verde / encontrado / reencontrado

#0088FF — Azul / informação / localização

A interface deve ser predominantemente branca, preta e bege, utilizando vermelho, laranja, verde e azul como cores semânticas de status.

Não utilize gradientes excessivos.

Evite aparência infantil ou excessivamente colorida. A identidade deve transmitir:

confiança;

acolhimento;

tecnologia;

comunidade;

urgência quando necessário;

simplicidade.

3. Objetivo do MVP

O MVP deve permitir que uma pessoa:

encontre animais desaparecidos próximos;

cadastre um animal desaparecido;

cadastre um animal encontrado;

registre um possível avistamento;

visualize ocorrências em um mapa;

pesquise animais por região;

acompanhe uma ocorrência;

altere o status de uma ocorrência;

receba notificações;

compartilhe uma ocorrência;

visualize seu perfil e suas ocorrências.

A arquitetura deve ser preparada para posteriormente receber banco de dados real, autenticação, geolocalização e notificações.

4. Estrutura principal da aplicação

Crie as seguintes páginas:

Públicas

/

/buscar

/ocorrencia/:id

/login

/cadastro

Usuário autenticado

/dashboard

/nova-ocorrencia

/novo-avistamento

/animal-encontrado

/minhas-ocorrencias

/meus-animais

/notificacoes

/perfil

Administração

/admin

/admin/ocorrencias

/admin/usuarios

/admin/denuncias

5. Landing Page

Crie uma landing page moderna e objetiva.

Hero

Apresente:

SinalizaPet

Viu? Sinaliza. Encontrou? Avisa.

Texto:

Uma plataforma comunitária para ajudar animais perdidos a encontrarem o caminho de volta para casa.

Botões principais:

🚨 Meu pet desapareceu

👀 Eu vi um animal

🏠 Encontrei um animal

Utilize o ícone do gato da marca de forma visualmente relevante no hero.

6. Home / Dashboard

Após o login, apresentar um dashboard com:

Cabeçalho

logo;

busca;

notificações;

avatar do usuário;

menu.

Destaque

Mostrar uma chamada:

Tem um animal desaparecido na sua região? Sua informação pode ajudar.

Botões:

Cadastrar desaparecimento

Sinalizar avistamento

7. Feed de ocorrências

Crie um feed semelhante a uma rede comunitária, mas focado exclusivamente em ocorrências de animais.

Cada card deve apresentar:

foto do animal;

nome;

espécie;

status;

localização aproximada;

data;

distância aproximada;

descrição resumida;

botão “Ver ocorrência”;

botão de compartilhar;

opção de sinalizar avistamento.

Exemplo:

🚨 Logan

Gato • Desaparecido

📍 Bairro Centro
🕐 Desaparecido há 2 dias

Gato preto, porte médio. Possui uma pequena marca branca no peito.

Ver ocorrência

8. Sistema de status

Utilize cores da identidade:

🔴 DESAPARECIDO

Cor: #FF0000

🟠 AVISTADO

Cor: #FFAE00

🔵 ENCONTRADO

Cor: #0088FF

🟢 REENCONTRADO

Cor: #34C759

⚫ ÓBITO

Cor: #000000

O status deve aparecer de maneira muito clara nos cards.

O status “Óbito” deve existir para permitir o encerramento correto de uma ocorrência, mas deve ser apresentado de maneira discreta e respeitosa.

9. Cadastro de animal desaparecido

Crie um formulário dividido em etapas para facilitar o uso no celular.

Etapa 1 — Animal

Campos:

nome;

espécie;

raça;

sexo;

idade aproximada;

porte;

cor;

características;

foto principal;

fotos adicionais.

Etapa 2 — Desaparecimento

Campos:

data;

horário aproximado;

cidade;

bairro;

último local onde foi visto;

ponto de referência;

descrição do desaparecimento.

Etapa 3 — Contato

Não exponha informações pessoais diretamente na ocorrência.

Permita que o usuário configure como deseja ser contatado.

Finalização

Mostrar uma prévia da ocorrência e:

Publicar ocorrência

10. Cadastro de animal encontrado

Criar fluxo semelhante.

Título:

“Você encontrou um animal?”

Texto:

Cadastre as informações para ajudar o tutor a encontrá-lo.

Campos:

foto;

espécie;

características;

localização aproximada;

data;

horário;

descrição;

situação atual do animal.

Botão:

Publicar animal encontrado

11. Sinalizar avistamento

Esta é uma das funcionalidades mais importantes do SinalizaPet.

Na página de uma ocorrência, apresentar:

👀 Você viu este animal?

Botão:

Sinalizar avistamento

Ao clicar, abrir formulário:

localização;

data;

horário;

foto;

descrição;

comportamento observado.

Exemplo:

“Vi um gato preto próximo à praça por volta das 18h. Ele estava caminhando em direção à avenida.”

Após enviar:

Avistamento registrado!

Sua informação pode ajudar esse animal a voltar para casa.

O tutor deve receber uma notificação.

12. Mapa

Crie uma página de mapa preparada para integração futura com uma API de mapas.

O mapa deve utilizar marcadores por status:

🔴 Desaparecido
🟠 Avistamento
🔵 Encontrado
🟢 Reencontrado

Ao clicar em um marcador, mostrar um pequeno card com:

foto;

nome;

status;

bairro;

data;

botão para abrir ocorrência.

Por segurança, não mostrar a localização residencial exata do tutor.

Utilizar localização aproximada para ocorrências.

13. Busca

Criar uma busca central:

“Procure por um animal, bairro ou região...”

Filtros:

Espécie

Todos

Cachorro

Gato

Ave

Outro

Status

Desaparecido

Avistado

Encontrado

Reencontrado

Região

Cidade

Bairro

Raio de distância

Ordenação

Mais recentes

Mais próximos

Mais avistados

14. Página da ocorrência

Criar uma página detalhada e visualmente clara.

Estrutura:

foto grande;

status;

nome;

espécie;

características;

localização aproximada;

data do desaparecimento/encontro;

descrição;

informações relevantes;

linha do tempo;

avistamentos;

botão de compartilhar;

botão “Sinalizar avistamento”.

Linha do tempo

Exemplo:

19/05 — 18:30
🚨 Animal desaparecido registrado.

20/05 — 15:42
👀 Possível avistamento registrado.

21/05 — 09:18
👀 Novo avistamento registrado.

Isso deve ajudar o tutor a visualizar a evolução da busca.

15. Compartilhamento

Cada ocorrência deve possuir um botão:

Compartilhar ocorrência

Preparar a estrutura para compartilhamento em:

WhatsApp;

Facebook;

Instagram;

copiar link.

A prévia de compartilhamento deve conter:

🚨 PET DESAPARECIDO

Nome
Espécie
Região
Foto
Link da ocorrência

16. Notificações

Criar central de notificações.

Exemplos:

🔔 Novo avistamento

Alguém sinalizou um possível avistamento de Logan próximo ao bairro Centro.

🔔 Ocorrência próxima

Um gato encontrado foi registrado a 1,2 km de você.

🔔 Status atualizado

A ocorrência de Thor foi marcada como reencontrada.

17. Perfil do usuário

Criar:

foto;

nome;

cidade;

data de cadastro;

animais cadastrados;

ocorrências criadas;

avistamentos realizados;

favoritos.

Adicionar uma pequena métrica comunitária:

“Informações ajudadas”

Exemplo:

🐾 8 sinalizações realizadas

Isso incentiva a colaboração sem transformar a plataforma em competição.

18. Meus animais

Permitir que o usuário cadastre seus animais previamente.

Cada animal deve ter:

foto;

nome;

espécie;

características;

idade;

raça;

observações.

Depois, ao criar uma ocorrência, o usuário pode simplesmente selecionar:

“Qual animal desapareceu?”

19. Dashboard administrativo

Criar uma interface simples de administração com:

Indicadores

ocorrências ativas;

animais desaparecidos;

animais encontrados;

reencontros;

avistamentos;

usuários cadastrados.

Gráficos

Mostrar estatísticas básicas:

ocorrências por região;

ocorrências por espécie;

ocorrências por status;

quantidade de reencontros.

20. Segurança e privacidade

A plataforma deve considerar privacidade desde o início.

Nunca exibir publicamente:

endereço residencial completo;

telefone pessoal sem autorização;

email pessoal;

localização exata da residência;

dados sensíveis.

Utilizar localização aproximada nas ocorrências.

Preparar a aplicação para posteriormente implementar:

autenticação;

confirmação de email;

recuperação de senha;

denúncias;

moderação;

bloqueio de usuários.

21. Dados de demonstração

Como esta é uma versão inicial, crie dados mockados realistas para demonstrar o sistema funcionando.

Utilize exemplos como:

gatos;

cachorros;

diferentes bairros;

diferentes status;

avistamentos;

animais encontrados.

Inclua também uma ocorrência fictícia de um gato preto chamado Logan, como referência emocional à origem do projeto.

Deixe claramente entendido no código que esses são dados de demonstração, preparados para futuramente serem substituídos por dados reais.

22. Responsividade

O projeto precisa ser pensado principalmente para celular.

No mobile:

navegação inferior;

botões grandes;

formulários simples;

cards adaptados;

mapa ocupando toda a largura;

acesso rápido a “Desapareceu”, “Avistamento” e “Encontrado”.

No desktop:

sidebar;

dashboard mais amplo;

feed central;

mapa lateral quando apropriado.

23. Navegação mobile

Criar uma bottom navigation com:

🏠 Início

🔎 Buscar

➕ Sinalizar

🗺️ Mapa

👤 Perfil

O botão central de ação deve ter destaque visual.

24. UX

A experiência deve ser extremamente simples.

Lembre-se de que uma pessoa pode acessar o sistema em uma situação de estresse porque acabou de perder seu animal.

Portanto:

não criar formulários desnecessariamente longos;

utilizar linguagem humana;

destacar ações importantes;

evitar excesso de informações;

permitir concluir ações rapidamente;

utilizar feedback visual após cada ação.

Evite termos excessivamente técnicos para o usuário final.

25. Design

A estética deve ser:

moderna + minimalista + tecnológica + acolhedora.

Referências conceituais:

aplicativos modernos;

dashboards SaaS;

mapas;

redes comunitárias;

aplicativos de localização.

Não criar uma aparência infantil de “pet shop”.

O SinalizaPet deve parecer uma plataforma tecnológica séria, mas ainda transmitir carinho e empatia.

Utilizar:

bordas arredondadas moderadas;

cards limpos;

sombras suaves;

bastante espaço em branco;

tipografia moderna e legível;

ícones simples;

hierarquia visual clara.

26. Arquitetura técnica

Estruture o projeto de maneira organizada e escalável.

Utilize uma arquitetura de componentes reutilizáveis.

Separar:

componentes;

páginas;

layouts;

dados;

serviços;

tipos/interfaces;

estilos.

Preparar a aplicação para futura integração com:

banco de dados;

autenticação;

armazenamento de imagens;

mapas;

geolocalização;

notificações;

sistema de moderação.

Não criar funcionalidades falsas que pareçam funcionar quando na realidade não funcionam. Quando uma integração ainda não estiver configurada, deixar uma estrutura clara para implementação futura.

27. Importante sobre a identidade visual

Os logos anexados são a referência oficial.

Use-os diretamente na interface sempre que possível.

Não crie outro gato, não altere o desenho e não substitua o símbolo por outro ícone genérico.

O gato preto representa a homenagem ao Logan e deve permanecer consistente em toda a identidade.

Utilize o logo horizontal em:

navbar;

login;

cadastro;

landing page;

telas institucionais.

Utilize o ícone isolado em:

favicon;

mobile;

avatar;

loading;

espaços pequenos.

28. Resultado esperado

Ao final, quero uma primeira versão navegável e visualmente completa do SinalizaPet, e não apenas uma landing page.

O usuário deve conseguir navegar pelo fluxo:

Página inicial → Buscar → Ver ocorrência → Sinalizar avistamento

e também:

Página inicial → Meu pet desapareceu → Cadastrar ocorrência → Publicar

e:

Página inicial → Encontrei um animal → Cadastrar → Publicar

Todas as telas devem possuir estados visuais coerentes, dados de demonstração e responsividade.

Priorize primeiro:

experiência do usuário;

identidade visual;

fluxo de ocorrência;

busca;

mapa;

sinalização de avistamentos;

estrutura escalável.

O projeto deve transmitir uma mensagem clara desde o primeiro acesso:

SinalizaPet

Viu? Sinaliza. Encontrou? Avisa.

Juntos, podemos ajudar um pet a voltar para casa.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://signal-a-pet-pal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9e102b65-bd4f-4211-bcbc-9822ab30c9c0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
