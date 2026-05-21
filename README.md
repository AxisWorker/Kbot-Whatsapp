<div align="center">

[![Untitled3-20260521140404.png](https://i.postimg.cc/fT9ZMZFV/Untitled3-20260521140404.png)](https://postimg.cc/YhMT3ct7)

### 🤖 Bot para WhatsApp — Windows · Linux · Termux

[![Version](https://img.shields.io/github/package-json/v/AxisWorker/Kbot-Whatsapp?label=vers%C3%A3o&color=%230d1f2d&style=flat-square)](https://github.com/AxisWorker/Kbot-Whatsapp/releases)
[![Stars](https://img.shields.io/github/stars/AxisWorker/Kbot-Whatsapp?label=estrelas&style=flat-square&color=%230d1f2d)](https://github.com/AxisWorker/Kbot-Whatsapp/stargazers)
[![License](https://img.shields.io/github/license/AxisWorker/Kbot-Whatsapp?style=flat-square&color=%230d1f2d)](https://github.com/AxisWorker/Kbot-Whatsapp/blob/main/LICENSE)
[![Fork of](https://img.shields.io/badge/fork%20of-lbot--whatsapp-555?style=flat-square)](https://github.com/victorsouzaleal/lbot-whatsapp)

</div>

---

## 🚨 Requerimentos

- Conhecimento básico de informática
- Um **número de celular conectado ao WhatsApp** para conectar o bot
- Um **computador com Windows/Linux** ou um **smartphone Android** para rodar a aplicação

---

## 💿 Instalação

### 🖥️ Desktop (Windows / Linux)

Instale as dependências antes de começar:

- **Git** → [Download](https://git-scm.com/downloads/win)
- **Node.js LTS** → [Download](https://nodejs.org/en/)

Baixe o `.zip` da última versão [aqui](https://github.com/AxisWorker/Kbot-Whatsapp/releases/latest), extraia e abra o terminal dentro da pasta extraída.

**Todos os comandos abaixo devem ser executados dentro da pasta do bot.**

Instale o **Yarn** (apenas na primeira vez):

```bash
npm i -g yarn
```

> **Linux:** se retornar erro de permissão, use `sudo` antes do comando.

Inicie o bot:

```bash
yarn start
```

Na primeira execução, todas as dependências serão baixadas. Após isso, escolha entre **QR Code** ou **Código de Pareamento** para conectar ao WhatsApp.

---

### 📱 Smartphone (Android / Termux)

Instale a versão mais recente do Termux direto do GitHub (não use a da Play Store):

**[Download Termux APK](https://github.com/termux/termux-app/releases/latest)**

Abra o Termux e rode o comando de instalação:

```bash
pkg install wget -y && wget -O - https://raw.githubusercontent.com/AxisWorker/Kbot-Whatsapp/main/scripts/install-termux.sh | bash && cd ~/KBOT && yarn start
```

> Na primeira vez, o download de dependências pode demorar alguns minutos. Aguarde.

Para reiniciar o bot após fechar o Termux:

```bash
cd ~/KBOT && yarn start
```

---

## 🤖 Uso

Após iniciar, envie os comandos abaixo pelo WhatsApp para o número do bot:

| Comando | Descrição |
|---|---|
| `!menu` | Abre o menu principal |
| `!admin` | Registra seu número como dono e abre o menu de administrador |

> Todos os comandos possuem um guia de uso. Digite `!comando guia` para ver.

---

## ⚙️ Administração

**Bot:** Envie `!admin` para o número do bot. Seu número será cadastrado como dono automaticamente na primeira vez.

**Grupo:** Se você for administrador do grupo, envie `!menu 5` dentro dele para acessar o menu completo de administração de grupo.

---

## 🛠️ Recursos

| Categoria | Descrição |
|---|---|
| 🖼️ **Figurinhas** | Criação de stickers a partir de imagens, vídeos e GIFs |
| 📥 **Downloads** | Baixar mídias do YouTube, Instagram, TikTok, X e mais |
| ⚒️ **Utilidades** | Encurtar links, editar áudio, buscar letras de música, etc. |
| 👾 **Entretenimento** | Comandos de diversão para grupos |
| 👥 **Adm. de Grupo** | Ferramentas de moderação e gestão de membros |
| ⚙️ **Adm. do Bot** | Controle total sobre o comportamento do bot |

📋 **Lista completa de comandos →** [COMANDOS.md](https://github.com/AxisWorker/Kbot-Whatsapp/blob/main/docs/COMANDOS.md)

---

## 🔄 Changelog

Acompanhe as mudanças em relação ao projeto original → [CHANGELOG.md](https://github.com/AxisWorker/Kbot-Whatsapp/blob/main/docs/CHANGELOG.md)

---

## 🙏 Créditos

- **[victorsouzaleal](https://github.com/victorsouzaleal)** — autor do projeto original [lbot-whatsapp](https://github.com/victorsouzaleal/lbot-whatsapp), base deste fork
- **[WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)** — biblioteca de conexão com o WhatsApp

---

<div align="center">
<sub>KBot é um fork independente e não é afiliado ao WhatsApp ou Meta.</sub>
</div>
