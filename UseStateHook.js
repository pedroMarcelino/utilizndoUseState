import React, { useState, useEffect, useMemo, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

export default function UseStateHook() {
    const [nome, setNome] = useState('');
    const [input, setInput] = useState('');
    const nomeInput = useRef(null);

    useEffect(() => {

        async function getStorege() {
            const nomeStorege = await AsyncStorage.getItem('nome');
            if (nomeStorege !== null) {
                setNome(nomeStorege)
            }
        }

        getStorege();

    }, []);


    useEffect(() => {

        async function saveStorege() {
            await AsyncStorage.setItem('nome', nome)
        }

        saveStorege();

    }, [nome]);

    function alteranome() {
        setNome(input);
        setInput('');
    }

    function novoNome() {
        nomeInput.current.focus()
    }

    const letrasNome = useMemo(() => nome.length, [nome])

    return (
        <View style={s.container}>
            <Text style={s.nome}>{nome}</Text>
            <TouchableOpacity>
                <Text onPress={alteranome}>Alterar nome</Text>
            </TouchableOpacity>
            <TextInput ref={nomeInput} placeholder="Seu nome..." value={input} onChangeText={(text) => { setInput(text) }} />
            <Text>Seu nome tem {letrasNome} Letras.</Text>
            <TouchableOpacity onPress={novoNome}>
                <Text>Novo nome</Text>
            </TouchableOpacity>
        </View>
    );

}

const s = StyleSheet.create({
    nome: {
        color: '#000',
        fontSize: 35
    },
    container: {
        flex: 1,
        marginTop: 60,
        marginLeft: 30
    }
});

