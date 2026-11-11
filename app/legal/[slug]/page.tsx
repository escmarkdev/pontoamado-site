import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./legal.css";

const documents = {
  "termos-clientes": { title: "Termos de Uso — Clientes", prefix: "TERMOS DE USO DO PONTOAMADO", match: "CLIENTES" },
  "termos-lojistas": { title: "Termos de Uso e Contrato — Lojistas", prefix: "TERMOS DE USO E CONTRATO DE LICEN", match: "LOJISTAS" },
  "regulamento-clubes": { title: "Regulamento Geral dos Clubes de Fidelidade", prefix: "REGULAMENTO GERAL DOS CLUBES", match: "" },
  privacidade: { title: "Política de Privacidade", prefix: "POL", match: "PRIVACIDADE DO PONTOAMADO" },
} as const;

type Slug = keyof typeof documents;

export function generateStaticParams() {
  return Object.keys(documents).map((slug) => ({ slug }));
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = documents[slug as Slug];
  return { title: doc?.title ?? "Documentos legais" };
}

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    return part;
  });
}

function MarkdownContent({ source }: { source: string }) {
  const lines = source.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let ordered = false;
  const flushParagraph = () => {
    if (paragraph.length) blocks.push(<p key={`p-${blocks.length}`}>{inline(paragraph.join(" "))}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    const items = list.map((item, index) => <li key={index}>{inline(item)}</li>);
    blocks.push(ordered ? <ol key={`ol-${blocks.length}`}>{items}</ol> : <ul key={`ul-${blocks.length}`}>{items}</ul>);
    list = [];
  };
  for (const rawLine of lines) {
    const line = rawLine.trim();
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    const bullet = line.match(/^(?:[-*])\s+(.+)$/);
    const number = line.match(/^\d+[.)]\s+(.+)$/);
    if (!line || line === "---") { flushParagraph(); flushList(); continue; }
    if (heading) {
      flushParagraph(); flushList();
      const label = inline(heading[2].replace(/\\\./g, "."));
      const level = heading[1].length;
      blocks.push(level === 1 ? <h1 key={blocks.length}>{label}</h1> : level === 2 ? <h2 key={blocks.length}>{label}</h2> : <h3 key={blocks.length}>{label}</h3>);
      continue;
    }
    if (bullet || number) {
      flushParagraph();
      const nextOrdered = Boolean(number);
      if (list.length && ordered !== nextOrdered) flushList();
      ordered = nextOrdered;
      list.push((bullet ?? number)![1]);
      continue;
    }
    flushList();
    paragraph.push(line.replace(/\\\./g, "."));
  }
  flushParagraph(); flushList();
  return <div className="legal-content">{blocks}</div>;
}

const documentSources: Record<Slug, Promise<string>> = {
  "termos-clientes": readFile(path.join(process.cwd(), "content/legal/termos-clientes.md"), "utf8"),
  "termos-lojistas": readFile(path.join(process.cwd(), "content/legal/termos-lojistas.md"), "utf8"),
  "regulamento-clubes": readFile(path.join(process.cwd(), "content/legal/regulamento-clubes.md"), "utf8"),
  privacidade: readFile(path.join(process.cwd(), "content/legal/privacidade.md"), "utf8"),
};

async function getDocument(slug: Slug) {
  try {
    return await documentSources[slug];
  } catch {
    return null;
  }
}

export default async function LegalDocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in documents)) notFound();
  const config = documents[slug as Slug];
  const source = await getDocument(slug as Slug);
  if (!source) notFound();
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <Link href="/" className="legal-back">← Voltar ao PontoAmado</Link>
        <header className="legal-header">
          <span>DOCUMENTOS OFICIAIS</span>
          <h1>{config.title}</h1>
          <p>Leia atentamente as condições aplicáveis à utilização da plataforma PontoAmado.</p>
        </header>
        <MarkdownContent source={source} />
        <footer className="legal-document-footer">
          <Link href="/legal/termos-clientes">Termos dos clientes</Link>
          <Link href="/legal/termos-lojistas">Termos dos lojistas</Link>
          <Link href="/legal/regulamento-clubes">Regulamento dos clubes</Link>
          <Link href="/legal/privacidade">Política de privacidade</Link>
        </footer>
      </div>
    </main>
  );
}
