# 💧 HidroFlow – Sistema de Irrigação Automatizada

**HidroFlow** é uma solução inteligente de irrigação automatizada que reutiliza a água condensada de aparelhos de ar-condicionado para irrigar hortas escolares. O sistema promove o uso consciente da água e incentiva práticas sustentáveis no ambiente educacional.

Este repositório contém o código-fonte do **aplicativo mobile** e do **firmware para ESP32**, ambos integrados para formar o sistema completo.

---

## 📱 Aplicativo Mobile

O aplicativo HidroFlow é responsável por:

- Monitorar a umidade do solo em tempo real
- Exibir os dados coletados pelos sensores conectados ao ESP32
- Permitir o acionamento manual da irrigação
- Oferecer uma interface intuitiva, projetada no Figma

> O app se comunica com o microcontrolador via Bluetooth (ou futuramente via Wi-Fi) para obter dados e controlar o sistema.

---

## 🔌 Firmware – Sennity (ESP32)

O firmware Sennity é a parte embarcada do sistema, responsável por ler os sensores e controlar a bomba de água de forma autônoma.

### ⚙️ Funcionalidades:
- Leitura de sensores de umidade (entrada analógica)
- Acionamento automático da bomba de irrigação (saída digital)
- Monitoramento contínuo com intervalo configurável
- Envio de dados via porta serial *(futuramente por Wi-Fi com MQTT/HTTP)*
- Compatível com simulação em [Wokwi](https://wokwi.com/)

---

### 🔧 Requisitos:
- ESP32 DevKit (ou similar)
- Arduino IDE ou PlatformIO
- Sensor de umidade analógico
- Bomba d'água (5V ou 12V)
- Relé ou transistor
- Protoboard, jumpers e cabo USB

---

### 🗂️ Pinagem Sugerida:

| Função               | Pino no ESP32 |
|----------------------|---------------|
| Sensor de Umidade    | GPIO 36       |
| Bomba d'água (relé)  | GPIO 27       |
| VCC (sensor)         | 3.3V          |
| GND                  | GND           |

> Os pinos podem ser modificados no arquivo `main.ino`.

---

### 🧪 Como usar o firmware

1. Abra `main.ino` na Arduino IDE.  
2. Adicione a URL de placas ESP32:
3. Instale a placa `ESP32 by Espressif Systems`.  
4. Selecione a placa `ESP32 Dev Module`.  
5. Conecte o ESP32 via USB.  
6. Durante o upload, **pressione o botão BOOT** até o início da escrita.  
7. Use o Monitor Serial (baud rate `115200`) para visualizar os dados.

---


## Equipe

- Design do site, parte do desenvolvimento e revisão do relatório: **[Mariana Araripe](https://github.com/marianaararipe)**  
- Desenvolvimento do site: [Ivan Henrique](https://github.com/Iwanhrq)
- Análise de dados: Pedro Filipini  
- Relatório e edição de vídeo: [Emile Nogueira](https://github.com/EmileCristine)


## 📂 Estrutura do Repositório

```bash
/
├── app/          # Código do aplicativo mobile
└── firmware/     # Código do ESP32 (Sennity)

