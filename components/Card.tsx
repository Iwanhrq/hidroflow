import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { Droplet, Wifi, Edit3, Trash2, Clock, ChevronDown, ChevronUp } from 'lucide-react-native';

type CardType = 'set' | 'sensor' | 'actuator';
type HistoryType = 'irrigation' | 'moisture';

type Props = {
    type: CardType;
    nome: string;
    espUmidade?: string;
    espIrrigacao?: string;
    onEdit: (nome: string) => void;
    onDelete: (nome: string) => void;
}

// Dados de exemplo para o histórico
const mockHistory = [
    { type: 'irrigation', time: '14:30', date: '2024-03-20', value: 'Irrigação iniciada' },
    { type: 'moisture', time: '14:25', date: '2024-03-20', value: '85%' },
    { type: 'irrigation', time: '12:00', date: '2024-03-20', value: 'Irrigação finalizada' },
    { type: 'moisture', time: '11:55', date: '2024-03-20', value: '92%' },
    { type: 'irrigation', time: '09:30', date: '2024-03-20', value: 'Irrigação iniciada' },
    { type: 'moisture', time: '09:25', date: '2024-03-20', value: '78%' },
];

const filterOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Irrigações', value: 'irrigation' },
    { label: 'Umidade', value: 'moisture' }
];

