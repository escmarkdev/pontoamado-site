"use client";

import { useState } from "react";
import styles from "./loyalty-calculator.module.css";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const quantity = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});

type CalculatorValues = {
  customers: number;
  extraVisitsPerCustomer: number;
  averageTicket: number;
  grossMargin: number;
  rewardInvestment: number;
};

const initialValues: CalculatorValues = {
  customers: 20,
  extraVisitsPerCustomer: 0.5,
  averageTicket: 40,
  grossMargin: 35,
  rewardInvestment: 100,
};

function readNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export default function LoyaltyCalculator() {
  const [values, setValues] = useState(initialValues);
  const additionalVisits = values.customers * values.extraVisitsPerCustomer;
  const additionalSales = additionalVisits * values.averageTicket;
  const grossContribution = additionalSales * (values.grossMargin / 100);
  const afterRewards = grossContribution - values.rewardInvestment;
  const contributionPerVisit = values.averageTicket * (values.grossMargin / 100);
  const breakEvenVisits = contributionPerVisit > 0
    ? Math.ceil(values.rewardInvestment / contributionPerVisit)
    : null;

  function update(key: keyof CalculatorValues, value: string) {
    setValues((current) => ({ ...current, [key]: readNumber(value) }));
  }

  return (
    <section className={styles.section} aria-labelledby="calculator-heading">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className="eyebrow"><span className="eyebrow-dot" /> UMA CONTA COM A SUA REALIDADE</div>
          <h2 id="calculator-heading">E se seus clientes tivessem <span>mais um motivo</span> para voltar?</h2>
          <p>Ajuste os números para imaginar um cenário possível para o seu negócio. Você conhece seus clientes melhor do que ninguém.</p>
          <div className={styles.hypothesis}><span aria-hidden="true">✳</span><span>Exemplo ilustrativo<br /><b>Mude as premissas e explore outras possibilidades.</b></span></div>
        </div>

        <div className={styles.calculator}>
          <div className={styles.fields}>
            <label className={styles.field}>
              <span>Clientes participantes</span>
              <span className={styles.inputWrap}><input type="number" min="0" max="100000" step="1" inputMode="numeric" value={values.customers} onChange={(event) => update("customers", event.currentTarget.value)} /><small>clientes</small></span>
            </label>
            <label className={styles.field}>
              <span>Visitas a mais por cliente, ao mês</span>
              <span className={styles.inputWrap}><input type="number" min="0" max="100" step="0.1" inputMode="decimal" value={values.extraVisitsPerCustomer} onChange={(event) => update("extraVisitsPerCustomer", event.currentTarget.value)} /><small>visitas</small></span>
              <small className={styles.fieldHint}>Por exemplo, 0,5 equivale a uma visita a mais a cada dois meses.</small>
            </label>
            <label className={styles.field}>
              <span>Valor médio de cada compra</span>
              <span className={styles.inputWrap}><small>R$</small><input type="number" min="0" max="1000000" step="1" inputMode="decimal" value={values.averageTicket} onChange={(event) => update("averageTicket", event.currentTarget.value)} /></span>
            </label>
            <label className={styles.field}>
              <span>Margem bruta estimada</span>
              <span className={styles.inputWrap}><input type="number" min="0" max="100" step="1" inputMode="decimal" value={values.grossMargin} onChange={(event) => update("grossMargin", event.currentTarget.value)} /><small>%</small></span>
            </label>
            <label className={`${styles.field} ${styles.fullField}`}>
              <span>Investimento mensal previsto em recompensas</span>
              <span className={styles.inputWrap}><small>R$</small><input type="number" min="0" max="10000000" step="10" inputMode="decimal" value={values.rewardInvestment} onChange={(event) => update("rewardInvestment", event.currentTarget.value)} /></span>
            </label>
          </div>

          <aside className={styles.results} aria-label="Resultados estimados do cenário" aria-live="polite" aria-atomic="true">
            <div className={styles.resultEyebrow}><span /> SEU CENÁRIO HIPOTÉTICO</div>
            <div className={styles.primaryResult}>
              <span>Vendas adicionais estimadas</span>
              <strong>{currency.format(additionalSales)}</strong>
              <small>{quantity.format(additionalVisits)} visitas adicionais no mês</small>
            </div>
            <div className={styles.resultDivider} />
            <div className={styles.resultLine}><span>Margem bruta estimada</span><b>{currency.format(grossContribution)}</b></div>
            <div className={styles.resultLine}><span>Investimento em recompensas</span><b>− {currency.format(values.rewardInvestment)}</b></div>
            <div className={`${styles.balance} ${afterRewards >= 0 ? styles.positive : styles.negative}`}><span>Saldo após recompensas</span><strong>{currency.format(afterRewards)}</strong></div>
            <div className={styles.breakEven}>
              <span className={styles.breakEvenIcon} aria-hidden="true">↗</span>
              <p>{breakEvenVisits === null
                ? "Informe um valor de compra e uma margem acima de zero para calcular o ponto de equilíbrio."
                : <>Com estas premissas, <b>{quantity.format(breakEvenVisits)} {breakEvenVisits === 1 ? "visita adicional" : "visitas adicionais"}</b> cobririam o investimento previsto em recompensas.</>}</p>
            </div>
          </aside>
        </div>

        <p className={styles.disclaimer}><span aria-hidden="true">ⓘ</span> Simulação baseada apenas nos números informados. Não é previsão nem garantia de resultado. Não considera visitas que aconteceriam de qualquer forma, mensalidade da plataforma, impostos ou outros custos do negócio.</p>
      </div>
    </section>
  );
}
