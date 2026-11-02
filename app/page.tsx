import LoyaltyCalculator from "./components/loyalty-calculator";
import LeadForm from "./components/lead-form";

const steps = [
  {
    number: "01",
    title: "Crie seu programa",
    text: "Defina como seus clientes acumulam pontos e quais recompensas combinam com o seu negócio.",
    icon: "✳",
  },
  {
    number: "02",
    title: "Reconheça cada escolha",
    text: "Registre as compras e mostre aos clientes o progresso que eles conquistaram com você.",
    icon: "♡",
  },
  {
    number: "03",
    title: "Dê motivos para voltar",
    text: "Seus clientes acompanham os pontos e descobrem as recompensas que seu estabelecimento oferece.",
    icon: "↗",
  },
];

const businesses = [
  ["☕", "Cafés e lanchonetes"],
  ["🥐", "Padarias e confeitarias"],
  ["✂", "Salões e barbearias"],
  ["✿", "Lojas e presentes"],
  ["♧", "Pet shops"],
  ["⌂", "Comércio de bairro"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="PontoAmado — início">
          <img src="/logo-horizontal.png" alt="PontoAmado" />
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>
          <a href="#para-seu-negocio">Para seu negócio</a>
          <a href="#recursos">Recursos</a>
          <a href="#sobre">Sobre nós</a>
        </nav>
        <a className="button button-small button-outline" href="#contato">
          Quero fazer parte <Arrow />
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> FIDELIDADE COM JEITO DE COMÉRCIO LOCAL</div>
          <h1>Seu comércio pode se tornar um <span>PontoAmado.</span></h1>
          <p className="hero-description">
            Conquistar um cliente é importante. Fazer com que ele queira voltar é ainda melhor.
          </p>
          <p className="hero-detail">
            Crie seu próprio programa de fidelidade, reconheça quem escolhe você e transforme cada compra em mais um motivo para voltar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contato">Quero transformar meu comércio <Arrow /></a>
            <a className="text-link" href="#como-funciona">Descubra como funciona <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true"><span>J</span><span>M</span><span>A</span></div>
            <p><strong>Feito para quem faz a vida do bairro acontecer.</strong><br />Simples para o comércio. Gostoso para o cliente.</p>
          </div>
        </div>

        <div className="hero-visual" role="img" aria-label="Ilustração de um comércio de bairro e de uma recompensa de fidelidade">
          <div className="visual-sun" />
          <div className="visual-caption"><span>UM PONTO DE ENCONTRO</span><b>Seu comércio, mais perto de quem importa.</b></div>
          <div className="shop-scene">
            <div className="shop-window"><span className="window-plant">✿</span><span className="window-cup">☕</span></div>
            <div className="shop-awning"><i /><i /><i /><i /><i /><i /></div>
            <div className="shop-sign">casa bonita</div>
            <div className="shop-door"><span className="door-glass" /><span className="door-handle" /></div>
            <div className="shop-base" />
          </div>
          <div className="customer customer-one"><span className="customer-hair" /><span className="customer-body" /></div>
          <div className="customer customer-two"><span className="customer-hair" /><span className="customer-body" /></div>
          <div className="floating-card points-card">
            <span className="card-icon">♡</span>
            <span><b>Mais uma visita!</b><small>+10 pontos pra você</small></span>
            <span className="card-plus">+10</span>
          </div>
          <div className="floating-card reward-card"><span className="reward-icon">✦</span><span><small>SUA RECOMPENSA</small><b>Um café por nossa conta</b></span><span className="reward-check">✓</span></div>
          <div className="visual-stamp"><span>feito com</span><b>♡</b><span>carinho</span></div>
          <div className="visual-bottom"><span>GENTE QUE VOLTA</span><span>NEGÓCIO QUE CRESCE</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Sobre a proposta PontoAmado">
        <span>TECNOLOGIA PARA APROXIMAR PESSOAS</span>
        <span className="trust-divider" />
        <p>Seu comércio. Seus clientes. <b>Mais motivos para voltar.</b></p>
        <span className="trust-heart">♡</span>
      </section>

      <section className="problem section-pad" id="sobre">
        <div className="section-heading">
          <div className="eyebrow"><span className="eyebrow-dot" /> A VIDA REAL DE QUEM EMPREENDE</div>
          <h2>O cliente compra hoje.<br /><span>O que faz ele voltar amanhã?</span></h2>
          <p>Você cuida de cada detalhe. O atendimento, a qualidade, a conversa de sempre. Mas depois da venda, muitas vezes o relacionamento para por ali.</p>
        </div>
        <div className="problem-list">
          <div><span className="list-mark">01</span><p>O cliente compra, gosta do atendimento e depois desaparece.</p><span className="list-icon">↗</span></div>
          <div><span className="list-mark">02</span><p>Todo mês, parece que é preciso começar a conquistar clientes do zero.</p><span className="list-icon">↗</span></div>
          <div><span className="list-mark">03</span><p>Os programas de fidelidade das grandes redes parecem longe da sua realidade.</p><span className="list-icon">↗</span></div>
          <div className="problem-answer"><span>♡</span><p>A venda não precisa ser o fim da conversa.<br /><b>Pode ser o começo da próxima visita.</b></p></div>
        </div>
      </section>

      <section className="journey section-pad" id="como-funciona">
        <div className="journey-heading">
          <div><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> UM JEITO NOVO DE FICAR POR PERTO</div><h2>De ponto comercial<br />a <em>PontoAmado.</em></h2></div>
          <p>Você conhece seu negócio melhor do que ninguém. Agora, pode criar um programa de fidelidade do seu jeito — sem complicar a rotina.</p>
        </div>
        <div className="journey-flow" aria-label="O cliente compra, acumula pontos, conquista recompensas e volta">
          <div className="flow-step"><div className="flow-art art-store"><span>☕</span><small>seu comércio</small></div><b>Compra</b></div>
          <span className="flow-arrow">→</span>
          <div className="flow-step"><div className="flow-art art-points"><span>+10</span><small>pontos</small></div><b>Acumula</b></div>
          <span className="flow-arrow">→</span>
          <div className="flow-step"><div className="flow-art art-reward"><span>✦</span><small>um mimo</small></div><b>Conquista</b></div>
          <span className="flow-arrow">→</span>
          <div className="flow-step"><div className="flow-art art-return"><span>↩</span><small>até breve!</small></div><b>Volta</b></div>
        </div>
        <div className="journey-note"><span>♡</span> Cada compra pode ser o começo de uma relação duradoura.</div>
      </section>

      <section className="steps-section section-pad">
        <div className="steps-title"><div className="eyebrow"><span className="eyebrow-dot" /> TUDO NO SEU TEMPO, DO SEU JEITO</div><h2>Fidelizar pode ser mais<br />simples do que parece.</h2><p>Sem uma tecnologia própria para desenvolver. Sem misturar seu programa com o de outras lojas.</p></div>
        <div className="steps-grid">{steps.map((step) => <article className="step-card" key={step.number}><div className="step-card-top"><span>{step.number}</span><span className="step-icon">{step.icon}</span></div><h3>{step.title}</h3><p>{step.text}</p><div className="step-card-line" /></article>)}</div>
        <p className="steps-footnote"><span>✓</span> Seu programa, suas regras, suas recompensas. Cada estabelecimento cuida do próprio clube de fidelidade.</p>
      </section>

      <section className="growth-section section-pad" id="recursos">
        <div className="growth-heading">
          <div className="eyebrow"><span className="eyebrow-dot" /> FIDELIZAÇÃO QUE VAI ALÉM DOS PONTOS</div>
          <h2>Mais presença no dia a dia.<br /><span>Mais inteligência nas escolhas.</span></h2>
          <p>O PontoAmado está evoluindo para ajudar seu comércio a cuidar do relacionamento com os clientes em diferentes momentos: na comunicação de ofertas e no planejamento de ações que incentivam novas visitas.</p>
        </div>
        <div className="growth-grid">
          <article className="growth-card growth-promotions">
            <div className="growth-card-top"><span className="growth-icon">✦</span><span className="growth-status status-live"><i /> DISPONÍVEL</span></div>
            <p className="growth-kicker">MÓDULO DE PROMOÇÕES</p>
            <h3>Uma novidade para chamar a atenção de quem já escolheu você.</h3>
            <p>Crie e publique ofertas especiais no painel do seu estabelecimento. Os clientes vinculados ao seu clube podem visualizar as promoções válidas diretamente no aplicativo.</p>
            <ul>
              <li><span>✓</span> Cadastre título, descrição e período da oferta</li>
              <li><span>✓</span> Publique, pause ou encerre suas promoções</li>
              <li><span>✓</span> Dê mais visibilidade às novidades do seu comércio</li>
            </ul>
            <div className="promotion-preview">
              <div className="promotion-preview-head"><span>UMA OFERTA DO SEU CLUBE</span><b>✦</b></div>
              <strong>Tem novidade por aqui!</strong>
              <span>Uma oportunidade especial para sua próxima visita.</span>
              <small>Promoção publicada pelo estabelecimento</small>
            </div>
          </article>
          <article className="growth-card growth-intelligence">
            <div className="growth-card-top"><span className="growth-icon">⌁</span><span className="growth-status status-next">EM DESENVOLVIMENTO</span></div>
            <p className="growth-kicker">INTELIGÊNCIA DE MARKETING</p>
            <h3>Entenda melhor o movimento do seu clube. Planeje os próximos passos.</h3>
            <p>Estamos preparando ferramentas para transformar o histórico de compras em informações úteis para o comerciante — sem depender apenas da intuição.</p>
            <div className="insight-preview" aria-label="Exemplos de indicadores previstos para a inteligência de marketing">
              <div><span>Frequência de compra</span><b>01</b><i className="insight-line line-one" /></div>
              <div><span>Valor médio de compra</span><b>02</b><i className="insight-line line-two" /></div>
              <div><span>Evolução dos clientes</span><b>03</b><i className="insight-line line-three" /></div>
            </div>
            <ul>
              <li><span>↗</span> Identifique padrões de frequência e relacionamento</li>
              <li><span>↗</span> Perceba mudanças no movimento dos clientes</li>
              <li><span>↗</span> Planeje campanhas com objetivos mais claros</li>
            </ul>
            <small className="growth-note">Os indicadores e recursos serão disponibilizados gradualmente. Esta área ainda não está ativa no aplicativo.</small>
          </article>
        </div>
        <p className="growth-footnote"><span>♡</span> Tecnologia para aproximar pessoas e apoiar decisões melhores no comércio local.</p>
      </section>
      <LoyaltyCalculator />

      <section className="business-section section-pad" id="para-seu-negocio">
        <div className="business-copy"><div className="eyebrow"><span className="eyebrow-dot" /> FEITO PARA QUEM FAZ ACONTECER</div><h2>Todo comércio pode ter seus <span>clientes preferidos.</span></h2><p>Fidelizar não é privilégio das grandes redes. É um jeito de valorizar quem continua escolhendo o que você faz.</p><a href="#contato" className="text-link">Vamos conversar sobre seu negócio <span>↗</span></a></div>
        <div className="business-grid">{businesses.map(([icon, name]) => <div className="business-card" key={name}><span>{icon}</span><b>{name}</b><i>↗</i></div>)}</div>
      </section>

      <section className="benefits-section section-pad">
        <div className="benefits-image"><div className="benefit-photo-glow" /><div className="benefits-art"><div className="heart-orbit orbit-one" /><div className="heart-orbit orbit-two" /><div className="big-heart">♡</div><span className="orbit-point point-one">+10</span><span className="orbit-point point-two">✦</span><span className="orbit-point point-three">↗</span><div className="benefit-label"><b>Ser lembrado<br />faz bem.</b><span>para todo mundo</span></div></div><p>UMA ESCOLHA QUE APROXIMA.</p></div>
        <div className="benefits-copy"><div className="eyebrow"><span className="eyebrow-dot" /> MAIS QUE UM SISTEMA DE PONTOS</div><h2>Seu comércio merece clientes que voltam <span>porque gostam.</span></h2><p>Reconhecer um cliente é mostrar que a escolha dele importa. Um bom programa oferece mais uma razão para a próxima visita — com benefícios que fazem sentido para o seu negócio.</p><ul><li><span>✓</span> Incentive a frequência com recompensas que você escolhe</li><li><span>✓</span> Acompanhe a movimentação do seu programa</li><li><span>✓</span> Ofereça uma experiência digital, sem criar um app do zero</li><li><span>✓</span> Construa uma relação mais próxima com seus clientes</li></ul></div>
      </section>

      <section className="phone-section section-pad">
        <div className="phone-copy"><div className="eyebrow"><span className="eyebrow-dot" /> BOM PARA QUEM VENDE. SIMPLES PARA QUEM COMPRA.</div><h2>Seu cliente também tem motivos para gostar do <span>PontoAmado.</span></h2><p>Uma experiência clara para acompanhar os pontos e descobrir as recompensas que o seu estabelecimento oferece.</p><div className="phone-promise"><span>♡</span><p><b>Sem mistério.</b><br />O cliente vê o progresso e sabe o que pode conquistar.</p></div></div>
        <div className="phone-scene"><div className="phone-orb" /><div className="phone-back-card"><span>cafuné café</span><b>10<small>/ 50 pts</small></b><div className="mini-progress"><i /></div><small>Uma pausa por nossa conta</small><span className="coffee-doodle">☕</span></div><div className="phone-mock"><div className="phone-notch" /><div className="phone-screen"><div className="phone-topline"><span>9:41</span><span>●●●</span></div><div className="app-mini-brand"><span className="mini-brand-mark">♡</span><b>PontoAmado</b><span>···</span></div><div className="app-greeting">Seu clube de<br /><b>cafuné café ☕</b></div><div className="points-panel"><small>SEUS PONTOS</small><strong>320 <span>pts</span></strong><div className="points-progress"><i /></div><div className="progress-caption"><span>320 pontos</span><span>faltam 80</span></div></div><div className="reward-title"><b>Olha o que vem por aí</b><span>Ver tudo</span></div><div className="app-reward"><span className="app-coffee">☕</span><span><b>Um café por nossa conta</b><small>400 pontos · faltam só 80 ✨</small></span><span>›</span></div><div className="app-history"><span>Última visita</span><b>+40 pontos · hoje</b></div><div className="phone-nav"><span>♡<small>Início</small></span><span>✦<small>Recompensas</small></span><span>◷<small>Histórico</small></span></div></div></div><div className="phone-floating">✦ <b>Você está quase lá!</b></div></div>
      </section>

      <section className="final-cta section-pad" id="contato">
        <div className="cta-decoration cta-left">✳</div><div className="cta-decoration cta-right">♡</div>
        <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> O PRÓXIMO PONTO É SEU</div>
        <h2>Está na hora de transformar<br />seu comércio em um <em>PontoAmado.</em></h2>
        <p>Conte um pouco sobre o seu negócio. Se quiser, peça uma apresentação simples da plataforma e de como começar.</p>
        <LeadForm />
        <span className="cta-note">Seu negócio, suas regras de fidelidade, seus clientes e suas recompensas.</span>
      </section>

      <footer className="site-footer"><div className="footer-main"><a className="footer-brand" href="#inicio"><img src="/logo-claro.png" alt="PontoAmado" /></a><div className="footer-slogan">Seu comércio. Seus clientes.<br /><b>Mais motivos para voltar.</b></div><div className="footer-about"><span>TECNOLOGIA PARA APROXIMAR</span><p>Uma maneira mais humana de cuidar das relações do comércio local.</p></div></div><div className="footer-bottom"><span>© 2026 PontoAmado. Feito com carinho.</span><span>Uma ideia que ainda vai longe <b>♡</b></span></div></footer>
    </main>
  );
}
