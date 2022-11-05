import { Center, Icon, Text } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import Logo from '../assets/logo.svg';

export function Signin() {
  const { signIn, user } = useAuth();

  console.log(user);

  return (
      <Center flex={1} bgColor="gray.900" p="7">
        <Logo width={212} height={40}/>
        <Button title="ENTRAR COM O GOOGLE"
                marginTop={12}
                type="SECONDARY"
                leftIcon={<Icon as={ FontAwesome5 }
                name="google"
                color="white"
                size="md"
                onPress={signIn}/>}
        />

        <Text color="white" textAlign="center" mt={4}>
          Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
        </Text>
      </Center>
  );
}
