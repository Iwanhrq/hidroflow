# 💧 HidroFlow – Sistema de Irrigação Automatizada

**HidroFlow** é uma solução inteligente que reutiliza a água condensada de aparelhos de ar-condicionado para irrigar hortas escolares. O sistema promove o **uso consciente da água** e incentiva **práticas sustentáveis** no ambiente educacional.


Este repositório contém o código-fonte do **aplicativo mobile** e do **firmware para ESP32**.

<p align="center">
  <img width="1200" height="768" alt="sennity" src="https://github.com/user-attachments/assets/c8519ba1-0c53-4281-9ca5-649dc22cc3bd" />
</p>

---

## 📱 Aplicativo Mobile

O aplicativo HidroFlow permite:

- Monitorar a umidade do solo em tempo real
- Receber e exibir dados diretamente dos sensores conectados ao ESP32
- Acionar a irrigação manualmente
- Navegar por uma interface intuitiva (protótipos criados no [Figma](https://www.figma.com/design/atPiNbUl8kKxzwkkMnEreF/HidroFlow-App-Design---Sennity?node-id=0-1&t=aORT66O7alV9LDpt-1))

> O app se comunica com o microcontrolador via **Bluetooth** (com possibilidade futura de **Wi-Fi**) para obter dados e controlar o sistema.

---

## 🔌 Firmware – Sennity (ESP32)

O firmware Sennity é a parte embarcada do sistema, responsável por ler os sensores e controlar a bomba de água de forma autônoma.

### ⚙️ Funcionalidades:
- Leitura de sensores de umidade (entrada analógica)
- Acionamento automático da bomba de irrigação (saída digital)
- Monitoramento contínuo com intervalo configurável
- Envio de dados via porta serial
> (com possibilidade futura de comunicação por **Wi-Fi com MQTT/HTTP**)
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

### ▶️ Como usar o firmware

1. Abra `main.ino` na Arduino IDE.  
2. Adicione a URL de placas ESP32:
3. Instale a placa `ESP32 by Espressif Systems`.  
4. Selecione a placa `ESP32 Dev Module`.  
5. Conecte o ESP32 via USB.  
6. Durante o upload, **pressione o botão BOOT** até o início da escrita.  
7. Use o Monitor Serial (baud rate `115200`) para visualizar os dados.

---

## 👥 Equipe

- 🎨 **[Mariana Araripe](https://github.com/marianaararipe)** – Responsável pelo **design das telas no Figma**, pela **documentação do projeto** e pela **realização dos testes com os sensores**  
- 💻 **[Ivan Henrique](https://github.com/Iwanhrq)** – Responsável pelo **desenvolvimento das telas principais** do aplicativo, focando em **experiência de uso**  
- 🔧 **[Davi França](https://github.com/Davi-Fran)** – Responsável pela **montagem inicial do protótipo físico** e pela **edição final do vídeo de apresentação**

---

## 📂 Estrutura do Repositório

```bash
/
├── app/          # Código do aplicativo mobile
└── firmware/     # Código do ESP32 (Sennity)
````

---

## 📚 Aprendizados

Ao longo do desenvolvimento do HidroFlow, a equipe pôde aprimorar diversas competências técnicas e interpessoais, como:

- Aplicação prática de sensores com ESP32 e microcontroladores
- Integração entre hardware (protótipo físico) e software (aplicativo mobile)
- Prototipação e design de interfaces com foco em usabilidade (Figma)
- Testes com sensores e validação funcional do sistema
- Trabalho em equipe, organização e gestão de tempo
- Reflexão sobre sustentabilidade, inovação e impacto social com tecnologia

---

## 🙏 Agradecimentos

Agradecemos ao professor **Rafael de Colle**, à **ETEC de Hortolândia** e à organização do **Desafio Learning Sectors 2025** pelo apoio, orientação e incentivo constante durante o desenvolvimento do projeto.

O desafio foi uma oportunidade valiosa para aplicar a tecnologia em um contexto real, alinhado com os Objetivos de Desenvolvimento Sustentável 🌍
