import React, { useState } from 'react';
import { View, Text, Button, Stylesheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const Question = ({ route, navigation }) => {
    const { data, index = 0, answers = []} = route.params;
    const question = data[index];
    const [selected, setSelected] = useState([]);

    const isMultiple = question.type === 'multiple-answer';

    const handleSelect = (i) => {
        if (isMulitple) {
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
        <View style={Stylesheet.container}>
            <Text style={Stylesheet.prompt}>{question.prompt}</Text>
            <ButtonGroup
                testID="choices"
                vertical buttons={question.choices}
                selectedIndexes={selected}
                onPress={handleSelect}
                containerStyle={{ marginBottom: 20 }}
            />
            <Button title="Next" testID="next-question" onPress={goNext} />
        </View>
    );

};

const styles = Stylesheet.create({
 container: { padding: 20, flex: 1 },
 prompt: { fontSize: 18, marginBottom: 20 }
});

export default Question;