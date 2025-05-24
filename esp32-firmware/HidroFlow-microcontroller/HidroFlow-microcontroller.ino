//Sensor de umidade no pino GPIO36 = SENSOR_VP 
#define SENSOR_UMIDADE 36  

// Relé da bomba no pino D15 (GPIO 15)
const int releBomba = 15;

//Faixas ajustáveis com base na calibração do sensor
const int LIMITE_SECO = 1000;
const int LIMITE_UMIDO = 2500;

// Tempo que a bomba ficará ligada (5 segundos)
const unsigned long tempoLigado = 5000; 

unsigned long tempoAnterior = 0;
bool bombaLigada = false;


void setup() {
  pinMode(releBomba, OUTPUT);
  digitalWrite(releBomba, HIGH); //relé desligado inicialmente

  Serial.begin(115200);
  delay(1000);
  Serial.println("Sistema de irrigação iniciado.");
}

void loop() {
  int umidade = analogRead(SENSOR_UMIDADE); // Lê o valor analógico (0 a 4095 no ESP32)

  Serial.print("Valor lido do sensor: ");
  Serial.println(umidade);
  Serial.print(" | Estado do solo: ");

  if (umidade < 1000) {
    Serial.println("SECO");

    if(!bombaLigada){
      Serial.println("Solo seco! Ativando bomba...");
      digitalWrite(releBomba, LOW);
      tempoAnterior = millis();
      bombaLigada = true;
    }

  } 
  else if (umidade < 2500) {
    Serial.println("UMIDO");
  } 
  else {
    Serial.println("MUITO UMIDO");
  }


  if (bombaLigada && millis() - tempoAnterior >= tempoLigado){
    Serial.println("Desligando bomba.");
    digitalWrite(releBomba, HIGH);
    bombaLigada = false;
  }


  delay(3000); // Aguarda 3 segundo entre leituras
}

