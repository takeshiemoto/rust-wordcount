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

type Food = { id: number; description: string };

/**
 * @see https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81
 * - ローカルストレージはXSS攻撃を受けやすい
 * - ex. getToken('token')が実行されて攻撃者のサーバにJWTが飛ばされる等
 * - CookieはCSRF攻撃を受けやすい
 *
 * - CookieはCSRF攻撃を受けやすい
 * - ブラウザが自動でCookieが実行されるため
 */
export function Index() {
  const [jwt, setJwt] = useState(undefined);
  const [foods, setFoods] = useState<Food[]>([]);
  const [fetchError, setFetchError] = useState<string | undefined>(undefined);
  const [newFoodMessage, setNewFoodMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await axios.get<{ token: string; expiry: string }>(
          '/refresh_token'
        );
        setJwt(data.token);
      } catch (error) {
        console.error(error);
      }
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get<{ csrfToken: string }>('/csrf-token');
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  const signin = async () => {
    setFoods([]);
    const { data } = await axios.get<{ token: string; expiry: string }>(
      `/signin`
    );
    setJwt(data.token);
  };

  const getFoods = async () => {
    setFoods([]);

    try {
      const { data } = await axios.get<Food[]>(`/foods`, {
        headers: { authorization: `Bearer ${jwt}` },
      });
      setFoods(data);
      setFetchError(undefined);
    } catch (error) {
      setFetchError(error?.message);
    }
  };

  const createFood = async () => {
    try {
      const { data } = await axios.post<{ message: string }>(
        '/foods',
        undefined,
        {
          headers: { authorization: `Bearer ${jwt}` },
        }
      );
      setNewFoodMessage(data.message);
    } catch (error) {
      setFetchError(error?.message);
    }
  };

  return (
    <Flex minHeight={'100vh'} direction={'column'}>
      <View padding={25}>
        <View>
          <Button variant={'cta'} onPress={() => signin()}>
            Sign In
          </Button>
        </View>
        <View marginTop={20}>
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
        <View marginTop={20}>
          <Button variant={'cta'} onPress={() => createFood()}>
            Create Food
          </Button>
        </View>
        <View marginTop={20}>
          <ListBox>
            {foods.map((food) => (
              <Item key={food.id}>{food.description}</Item>
            ))}
          </ListBox>
          {fetchError && (
            <Well>
              <Text>{fetchError}</Text>
            </Well>
          )}
        </View>
        <View marginTop={20}>
          {newFoodMessage && (
            <Well>
              <Text>{newFoodMessage}</Text>
            </Well>
          )}
        </View>
      </View>
    </Flex>
  );
}

export default Index;
