import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

interface Produto {
  id: number;
  title: string;
  price: number;
  image: string; // Certifique-se de que 'image' é uma URL
}

export default function App() {
  const [listProdutos, setListProdutos] = useState<Produto[]>([]);

  // Função para carregar produtos da API
  const carregarProdutos = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setListProdutos(data); // Atualiza o estado com os dados da API
    console.log(data); // Exibe os dados no console
  };

  // useEffect para chamar carregarProdutos apenas uma vez, após o componente ser montado
  useEffect(() => {
    carregarProdutos();
  }, []); // O array vazio garante que isso só aconteça uma vez, ao montar o componente

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Mapeando e renderizando os produtos */}
      {listProdutos.map((prod) => 
        <View style={styles.listItem} key={prod.id}>

          <Image source={{ uri: prod.image }} style={styles.image} />
          <Text style={styles.titulo}>{prod.title}</Text>
          <Text style={styles.preco}>{
            prod.price.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })
          }</Text>
          
        </View>
      )}
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    flexWrap: 'wrap', // Permite que o conteúdo quebre linha se necessário
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  titulo: {
    width: '50%', // Limita a largura do título para evitar overflow
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preco: {
    fontSize: 14,
    marginTop: 10,
  },
});
