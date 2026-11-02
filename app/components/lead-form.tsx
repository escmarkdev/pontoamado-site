"use client";

import { FormEvent, useState } from "react";
import styles from "./lead-form.module.css";

type LeadResponse = { error?: string };

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [wantsPresentation, setWantsPresentation] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      contactName: String(formData.get("contactName") ?? ""),
      businessName: String(formData.get("businessName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      businessType: String(formData.get("businessType") ?? ""),
      wantsPresentation,
      message: String(formData.get("message") ?? ""),
      contactPermission: formData.get("contactPermission") === "on",
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as LeadResponse;

      if (!response.ok) {
        setError(result.error || "Não foi possível enviar agora. Tente novamente em instantes.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Não foi possível enviar agora. Confira sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <b>{wantsPresentation ? "Pedido de apresentação recebido." : "Interesse recebido."}</b>
        <p>{wantsPresentation
          ? "Vamos combinar um horário pelo contato que você informou."
          : "Vamos entrar em contato pelo canal que você informou."}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submitLead}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Seu nome <i>*</i></span>
          <input name="contactName" type="text" autoComplete="name" maxLength={120} placeholder="Como podemos chamar você?" required />
        </label>
        <label className={styles.field}>
          <span>Nome do comércio <i>*</i></span>
          <input name="businessName" type="text" autoComplete="organization" maxLength={120} placeholder="O nome do seu negócio" required />
        </label>
        <label className={styles.field}>
          <span>E-mail</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} placeholder="voce@exemplo.com" value={email} onChange={(event) => setEmail(event.currentTarget.value)} required={!phone.trim()} />
        </label>
        <label className={styles.field}>
          <span>WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={24} placeholder="(00) 00000-0000" value={phone} onChange={(event) => setPhone(event.currentTarget.value)} required={!email.trim()} />
        </label>
        <label className={`${styles.field} ${styles.fullField}`}>
          <span>Qual é o segmento do seu comércio?</span>
          <select name="businessType" defaultValue="">
            <option value="">Selecione uma opção</option>
            <option value="cafe_restaurante">Café ou lanchonete</option>
            <option value="padaria_confeitaria">Padaria ou confeitaria</option>
            <option value="beleza">Salão ou barbearia</option>
            <option value="loja_presentes">Loja ou presentes</option>
            <option value="pet_shop">Pet shop</option>
            <option value="mercado_bairro">Mercadinho ou comércio de bairro</option>
            <option value="outro">Outro</option>
          </select>
        </label>
        <label className={`${styles.field} ${styles.fullField}`}>
          <span>Quer nos contar mais? <small>opcional</small></span>
          <textarea name="message" rows={3} maxLength={600} placeholder="Dúvidas ou o que você gostaria de saber na apresentação…" />
        </label>
      </div>

      <label className={styles.presentationChoice}>
        <input name="wantsPresentation" type="checkbox" checked={wantsPresentation} onChange={(event) => setWantsPresentation(event.currentTarget.checked)} />
        <span><b>Tenho interesse em uma apresentação rápida</b><small>Vamos combinar o melhor horário pelo contato informado.</small></span>
      </label>

      <div className={styles.honeypot} aria-hidden="true">
        <label>Deixe este campo vazio<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className={styles.consent}>
        <input name="contactPermission" type="checkbox" required />
        <span>Autorizo o PontoAmado a usar estes dados para responder ao meu interesse e, se solicitado, combinar uma apresentação. <i>*</i></span>
      </label>

      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando…" : wantsPresentation ? "Solicitar apresentação" : "Quero conhecer o PontoAmado"}
        {!isSubmitting && <span aria-hidden="true">↗</span>}
      </button>
      <p className={styles.requiredNote}><i>*</i> Campos obrigatórios. Informe pelo menos um contato.</p>
    </form>
  );
}
