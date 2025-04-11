import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Question = ({ route, navigation }) => {
    const { data, index = 0, answers = [] } = route.params;
    const question = data[index];
    const [selected, setSelected] = useState([]);

    const isMultiple = question.type === 'multiple-answer';

    const handleSelect = (i) => {
        if (isMultiple) {
            setSelected((prev) =>
                prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
            );
        } else {
            setSelected([i]);
        }
    };

    const goNext = () => {
        const newAnswers = [...answers, selected];
        if (index + 1 < data.length) {
            navigation.push('Question', {
                data,
                index: index + 1,
                answers: newAnswers
            });
        } else {
            navigation.replace('Summary', { data, answers: newAnswers });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>{question.prompt}</Text>
            {question.choices.map((choice, i) => (
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.choice,
                        selected.includes(i) && styles.selectedChoice
                    ]}
                    onPress={() => handleSelect(i)}
                    testID={`choice-${i}`}
                >
                    <Text style={styles.choiceText}>{choice}</Text>
                </TouchableOpacity>
            ))}
            <Button title="Next" testID="next-question" onPress={goNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1 },
    prompt: { fontSize: 18, marginBottom: 20 },
    choice: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginBottom: 10
    },
    selectedChoice: {
        backgroundColor: '#bde0fe'
    },
    choiceText: {
        fontSize: 16
    }
});

export default Question;