export default function Card({ type, nome, espUmidade, espIrrigacao, onEdit, onDelete }: Props) {
    const [historyType, setHistoryType] = useState<HistoryType | 'all'>('all');
    const [isExpanded, setIsExpanded] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filterButtonPosition, setFilterButtonPosition] = useState({ x: 0, y: 0 });

    const handleEdit = () => {
        onEdit(nome);
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmar exclusão',
            `Tem certeza que deseja excluir "${nome}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: () => onDelete(nome) },
            ]
        );
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleFilterPress = (event: any) => {
        event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            setFilterButtonPosition({ x: pageX, y: pageY + height });
            setShowFilter(true);
        });
    };

    const renderHistoryItem = (item: typeof mockHistory[0]) => {
        const isIrrigation = item.type === 'irrigation';
        return (
            <View style={styles.historyItem}>
                <View style={styles.historyIcon}>
                    {isIrrigation ? (
                        <Wifi size={45} color="#0d47a1" />
                    ) : (
                        <Droplet size={45} color="#0d47a1" />
                    )}
                </View>
                <View style={styles.historyContent}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.historyTitle}>
                            {isIrrigation ? 'Última irrigação' : 'Umidade do Solo'}
                        </Text>
                        {!isIrrigation && (
                            <Text style={styles.historyValue}>{item.value}</Text>
                        )}
                    </View>
                    <Text style={styles.historyUpdate}>
                        Última atualização: {item.date} - {item.time}
                    </Text>
                </View>
            </View>
        );
    };

    const renderContent = () => {
        switch (type) {
            case 'set':
                return (
                    <>
                        <TouchableOpacity onPress={toggleExpand} style={styles.cardContent}>
                            <Text style={styles.espText}>ESP de Umidade: {espUmidade}</Text>
                            <Text style={styles.espText}>ESP de Irrigação: {espIrrigacao}</Text>

                            <View style={styles.row}>
                                <Droplet size={45} color="#0d47a1" />
                                <View style={styles.textColumn}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>Umidade do solo</Text>
                                        <Text style={styles.percent}>100%</Text>
                                    </View>
                                    <Text style={styles.update}>Última atualização: 11:45:10</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <Wifi size={45} color="#0d47a1" />
                                <View style={styles.textColumn}>
                                    <Text style={styles.label}>Última irrigação</Text>
                                    <Text style={styles.update}>Última atualização: 01:45:10</Text>
                                </View>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonActuator}>
                                    <Text style={styles.buttonActuatorText}>Ativar atuador</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.expandButton}>
                                {isExpanded ? (
                                    <ChevronUp size={24} color="#0d47a1" />
                                ) : (
                                    <ChevronDown size={24} color="#0d47a1" />
                                )}
                            </View>
                        </TouchableOpacity>

                        {isExpanded && (
                            <View style={styles.historyContainer}>
                                <View style={styles.historyHeader}>
                                    <Text style={styles.historyTitle}>Histórico</Text>
                                    
                                    <TouchableOpacity 
                                        style={styles.filterButton}
                                        onPress={handleFilterPress}
                                    >
                                        <Text style={styles.filterButtonText}>
                                            {filterOptions.find(opt => opt.value === historyType)?.label || 'Todos'}
                                        </Text>
                                        <ChevronDown size={16} color="#0d47a1" />
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={mockHistory
                                        .filter(item => historyType === 'all' || item.type === historyType)
                                        .slice(0, 5)
                                    }
                                    renderItem={({ item }) => renderHistoryItem(item)}
                                    keyExtractor={(_, index) => index.toString()}
                                    style={styles.historyList}
                                    showsVerticalScrollIndicator={true}
                                />

                                <Modal
                                    visible={showFilter}
                                    transparent
                                    animationType="fade"
                                    onRequestClose={() => setShowFilter(false)}
                                >
                                    <TouchableOpacity 
                                        style={styles.modalOverlay}
                                        activeOpacity={1}
                                        onPress={() => setShowFilter(false)}
                                    >
                                        <View style={[
                                            styles.modalContent,
                                            {
                                                position: 'absolute',
                                                top: filterButtonPosition.y,
                                                right: 20,
                                            }
                                        ]}>
                                            {filterOptions.map((option) => (
                                                <TouchableOpacity
                                                    key={option.value}
                                                    style={styles.filterOption}
                                                    onPress={() => {
                                                        setHistoryType(option.value as HistoryType | 'all');
                                                        setShowFilter(false);
                                                    }}
                                                >
                                                    <Text style={[
                                                        styles.filterOptionText,
                                                        historyType === option.value && styles.filterOptionTextActive
                                                    ]}>
                                                        {option.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </TouchableOpacity>
                                </Modal>
                            </View>
                        )}
                    </>
                );
            case 'sensor':
                return (
                    <>
                        <Text style={styles.espText}>Monitoramento de umidade</Text>

                        <View style={styles.row}>
                            <Droplet size={45} color="#0d47a1" />
                            <View style={styles.textColumn}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.label}>Umidade do solo</Text>
                                    <Text style={styles.percent}>100%</Text>
                                </View>
                                <Text style={styles.update}>Última atualização: 11:45:10</Text>
                            </View>
                        </View>
                    </>
                );
            case 'actuator':
                return (
                    <>
                        <Text style={styles.espText}>Atuador de bomba/irrigação</Text>

                        <View style={styles.row}>
                            <Wifi size={45} color="#0d47a1" />
                            <View style={styles.textColumn}>
                                <Text style={styles.label}>Última irrigação</Text>
                                <Text style={styles.update}>Última atualização: 01:45:10</Text>
                            </View>
                        </View>
                    </>
                );
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{nome}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
                        <Edit3 size={20} color="#0d47a1" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
                        <Trash2 size={20} color="#c62828" />
                    </TouchableOpacity>
                </View>
            </View>

            {renderContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 8,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        padding: 4,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#1F3984',
    },
    espText: {
        fontWeight: 'bold',
        color: '#1F3984',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    textColumn: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    label: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#0d47a1',
        flex: 1,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    percent: {
        fontWeight: 'bold',
        color: '#0d47a1',
        fontSize: 32,
    },
    update: {
        marginTop: -5,
        fontSize: 12,
        color: '#888',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    buttonActuator: {
        backgroundColor: '#0d47a1',
        padding: 10,
        width: 150,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonActuatorText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardContent: {
        position: 'relative',
    },
    expandButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 8,
    },
    historyContainer: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 15,
        height: 400,
    },
    historyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    historyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0d47a1',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#0d47a1',
        borderRadius: 6,
    },
    filterButtonText: {
        color: '#0d47a1',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        width: 200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    filterOptionText: {
        fontSize: 16,
        color: '#333',
    },
    filterOptionTextActive: {
        color: '#0d47a1',
        fontWeight: 'bold',
    },
    historyList: {
        flex: 1,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    historyIcon: {
        width: 50,
        alignItems: 'center',
    },
    historyContent: {
        flex: 1,
        marginLeft: 10,
    },
    historyUpdate: {
        fontSize: 14,
        color: '#666',
    },
    historyValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0d47a1',
    },
}); 