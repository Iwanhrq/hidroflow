@@ -1 +1,55 @@
# Sennity – ESP32 Firmware

Este diretório contém o código-fonte que roda no microcontrolador **ESP32**, responsável pela automação da irrigação da horta escolar no projeto **HidroFlow**. O firmware lê os dados dos sensores de umidade do solo e aciona automaticamente a bomba de água sempre que necessário, promovendo o uso sustentável da água reaproveitada do ar-condicionado da escola.

## 📌 Funcionalidades
- Leitura de sensores de umidade (entrada analógica)
- Acionamento automático da bomba de irrigação (saída digital)
- Monitoramento contínuo com intervalo configurável
- Envio de dados via serial (e futuramente Wi-Fi, MQTT ou HTTP)
- Compatível com simulação em Wokwi

## 🔧 Requisitos
- ESP32 DevKit (ou placa similar)
- Arduino IDE ou PlatformIO
- Cabo USB para upload
- Sensor de umidade analógico
- Bomba d'água de pequeno porte (5V ou 12V)
- Transistor ou relé (para acionar a bomba)
- Jumpers e protoboard

## 🔌 Pinagem sugerida

| Função                | Pino no ESP32 |
|----------------------|---------------|
| Sensor de Umidade    | GPIO 36       |
| Bomba d'água (relé)  | GPIO 27       |
| VCC (sensor)         | 3.3V          |
| GND                  | GND           |

> Obs.: os pinos podem ser alterados no código `main.ino` conforme a necessidade.

## 🧪 Como usar

1. Abra o arquivo `main.ino` na Arduino IDE.
2. Instale a placa ESP32 se ainda não tiver:
   - Vá em: **Arquivo > Preferências** → Adicione a URL:
     ```
     https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
     ```
   - Depois vá em **Ferramentas > Placa > Gerenciador de Placas** e instale **ESP32 by Espressif Systems**.
3. Selecione a placa: `ESP32 Dev Module`
4. Conecte o ESP32 via USB.
5. Durante o upload, **mantenha pressionado o botão BOOT** até iniciar a escrita.
6. Abra o **Monitor Serial** com baud rate `115200` para ver os dados.

## 🧰 Bibliotecas usadas

- Nenhuma biblioteca externa no momento (apenas funções nativas do Arduino/ESP32)

## 📤 Simulação

Você pode testar a lógica do firmware em [Wokwi](https://wokwi.com/).  
(Em breve: link para simulação aqui)

