import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Card from '../../components/Card';

export default function MoistureActuators() {
  const [actuators, setActuators] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [espIrrigacao, setEspIrrigacao] = useState('');



  const abrirModalParaNovo = () => {
    setEditandoId(null);
    setNome('');
    setEspIrrigacao('');
    setModalVisible(true);
  };

  const adicionarOuEditarAtuador = () => {
    const nomeFinal =
      nome.trim() !== '' ? nome : `Atuador ${actuators.length + 1}`;

    if (editandoId !== null) {
      setActuators(prev =>
        prev.map(atuador =>
          atuador.id === editandoId
            ? { ...atuador, nome: nomeFinal, espIrrigacao }
            : atuador
        )
      );
    } else {
      const novoAtuador = {
        id: Date.now(),
        nome: nomeFinal,
        espIrrigacao,
      };
      setActuators([...actuators, novoAtuador]);
    }

    setModalVisible(false);
    setNome('');
    setEspIrrigacao('');
    setEditandoId(null);
  };

  const handleEditar = (id: number) => {
    const atuador = actuators.find(a => a.id === id);
    if (atuador) {
      setEditandoId(id);
      setNome(atuador.nome);
      setEspIrrigacao(atuador.espIrrigacao);
      setModalVisible(true);
    }
  };

  const handleExcluir = (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este atuador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setActuators(prev => prev.filter(a => a.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Atuadores de Bomba</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.addButton} onPress={abrirModalParaNovo}>
          <Text style={styles.addButtonText}>+ Adicionar atuador</Text>
        </TouchableOpacity>

        <FlatList
          data={actuators}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              type="actuator"
              nome={item.nome}
              espIrrigacao={item.espIrrigacao}
              onEdit={() => handleEditar(item.id)}
              onDelete={() => handleExcluir(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.subtitle}>Nenhum atuador adicionado ainda.</Text>
          }
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editandoId !== null ? 'Editar Atuador' : 'Novo Atuador'}
            </Text>

            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              placeholder="ID Sensor"
              value={espIrrigacao}
              onChangeText={setEspIrrigacao}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={adicionarOuEditarAtuador}
                style={[styles.modalButton, { backgroundColor: '#1B3274' }]}
              >
                <Text style={{ color: '#fff' }}>
                  {editandoId !== null ? 'Salvar alterações' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#1B3274',
    height: 200,
    width: '100%',
    paddingLeft: 10,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  logoutButton: { position: 'absolute', top: 60, left: 10 },
  welcomeText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: { flex: 1, padding: 20, backgroundColor: '#fff' },
  addButton: {
    width: 190,
    alignItems: 'center',
    borderColor: '#1B3274',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 15,
  },
  addButtonText: {
    fontSize: 18,
    color: '#1B3274',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
});
