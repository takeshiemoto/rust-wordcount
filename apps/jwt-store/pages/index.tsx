import {
  Button,
  Flex,
  Item,
  ListBox,
  Text,
  View,
  Well,
} from '@adobe/react-spectrum';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3333';

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigin = [API_URL];
    const token = localStorage.getItem('token');

    if (allowedOrigin.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);

type Food = { id: number; description: string };

export function Index() {
  const [jwt, setJwt] = useState(undefined);
  const [foods, setFoods] = useState<Food[]>([]);
  const [fetchError, setFetchError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedJwt = localStorage.getItem('token');
    setJwt(storedJwt);
  }, []);

  const getJwt = async () => {
    const { data } = await axios.get<{ token: string }>(`${API_URL}/jwt`);
    localStorage.setItem('token', data.token);
    setJwt(data.token);
  };

  const getFoods = async () => {
    try {
      const { data } = await axios.get<Food[]>(`${API_URL}/foods`);
      setFoods(data);
    } catch (error) {
      setFetchError(error?.message);
    }
  };

  return (
    <Flex minHeight={'100vh'} direction={'column'}>
      <View padding={25}>
        <View>
          <Button variant={'cta'} onPress={() => getJwt()}>
            Get JWT
          </Button>
        </View>
        <View marginTop={25}>
          {jwt && (
            <Well>
              <Text>{jwt}</Text>
            </Well>
          )}
        </View>
        <View marginTop={25}>
          <Button variant={'cta'} onPress={() => getFoods()}>
            Get Foods
          </Button>
        </View>
        <View marginTop={25}>
          <ListBox>
            {foods.map((food) => (
              <Item key={food.id}>{food.description}</Item>
            ))}
          </ListBox>
        </View>
      </View>
    </Flex>
  );
}

export default Index;
