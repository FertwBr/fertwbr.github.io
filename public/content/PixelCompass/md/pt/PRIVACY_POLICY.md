# Política de Privacidade para o Pixel Compass

**Última Atualização:** 17 de março de 2026

Bem-vindo ao Pixel Compass! Esta Política de Privacidade explica como o **fertwbr** ("nós", "nos" ou "nosso") lida com
as informações quando você usa o nosso aplicativo móvel Pixel Compass (o "Serviço").

O nosso compromisso é com a sua privacidade. Embora o Pixel Compass exija sensores e conectividade específicos para
funcionar, o nosso objetivo é processar os dados localmente sempre que possível e minimizar a transmissão externa.

Esta Política de Privacidade também reflete a conformidade com as leis brasileiras de privacidade e proteção digital,
incluindo a **Lei Geral de Proteção de Dados (LGPD)** e a **Lei nº 15.211/2025 ("ECA Digital")**, a qual estabelece
proteções adicionais para menores de idade em ambientes digitais.

## 1. Informações que Processamos

Para fornecer dados precisos de navegação e de clima, o aplicativo processa os seguintes tipos de informações:

### a) Dados de Localização (Precisa)

**Finalidade:** A funcionalidade principal do Serviço depende do acesso à localização precisa do seu dispositivo (
latitude e longitude). Nós usamos isso para:

* Exibir as suas coordenadas geográficas.
* Calcular o **Norte Verdadeiro** (ao determinar a declinação magnética para a sua localização específica).
* Obter as condições climáticas locais e os dados de elevação por meio de APIs externas.
* Alimentar os widgets baseados em localização (se o Pixel Compass+ estiver ativo).

**Processamento e Compartilhamento:**

* **Uso Local:** Usado internamente pela API `android.hardware.GeomagneticField` do Android para corrigir os erros da
  bússola.
* **APIs Externas:** As suas coordenadas são enviadas a provedores terceirizados (**Google Weather API** e **Google
  Elevation API**) estritamente para recuperar os dados ambientais exibidos na sua tela.

**Gatilho de Coleta:**

Os dados de localização são acessados apenas quando o aplicativo está em uso (primeiro plano) ou quando um widget exige
uma atualização agendada. Nós usamos um **Serviço de Primeiro Plano** (indicado por uma notificação persistente) para
garantir que a precisão do sensor e as atualizações de dados permaneçam ativas enquanto você utiliza o aplicativo.

**Nós não rastreamos nem armazenamos o seu histórico de localização em segundo plano.**

### b) Dados de Sensores

**Tipos:** Acelerômetro, Magnetômetro (bússola), Vetor de Rotação e Sensor de Pressão (barômetro).

**Finalidade:** Essencial para calcular as estimativas de Azimute (direção da bússola), Inclinação (Pitch), Rotação (
Roll) e Altitude.

**Processamento:** Estes dados são processados **inteiramente localmente no seu dispositivo**. Eles **não** são
registrados, armazenados em servidores externos ou transmitidos a nós.

### c) Acesso à Rede e Dados de API

**Finalidade:** O acesso à internet é exigido para a comunicação com as APIs de Clima e de Elevação e para validar as
Compras no Aplicativo com o Google Play.

**Dados Transmitidos:**

Latitude, Longitude e as informações padrão de endereço IP exigidas para as solicitações HTTPS aos serviços do Google.

### d) Informações de Compra no Aplicativo (Pixel Compass+)

**Finalidade:** Para gerenciar o acesso aos recursos premium por meio de uma **compra única (Legado)** ou de uma *
*assinatura recorrente**.

**Dados Processados pelo Google Play:**

Todas as transações financeiras são tratadas de forma segura pelo **sistema de faturamento do Google Play**. Nós **não**
coletamos, acessamos ou armazenamos as suas informações de pagamento (como os números de cartão de crédito ou os
detalhes de conta bancária).

**Armazenamento Local:**

Nós armazenamos um sinalizador local no seu dispositivo (por meio das preferências do DataStore) que indica o seu
status "premium". Isso permite que o aplicativo verifique a sua licença offline e desbloqueie os recursos sem o acesso
constante à internet.

### e) Feedback, Registros e Anexos Opcionais

O Pixel Compass fornece um **sistema opcional de suporte no aplicativo** que permite que os usuários enviem feedback,
relatórios de erros ou sugestões.

O envio de feedback é **totalmente voluntário**.

Os usuários podem escolher incluir:

* um endereço de e-mail para contato
* feedback escrito
* capturas de tela ou anexos
* informações de diagnóstico opcionais

As informações de diagnóstico podem incluir detalhes técnicos, tais como:

* modelo do dispositivo
* versão do Android
* versão do aplicativo
* configurações de localidade

Exemplos de informações de diagnóstico podem aparecer de forma semelhante a:

Device: Google sdk_gphone64_x86_64
Android Version: 16 (API 36)
App Version: 1.20.0
Locale: pt_BR

Estas informações ajudam a diagnosticar os problemas e a melhorar o aplicativo. Os usuários podem revisar ou remover as
informações antes do envio.

## 2. Permissões

Para fornecer o Serviço, nós solicitamos as seguintes permissões no seu dispositivo:

* **Localização (Precisa):** Exigida para calcular o Norte Verdadeiro, a declinação magnética e obter os dados precisos
  de Clima/Elevação.
* **Internet:** Exigida para obter os dados de API e verificar o status da assinatura.
* **Serviço de Primeiro Plano:** Exigida para manter as leituras de sensores e as atualizações de localização ativas,
  sem interrupção, enquanto o aplicativo está em execução ou a tela está ativa.
