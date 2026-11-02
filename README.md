# PontoAmado

Site de apresentação do PontoAmado feito com Next.js, React e TypeScript. As cores e o tom seguem o manual de marca; a Nunito Sans e os arquivos de logo são servidos localmente.

## Prévia local

```bash
npm install
npm run dev
```

Abra o endereço indicado no terminal (normalmente `http://localhost:3000`). Se a porta já estiver ocupada, o Next.js escolhe outra porta, como `3001`.

## Publicação futura no Cloudflare Workers

O projeto inclui o adaptador OpenNext para Cloudflare e os comandos do Wrangler. Depois de vincular e autenticar a conta Cloudflare, use `npm run preview` para gerar e visualizar a versão adaptada antes de publicar. `npm run deploy` publica o Worker; `npm run upload` apenas envia o artefato para a conta.

O formulário permite solicitar uma apresentação da plataforma. O site não promete resultados financeiros nem simula uma inscrição comercial já disponível.

## Formulário de interessados

O formulário envia os dados para `POST /api/leads`. Configure `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` no `.env.local` para `npm run dev` e no `.dev.vars` para `npm run preview`. O nome `.env.example` / `.dev.vars.example` mostra os campos esperados; não coloque chaves secretas no site.

Antes de receber contatos reais, revise e aplique `C:\pontoamadoapp\supabase\migrations\202610290012_business_interest_leads.sql` no mesmo projeto Supabase. A migration cria uma tabela separada, permite apenas novos envios anônimos e deixa a leitura restrita a administradores autenticados do PontoAmado. A migration está preparada no repositório do app, mas ainda não foi executada no banco remoto. Os interessados podem solicitar uma apresentação; o formulário registra o pedido e o horário é combinado depois, pois ainda não há agenda conectada.
