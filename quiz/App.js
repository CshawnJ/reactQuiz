import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Question from './components/Question';
import Summary from './components/Summary';

const Stack = createNativeStackNavigator();

const quizData =[
     {
    prompt: "Movie Quote from who: 'Perfectly balanced. As all things should be'",
    type: "multiple-choice",
    choices: ["Thanos", "Luke Skywalker", "Chicken Little", "Batman"],
    correct: 0
},
{
    prompt: "What is my favorite color?",
    type: "multiple-answer",
    choices: ["green", "blue", "red", "tan"],
    correct: [0,2]
},
{
    prompt: "Am i doing this on my phone?",
    type: "true-false",
    choices: ["false", "true"],
    correct: 1
}
];

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Question">
                <Stack.Screen
                    name="Question"
                    component={Question}
                    initialParams={{ data: quizData, index: 0, answers: [] }}
                />
                <Stack.Screen name="Summary" component={Summary} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}