* **Notificações:** Usada para exibir o status do serviço de primeiro plano (uma exigência do Sistema Android) ou para
  fornecer alertas relacionados à funcionalidade do aplicativo.

## 3. Compartilhamento e Divulgação de Informações

Nós **não** vendemos, alugamos ou compartilhamos as suas informações pessoais com anunciantes ou com terceiros não
autorizados.

No entanto, para fornecer os recursos do aplicativo, dados específicos são compartilhados com os seguintes provedores de
serviços:

* **Google Weather & Elevation APIs:** A sua latitude e a sua longitude são enviadas a estes serviços exclusivamente
  para retornar os dados de clima e de altitude para o seu dispositivo.
* **Faturamento do Google Play:** Usado para processar os pagamentos e validar a sua assinatura ou licença de legado.
* **Exigências Legais:** Nós podemos divulgar as informações caso exigido por lei ou em resposta às solicitações válidas
  por autoridades públicas (por exemplo, um tribunal ou uma agência governamental).

## 4. Segurança, Retenção e Exclusão de Dados

**Segurança:**

Nós usamos a **criptografia HTTPS** padrão do setor para todas as solicitações de API.

Os dados de sensores (magnetômetro/acelerômetro) são processados na memória em tempo real e descartados imediatamente
após o cálculo.

**Retenção:**

* **Cache:** Os dados de clima podem ser armazenados em cache temporariamente no seu dispositivo para reduzir o uso de
  dados e melhorar o desempenho.
* **Preferências:** As configurações do usuário (Tema, Sistemas de unidades, Alternância do Norte Verdadeiro, Status
  Plus) são armazenadas localmente no seu dispositivo por meio do DataStore.

**Backup da Configuração premium:**

Para os usuários do Pixel Compass+, o aplicativo pode armazenar um **backup local de determinadas configurações premium
** para permitir a restauração caso o usuário reative a sua assinatura enquanto o aplicativo permanece instalado.

Este backup existe apenas no dispositivo e não é transmitido para os nossos servidores.

Se o aplicativo for desinstalado, o backup pode ser removido permanentemente junto com os dados locais do aplicativo.

**Exclusão:**

* Você pode limpar todos os dados armazenados ao desinstalar o aplicativo ou ao limpar o armazenamento do aplicativo por
  meio das Configurações do Android.
* Como o Pixel Compass **não opera contas de usuários e não mantém servidores que armazenam os dados pessoais de
  usuários**, **não há dados pessoais do lado do servidor armazenados por nós que exijam solicitações de exclusão**.

**Observação sobre as Compras:**

A limpeza dos dados do aplicativo exclui o sinalizador "premium" local. Para restaurar o seu status após a reinstalação
ou após a limpeza de dados, basta usar a opção **"Restaurar Compras"** nas configurações do aplicativo, a qual
revalidará a sua licença com o Google Play.

## 5. Aviso de Isenção de Responsabilidade sobre Navegação e Segurança

O Pixel Compass é uma ferramenta de software que utiliza sensores de hardware de nível de consumidor encontrados em
dispositivos móveis.

* **Não para Navegação Crítica:** **Não** confie neste aplicativo para navegação marítima, aviação ou navegação
  terrestre profissional, nas quais a imprecisão possa resultar em danos, morte ou danos à propriedade.
* **Interferência:** As leituras da bússola podem ser fortemente afetadas por interferência magnética de eletrônicos
  próximos, baterias, carros ou capas protetoras que contenham ímãs. Sempre verifique os seus arredores.

## 6. Privacidade das Crianças

O Serviço não é destinado a menores de **13** anos de idade.

No entanto, o aplicativo pode estar acessível aos usuários adolescentes com idade entre **13 e 17** anos, a depender das
configurações de distribuição da plataforma.

De acordo com as leis brasileiras de proteção digital, incluindo o **ECA Digital (Lei nº 15.211/2025)**, o aplicativo
segue os **princípios de minimização de dados e privacidade desde a concepção (privacy-by-design)**, especialmente para
os usuários mais jovens.

O Pixel Compass:

* **Não** cria perfis comportamentais dos usuários.
* **Não** realiza o rastreamento entre os aplicativos ou serviços.
* **Não** usa identificadores de publicidade.
* **Não** coleta os dados pessoais desnecessários além daqueles exigidos para a funcionalidade técnica principal do
  aplicativo.

Se você é um pai ou responsável e acredita que uma criança forneceu informações pessoais além do que é descrito aqui,
por favor, entre em contato conosco.

## 7. Sem Rastreamento Comportamental ou Criação de Perfis

O Pixel Compass é projetado como uma **ferramenta técnica baseada em sensores** e não inclui sistemas para:

* criação de perfis de análise comportamental
* publicidade direcionada
* manipulação de engajamento
* sistemas de rastreamento social

A maior parte dos dados usados pelo aplicativo é processada **localmente no dispositivo** e descartada imediatamente
após o uso.

## 8. Alterações a Esta Política de Privacidade

Nós podemos atualizar a nossa Política de Privacidade de tempos em tempos. Nós o notificaremos sobre quaisquer
alterações significativas ao publicar a nova Política de Privacidade nesta página e ao atualizar a data de "Última
Atualização" no topo deste documento.

## 9. Fale Conosco

Se você tem quaisquer dúvidas sobre esta Política de Privacidade ou sobre as práticas deste aplicativo, por favor, entre
em contato conosco em:

**e-mail:** [contact@fertwbr.com](mailto:contact@fertwbr.com)