import {
  Center, IPressableProps, Pressable, Text,
} from 'native-base';

interface Props extends IPressableProps {
  title: string;
  isSelected: boolean;
}

export function Option({ title, isSelected = false, ...rest }: Props) {
  return (
    <Pressable flex={1} h={8} maxH={8} {...rest}>
      <Center h="full" w="full"
              bgColor={isSelected ? 'gray.600' : 'transparent'} rounded="sm">
        <Text color="gray.100" fontFamily="heading" fontSize="sm">
          {title}
        </Text>
      </Center>
    </Pressable>
  );
}
