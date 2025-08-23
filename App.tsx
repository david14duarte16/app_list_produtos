import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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
    <View style={styles.container}>
      {/* Mapeando e renderizando os produtos */}
      {listProdutos.map((prod) => (
        <View style={styles.listItem} key={prod.id}>
          {/* Exibindo a imagem do produto */}
          <Image
            source={{ uri: prod.image }} // A URL da imagem
            style={styles.productImage}
          />
          <View style={styles.textContainer}>
            <Text>{prod.title}</Text>
            <Text>R$ {prod.price.toFixed(2)}</Text> {/* Formata o preço */}
          </View>
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
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
    alignItems: 'center',  // Ajustei o alinhamento para exibir bem a imagem e o texto
    padding: 10,
  },
  productImage: {
    width: 100, // Tamanho da imagem (pode ajustar conforme necessário)
    height: 100,
    marginRight: 10, // Espaçamento entre imagem e texto
  },
  textContainer: {
    flexDirection: 'column',  // Para exibir o título e preço um abaixo do outro
  },
});
