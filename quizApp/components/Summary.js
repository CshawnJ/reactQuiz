import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Summary = ({ route }) => {
    const { data, answers } = route.params;
    let score = 0;

    const isCorrect = (correct, selected) => {
        if (Array.isArray(cprrect)) {
            return Array.isArray(selected) &&
            correct.length === selected.length &&
            correct.every(i => selecged.includes(i));
        }
        return selected[0] ===correct;
    };

    return (
        <View style={StyleSheet.container}>
            {data.map((q, i) => {
                const correct = q.correct;
                const userAnswer = answers[i];
                const correctAnswer = isCorrect(correct, userAnswer);
                if (correctAnswer) score++;

                return (
                    <View key={i} style={styles.block}>
                        <Text style={styles.question}>{q.prompt}</Text>
                        {q.choices.map((choice, j) => {
                            const wasSelected = userAnswer.includes(j);
                            const isRight = Array.isArray(correct)
                            ? correct.includes(j)
                            : correct === j;

                            let style = {};
                            if (wasSelected && isRight) style.fontWeight = 'bold';
                            if (wasSelected && isRight) style.textDecorationLine = 'line-through';

                            return (
                                <Text key={j} style={style}>- {choice}</Text>
                            );
                        })}
                        </View>
                );
            })}
            <Text testID="total" style={styles.score}>Total Score: {score}/{data.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    block: { marginBottom: 20 },
    question: { fontWeight: 'bold', marginBottom: 5 },
    score: { fontSize: 20, marginTop: 30, fontWeight: 'bold' }
  });
  
  export default Summary;