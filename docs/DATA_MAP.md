# Mapa Técnico de Dados e Operações de Tratamento (`DATA_MAP.md`)

> **Finalidade deste documento:** apoiar tecnicamente o **Registro das Operações de Tratamento de Dados Pessoais (ROPA — Art. 37 da Lei nº 13.709/2018 — LGPD)** e documentar os controles de *Privacy by Design* e *Security by Design* implementados no código-fonte da aplicação **DS Arte Automotiva**.
>
> **Aviso Legal:** este documento descreve fatos técnicos da arquitetura de software e **não substitui validação jurídica formal** pelo Controlador ou assessoria especializada quanto ao enquadramento societário, bases legais definitivas, contratos com operadores ou prazos de retenção fora da aplicação.

---

## 1. Identificação do Controlador e Canal do Titular

- **Controlador:** `Diogo Soares — DS Arte Automotiva` *(campos opcionais `legalName` e `cnpj` disponíveis em `src/data/business.ts`)*
- **Endereço físico:** Rua Geraldo Pereira da Costa, 290 — João Bonito, Valença - RJ, CEP 27600-000
- **Canal gratuito de atendimento ao titular (Arts. 18 e 41 § 1º / Res. CD/ANPD nº 2/2022):** WhatsApp oficial `(24) 99234-5623` (com link direto pré-identificado no modal de Aviso de Privacidade) e suporte a e-mail dedicado opcional (`privacyEmail` em `src/data/business.ts`).

---

## 2. Inventário Técnico de Dados e Fluxos

| Ativo / Fluxo | Classificação LGPD | Origem / Ponto de Coleta | Armazenamento na Aplicação | Destino / Compartilhamento | Hipótese Legal de Referência *(a validar pelo jurídico)* | Controles Técnicos Implementados |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Logs técnicos de conexão HTTP (`IP`, `User-Agent`, TLS, rota solicitada)** | Pessoal Comum (Art. 5º, I) | Requisição HTTPS do navegador | Nenhum na aplicação | **Vercel Inc.** (CDN / Hospedagem — transferência internacional, Art. 33) | Legítimo interesse / segurança técnica (Art. 7º, IX) | `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restritiva e fontes `.woff2` auto-hospedadas em `public/fonts/` (eliminando envio de IP ao Google Fonts). |
| **Fotos de prévia no Comparador Antes & Depois** | Pessoal Comum (potencial placa, rosto, EXIF GPS) | Input local em `CustomPhotoUploader.tsx` | Somente memória RAM volátil (`blob:` URL) | **Nenhum** (100% local no navegador do visitante) | Execução de funcionalidade solicitada pelo usuário / legítimo interesse | Bloqueio de `image/svg+xml`, checagem de assinatura binária (*magic bytes* JPEG/PNG/WebP), teto de 10 MB, re-renderização via `<canvas>` até 2048px (**remoção automática de EXIF/GPS**) e `URL.revokeObjectURL` imediato ao remover ou substituir fotos. |
| **Simulação de Orçamento e Lista de Serviços (`vehicleSize`, pacote, adicionais, `periodPreference`, `includePickup`, `vehicleModel`, `cartItems`)** | Técnico; torna-se Pessoal Comum (Art. 5º, I) quando vinculado ao WhatsApp do titular | `SimulatorSection.tsx` e `GallerySection.tsx` | Somente memória React (`useState`; zero `localStorage` ou cookies) | **WhatsApp LLC / Meta** e aparelho oficial da oficina **somente após clique voluntário** do titular em CTA `wa.me` | Procedimentos preliminares relacionados a contrato a pedido do titular (Art. 7º, V) | Normalização Unicode `NFKC`, remoção de controles invisíveis/formatação WhatsApp, alerta visual e omissão automática (`redactSensitiveIdentifiers`) de placas, CPF, telefone e e-mail na URL `wa.me/?text=`. |
| **Mapa Interativo de Localização (`iframe` Google Maps)** | Pessoal Comum (IP, cookies Google, telemetria de frame) | `LocationSection.tsx` | Nenhum até ação explícita | **Google LLC** (EUA — Art. 33) **somente se o usuário clicar em "Ativar Mapa Interativo"** | Ação inequívoca / consentimento contextual para recurso sob demanda | Fachada *Click-to-Load* bloqueando o `iframe` por padrão, opção *"Desativar mapa"*, `sandbox` restritivo e `referrerPolicy="strict-origin-when-cross-origin"`. |
| **Links externos de navegação GPS (Google Maps / Waze)** | Pessoal Comum (na plataforma de destino) | Clique voluntário nos botões de rota | Nenhum | **Google LLC / Waze Mobile Ltd.** | Solicitação direta do titular | `rel="noopener noreferrer"` suprimindo `Referer` e isolando `window.opener`. |

---

## 3. Operadores e Terceiros Mapeados

1. **Vercel Inc.** — Operador de infraestrutura de hospedagem estática e CDN global (EUA / Edge).
2. **WhatsApp LLC / Meta Platforms, Inc.** — Plataforma externa de mensageria acionada exclusivamente por iniciativa do titular nos CTAs de orçamento, visita ou atendimento LGPD.
3. **Google LLC / Waze Mobile Ltd.** — Acionados exclusivamente sob demanda quando o visitante ativa a fachada do mapa interativo ou clica nos links externos de rota GPS.

*(Nota: o Google Fonts CDN foi eliminado de `index.html` e substituído por arquivos `.woff2` auto-hospedados em `public/fonts/`).*

---

## 4. Responsabilidades Organizacionais Fora do Código (Controlador)

1. **Segurança do aparelho e conta WhatsApp Business (Art. 46):** manter PIN de verificação em duas etapas ativo no WhatsApp, bloqueio biométrico/senha no smartphone e sessões WhatsApp Web, além de controle de backups em nuvem.
2. **Ciclo de retenção e descarte no WhatsApp (Arts. 15 e 16):** definir e aplicar rotina periódica de arquivamento/exclusão de orçamentos não contratados e atendimento em prazo razoável às solicitações do Art. 18 recebidas pelo canal oficial.
3. **Publicação futura de fotos reais no portfólio:** antes de incluir imagens em `public/fotos/`, remover metadados EXIF/GPS, tarjar placas e rostos identificáveis e colher autorização específica quando aplicável.
