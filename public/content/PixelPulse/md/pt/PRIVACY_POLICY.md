# Política de Privacidade do Pixel Pulse

**Última Atualização:** 6 de janeiro de 2026

Bem-vindo ao Pixel Pulse! Esta Política de Privacidade explica como **fertwbr** ("nós", "nos" ou "nosso") trata as informações quando você utiliza nossos aplicativos Pixel Pulse móveis e vestíveis (o "Serviço").

## 1. Informações que Processamos

O nosso compromisso é com a sua privacidade. O Serviço foi projetado para funcionar quase inteiramente de forma local no seu dispositivo.

**a) Dados de Áudio (Acesso ao Microfone):**
* **Finalidade:** A funcionalidade central do Serviço requer acesso ao microfone do seu dispositivo para medir o nível de pressão sonora ambiente (decibéis).
* **Processamento:** Estes dados de áudio são processados **em tempo real, inteiramente de forma local no seu dispositivo**. O áudio bruto é descartado imediatamente após o cálculo do nível de decibéis. **Nós não armazenamos, gravamos ou transmitimos seu áudio bruto para fora do seu dispositivo.**
* **Gatilho de Coleta:** O acesso ao microfone fica ativo quando:
    1.  Você está utilizando ativamente o aplicativo (primeiro plano).
    2.  Você habilita explicitamente o **Monitoramento em Segundo Plano** ou **Sessões ao Vivo**. Nestes casos, o aplicativo desperta periodicamente ou executa um **Foreground Service** para amostrar níveis sonoros enquanto o aplicativo está fechado ou a tela está desligada. Uma notificação persistente será sempre exibida quando o monitoramento em segundo plano estiver ativo.

**b) Dados de Sessão e Exposição (Armazenados Localmente):**
* **Finalidade:** Fornecer histórico, gráficos e *insights* de saúde relacionados ao seu ambiente sonoro.
* **Dados Armazenados:** Isso inclui carimbos de data/hora (*timestamps*), duração, valores de decibéis calculados (mín/méd/máx) e métricas de dose de exposição.
* **Armazenamento:** Estes dados são armazenados em um **banco de dados local e privado no seu dispositivo**. Eles **não** são transmitidos para nós ou para qualquer servidor em nuvem gerenciado por nós. Você tem controle total para excluir estes dados a qualquer momento através das configurações do aplicativo.

**c) Sincronização com Wear OS:**
* **Finalidade:** Permitir que você visualize dados gravados em seu relógio dentro do aplicativo de telefone.
* **Método:** Se você utilizar o aplicativo complementar para Wear OS, os dados calculados (não o áudio bruto) são transferidos diretamente entre seu relógio e o telefone usando a API local *Android Wearable Data Layer* (via Bluetooth ou Wi-Fi). Estes dados permanecem dentro do ecossistema do seu dispositivo pessoal.

**d) Informações de Compra no Aplicativo (Pixel Pulse+):**
* **Finalidade:** Desbloquear recursos **Premium** através de uma **compra única**.
* **Dados Processados pelo Google Play:** Todas as transações de compra são processadas diretamente pelo **sistema de faturamento do Google Play**. Nós **não** coletamos ou armazenamos suas informações de pagamento. Recebemos apenas um token de confirmação para verificar o status da sua licença.

## 2. Permissões

* **Microfone:** Necessário para medir os níveis sonoros.
* **Notificações:** Necessárias para enviar alertas caso a exposição sonora exceda os limites seguros (recomendações da OMS) e para exibir o indicador persistente quando serviços em segundo plano estiverem em execução.
* **Foreground Service:** Necessário para manter o mecanismo de medição funcionando com precisão quando a tela estiver desligada.

## 3. Compartilhamento e Divulgação de Informações

Nós não vendemos, alugamos ou compartilhamos suas informações pessoais, ou dados de sessão. Como todos os dados principais são processados e armazenados localmente no seu dispositivo, não temos acesso a eles para compartilhar com terceiros.

## 4. Segurança, Retenção e Exclusão de Dados

* **Segurança:** Seus dados são protegidos pela *sandbox* de segurança padrão do sistema operacional **Android**.
* **Retenção:** Os dados são mantidos no seu dispositivo apenas enquanto você mantiver o aplicativo instalado.
* **Exclusão:** Você pode excluir todos os dados de exposição através da tela "Configurações > Exposição Sonora > Gerenciamento de Dados". Desinstalar o aplicativo também excluirá permanentemente todos os dados armazenados localmente.

## 5. Isenção de Responsabilidade Médica

O Pixel Pulse **não é um dispositivo médico**. Os dados e *insights* fornecidos têm apenas fins informativos e baseiam-se numa calibração genérica. Eles não devem ser utilizados para diagnósticos médicos profissionais ou como substitutos de equipamentos profissionais de proteção auditiva em ambientes industriais.

## 6. Privacidade Infantil

O Serviço não se destina a menores de 13 anos. Não coletamos intencionalmente informações pessoalmente identificáveis de crianças.

## 7. Alterações nesta Política de Privacidade

Podemos atualizar a nossa Política de Privacidade. Notificaremos você sobre quaisquer alterações significativas publicando a nova Política nesta página, atualizando a data da "Última Atualização" e/ou por meio de uma notificação no aplicativo.

## 8. Entre em Contato Conosco

Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em: **fertwbr@programmer.net**