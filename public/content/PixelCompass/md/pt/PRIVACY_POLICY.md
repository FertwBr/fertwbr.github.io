# Política de Privacidade do Pixel Compass

**Última Atualização:** 06 de janeiro de 2026

Bem-vindo ao Pixel Compass! Esta Política de Privacidade explica como **fertwbr** ("nós", "nos" ou "nosso") trata as informações quando você utiliza nosso aplicativo móvel Pixel Compass (o "Serviço").

Nosso compromisso é com a sua privacidade. Embora o Pixel Compass exija sensores específicos e conectividade para funcionar, buscamos processar dados localmente sempre que possível e minimizar a transmissão externa.

## 1. Informações que Processamos

Para fornecer dados precisos de navegação e clima, o aplicativo processa os seguintes tipos de informações:

### a) Dados de Localização (Precisa)
* **Finalidade:** A funcionalidade central do Serviço depende do acesso à localização precisa do seu dispositivo (latitude e longitude). Usamos isso para:
  * Exibir suas coordenadas geográficas.
  * Calcular o **Norte Verdadeiro** (determinando a declinação magnética para sua localização específica).
  * Buscar condições climáticas locais e dados de elevação através de APIs externas.
  * Alimentar widgets baseados em localização (se o Pixel Compass+ estiver ativo).
* **Processamento e Compartilhamento:**
  * **Uso Local:** Usado internamente pela API `android.hardware.GeomagneticField` do Android para corrigir erros da bússola.
  * **APIs Externas:** Suas coordenadas são enviadas a provedores terceirizados (**Google Weather API** e **Google Elevation API**) estritamente para recuperar os dados ambientais exibidos em sua tela.
* **Gatilho de Coleta:** Os dados de localização são acessados apenas quando o aplicativo está em uso (primeiro plano) ou quando um widget requer uma atualização agendada. Usamos um **Foreground Service** (indicado por uma notificação persistente) para garantir que a precisão do sensor e as atualizações de dados permaneçam ativas enquanto você estiver usando o aplicativo. **Nós não rastreamos ou armazenamos seu histórico de localização em segundo plano.**

### b) Dados do Sensor
* **Tipos:** Acelerômetro, Magnetômetro (Bússola), Vetor de Rotação e Sensor de Pressão (Barômetro).
* **Finalidade:** Essencial para calcular estimativas de Azimute (orientação da bússola), Pitch (inclinação), Roll (rolagem) e Altitude.
* **Processamento:** Estes dados são processados **inteiramente de forma local no seu dispositivo**. Eles **não** são gravados, armazenados em servidores externos ou transmitidos para nós.

### c) Acesso à Rede e Dados de API
* **Finalidade:** O acesso à Internet é necessário para se comunicar com as APIs de Clima e Elevação e para validar Compras no Aplicativo com o Google Play.
* **Dados Transmitidos:** Latitude, Longitude e informações padrão de endereço IP necessárias para solicitações HTTPS aos serviços do Google.

### d) Informações de Compra no Aplicativo (Pixel Compass+)
* **Finalidade:** Gerenciar o acesso a recursos premium por meio de uma **compra única (Legacy)** ou uma **assinatura recorrente**.
* **Dados Processados pelo Google Play:** Todas as transações financeiras são tratadas de forma segura pelo **sistema de faturamento do Google Play**. Nós **não** coletamos, acessamos ou armazenamos suas informações de pagamento (como números de cartão de crédito ou detalhes bancários).
* **Armazenamento Local:** Armazenamos um sinalizador local em seu dispositivo (via preferências do **DataStore**) indicando seu status "Premium". Isso permite que o aplicativo verifique sua licença offline e desbloqueie recursos sem acesso constante à internet.

## 2. Permissões

Para fornecer o Serviço, solicitamos as seguintes permissões no seu dispositivo:

* **Localização (Precisa):** Necessária para calcular o Norte Verdadeiro, declinação magnética e buscar dados precisos de Clima/Elevação.
* **Internet:** Necessária para buscar dados de API e verificar o status da assinatura.
* **Foreground Service:** Necessário para manter leituras ativas dos sensores e atualizações de localização sem interrupção enquanto o aplicativo estiver em execução ou a tela estiver ativa.
* **Notificações:** Usadas para exibir o status do serviço em primeiro plano (um requisito do Sistema Android) ou para fornecer alertas relacionados à funcionalidade do aplicativo.

## 3. Compartilhamento e Divulgação de Informações

Nós **não** vendemos, alugamos ou compartilhamos suas informações pessoais com anunciantes ou terceiros não autorizados. No entanto, para fornecer os recursos do aplicativo, dados específicos são compartilhados com os seguintes provedores de serviços:

* **Google Weather & Elevation APIs:** Sua latitude e longitude são enviadas a esses serviços exclusivamente para retornar dados de clima e altitude para o seu dispositivo.
* **Google Play Billing:** Usado para processar pagamentos e validar sua assinatura ou licença legada (**Legacy**).
* **Requisitos Legais:** Podemos divulgar informações se exigido por lei ou em resposta a solicitações válidas de autoridades públicas (por exemplo, um tribunal ou uma agência governamental).

## 4. Segurança, Retenção e Exclusão de Dados

* **Segurança:** Utilizamos criptografia **HTTPS** padrão da indústria para todas as solicitações de API. Dados do sensor (magnetômetro/acelerômetro) são processados na memória em tempo real e descartados imediatamente após o cálculo.
* **Retenção:**
  * **Cache:** Dados climáticos podem ser armazenados temporariamente em cache no seu dispositivo para reduzir o uso de dados e melhorar o desempenho.
  * **Preferências:** Configurações do usuário (Tema, Sistemas de unidades, alternância do Norte Verdadeiro, Status Plus) são armazenadas localmente no seu dispositivo via **DataStore**.
* **Exclusão:**
  * Você pode limpar todos os dados armazenados desinstalando o aplicativo ou limpando o armazenamento do aplicativo via Configurações do Android. Isso removerá imediatamente todas as preferências locais e configurações de widget.
  * **Nota sobre Compras:** Limpar os dados do aplicativo exclui o sinalizador local "Premium". Para restaurar seu status após reinstalar ou limpar dados, basta usar a opção **"Restaurar Compras"** nas configurações do aplicativo, o que revalidará sua licença com o Google Play.

## 5. Isenção de Responsabilidade de Navegação e Segurança

O Pixel Compass é uma ferramenta de software que utiliza sensores de hardware de nível de consumidor encontrados em dispositivos móveis.

* **Não para Navegação Crítica:** **Não** confie neste aplicativo para navegação marítima, aviação ou navegação terrestre profissional onde a imprecisão possa resultar em danos, morte ou danos à propriedade.
* **Interferência:** As leituras da bússola podem ser fortemente afetadas por interferência magnética de eletrônicos próximos, baterias, carros ou capas protetoras contendo ímãs. Verifique sempre o seu entorno.

## 6. Privacidade Infantil

O Serviço não se destina a menores de 13 anos. Não coletamos intencionalmente informações pessoalmente identificáveis de crianças. Se você é pai/mãe ou responsável e tem conhecimento de que seu filho nos forneceu dados pessoais, entre em contato conosco.

## 7. Alterações nesta Política de Privacidade

Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações significativas publicando a nova Política de Privacidade nesta página e atualizando a data da "Última Atualização" no topo deste documento.

## 8. Entre em Contato Conosco

Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre as práticas deste aplicativo, entre em contato conosco em:

**E-mail:** fertwbr@programmer.net