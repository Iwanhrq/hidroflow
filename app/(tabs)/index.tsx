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
import { useAuth } from '../context/auth';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../../components/Card';

export default function Home() {
  const [conjuntos, setConjuntos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [espUmidade, setEspUmidade] = useState('');
  const [espIrrigacao, setEspIrrigacao] = useState('');

  const { logout } = useAuth();
  const router = useRouter();

  const abrirModalParaNovo = () => {
    setEditandoId(null);
    setNome('');
    setEspUmidade('');
    setEspIrrigacao('');
    setModalVisible(true);
  };

  const adicionarOuEditarConjunto = () => {
    const nomeFinal =
      nome.trim() !== '' ? nome : `Conjunto ${conjuntos.length + 1}`;

    if (editandoId !== null) {
      setConjuntos(prev =>
        prev.map(conjunto =>
          conjunto.id === editandoId
            ? { ...conjunto, nome: nomeFinal, espUmidade, espIrrigacao }
            : conjunto
        )
      );
    } else {
      const novoConjunto = {
        id: Date.now(),
        nome: nomeFinal,
        espUmidade,
        espIrrigacao,
      };
      setConjuntos([...conjuntos, novoConjunto]);
    }

    setModalVisible(false);
    setNome('');
    setEspUmidade('');
    setEspIrrigacao('');
    setEditandoId(null);
  };

  const handleEditar = (id: number) => {
    const conjunto = conjuntos.find(c => c.id === id);
    if (conjunto) {
      setEditandoId(id);
      setNome(conjunto.nome);
      setEspUmidade(conjunto.espUmidade);
      setEspIrrigacao(conjunto.espIrrigacao);
      setModalVisible(true);
    }
  };

  const handleExcluir = (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este conjunto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setConjuntos(prev => prev.filter(c => c.id !== id));
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesome
            name="sign-out"
            size={35}
            color="#fff"
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.addButton} onPress={abrirModalParaNovo}>
          <Text style={styles.addButtonText}>+ Adicionar conjunto</Text>
        </TouchableOpacity>

        <FlatList
          data={conjuntos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              type="set"
              nome={item.nome}
              espUmidade={item.espUmidade}
              espIrrigacao={item.espIrrigacao}
              onEdit={() => handleEditar(item.id)}
              onDelete={() => handleExcluir(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.subtitle}>Nenhum conjunto adicionado ainda.</Text>
          }
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editandoId !== null ? 'Editar Conjunto' : 'Novo Conjunto'}
            </Text>

            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              placeholder="ESP Umidade"
              value={espUmidade}
              onChangeText={setEspUmidade}
              style={styles.input}
            />
            <TextInput
              placeholder="ESP Irrigação"
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
                onPress={adicionarOuEditarConjunto}
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
