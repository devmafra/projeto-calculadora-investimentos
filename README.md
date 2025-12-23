# Calculadora de Investimentos

Este é um projeto de uma calculadora de investimentos desenvolvida com JavaScript, Vite e Tailwind CSS. A aplicação permite que o usuário simule o rendimento de um investimento ao longo do tempo, considerando aportes mensais, taxas de juros e impostos.

## 📋 Funcionalidades

- **Simulação de Investimentos**: Calcule o retorno financeiro com base em:
  - Valor inicial
  - Aportes adicionais
  - Tempo de investimento (anos ou meses)
  - Taxa de rentabilidade (anual ou mensal)
  - Taxa de impostos sobre o lucro
- **Visualização Gráfica**:
  - **Gráfico de Rosca**: Exibe a distribuição final entre valor investido, rendimento bruto e impostos.
  - **Gráfico de Barras**: Mostra a evolução do patrimônio mês a mês (Total Investido vs. Retorno).
- **Tabela Detalhada**: Lista os valores mês a mês, incluindo rendimento mensal e acumulado.
- **Validação de Dados**: Garante que os valores inseridos sejam numéricos e válidos.
- **Interface Responsiva**: Estilizada com Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **[Vite](https://vitejs.dev/)**: Build tool rápida para desenvolvimento web moderno.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilização ágil.
- **[Chart.js](https://www.chartjs.org/)**: Biblioteca para criação de gráficos interativos.
- **JavaScript (ES6+)**: Lógica da aplicação.

## 📦 Como executar o projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Execute o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acesse a aplicação**:
   Abra o navegador e acesse o link exibido no terminal (geralmente `http://localhost:5173/`).

## 🛠️ Estrutura do Projeto

- `main.js`: Arquivo principal que gerencia a lógica da interface, eventos do formulário e renderização dos gráficos.
- `src/table.js`: Módulo responsável pela criação e renderização da tabela de resultados.
- `vite.config.js`: Configuração do Vite e plugins (Tailwind CSS).
- `main.js`: Arquivo principal que gerencia a lógica da interface, eventos do formulário e renderização dos gráficos.
- `src/table.js`: Módulo responsável pela criação e renderização da tabela de resultados.
- `vite.config.js`: Configuração do Vite e plugins (Tailwind CSS).
