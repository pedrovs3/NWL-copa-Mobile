import { HStack, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { Header } from '../components/Header';
import { api } from '../services/api';
import Loading from '../components/Loading';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';

interface RouteParams {
  id: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');

  const toast = useToast();

  const route = useRoute();
  const { id } = route.params as RouteParams;
  console.log(id);

  const fetchPoolDetails = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);

      console.log(response.data.pool);
    } catch (err) {
      console.log(err);

      toast.show({
        title: 'Houve um erro ao carregar o bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeShare = async () => {
    await Share.share({
      message: poolDetails.code,
    });
  };

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={poolDetails.title} showBackButton showShareButton
              onShare={handleCodeShare}/>
      {
        poolDetails._count?.participants > 0
          ? <VStack px={5} flex={1}>
            <PoolHeader data={poolDetails}/>

            <HStack bgColor={'gray.800'} p={1} rounded={'md'} mb={5}>
              <Option
                title={'Seus palpites'}
                isSelected={optionSelected === 'guesses'}
                onPress={() => {
                  setOptionSelected('guesses');
                }}
              />

              <Option
                title={'Ranking do grupo'}
                onPress={() => {
                  setOptionSelected('ranking');
                }}
                isSelected={optionSelected === 'ranking'}
              />
            </HStack>

            <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
          </VStack>
          : <EmptyMyPoolList code={poolDetails.code}/>
      }
    </VStack>
  );
}
