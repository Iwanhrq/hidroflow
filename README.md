💧 HidroFlow – Sistema de Irrigação Automatizada
HidroFlow é uma solução inteligente de irrigação automatizada que reutiliza a água condensada de aparelhos de ar-condicionado para irrigar hortas escolares. O sistema promove o uso consciente da água e incentiva práticas sustentáveis no ambiente educacional.

Este repositório contém o código-fonte do aplicativo mobile e o firmware para ESP32, ambos integrados para formar o sistema completo.

📱 Aplicativo Mobile
O aplicativo HidroFlow é responsável por:

Monitorar a umidade do solo em tempo real

Exibir os dados coletados pelos sensores conectados ao ESP32

Permitir o acionamento manual da irrigação

Oferecer uma interface intuitiva, projetada no Figma

O app se comunica com o microcontrolador via Bluetooth (ou futuramente via Wi-Fi) para obter dados e controlar o sistema.

🔌 Firmware – Sennity (ESP32)
O firmware Sennity é a parte embarcada do sistema, responsável por ler os sensores e controlar a bomba de água de forma autônoma.

⚙️ Funcionalidades:
Leitura de sensores de umidade (entrada analógica)

Acionamento automático da bomba de irrigação (saída digital)

Monitoramento contínuo com intervalo configurável

Envio de dados via porta serial (futuramente por Wi-Fi com MQTT/HTTP)

Compatível com simulação em Wokwi

🔧 Requisitos:
ESP32 DevKit (ou similar)

Arduino IDE ou PlatformIO

Sensor de umidade analógico

Bomba d'água (5V ou 12V)

Relé ou transistor

Protoboard, jumpers e cabo USB

🗂️ Pinagem Sugerida:
Função	Pino no ESP32
Sensor de Umidade	GPIO 36
Bomba d'água (relé)	GPIO 27
VCC (sensor)	3.3V
GND	GND

Os pinos podem ser modificados no arquivo main.ino.

🧪 Como usar o firmware
Abra main.ino na Arduino IDE.

Adicione a URL de placas ESP32:

bash
Copiar
Editar
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
Instale a placa ESP32 by Espressif Systems.

Selecione a placa ESP32 Dev Module.

Conecte o ESP32 via USB.

Durante o upload, pressione o botão BOOT até o início da escrita.

Use o Monitor Serial (baud rate 115200) para visualizar os dados.

📤 Simulação
Você pode testar o comportamento do firmware no Wokwi:
(link da simulação será adicionado em breve)

📂 Estrutura do Repositório
bash
Copiar
Editar
/
├── app/          # Código do aplicativo mobile
└── firmware/     # Código do ESP32 (Sennity)
🌿 Licença
Este projeto é de código aberto e licenciado sob a MIT License.

Se quiser, posso incluir também:

Badges (Build, License, Platform)

Imagens da montagem ou da interface

GIFs mostrando o funcionamento do sistema

Quer que eu adicione algum desses itens?
