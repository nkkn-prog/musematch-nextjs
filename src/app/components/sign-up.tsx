import { signUpWithGoogleOath } from "../actions/auth"
import { PasswordInput, Button, TextInput, Box, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useHover } from '@mantine/hooks';
import Image from "next/image";


export const SignUpWithGoogle = ({errorMessage}:{errorMessage:string | null}) => {
  const { hovered, ref } = useHover();
  return (
    <Box mt='xl'>
      <Title order={4} mb="xl" ta='center'>外部サービスで登録</Title>
      <form action={() => signUpWithGoogleOath()}>
        <Box mt="md" ta='center' ref={ref}>
          <Button type="submit" c='#000' bd='1px solid gray' w='100%' bg={ hovered ? '#f6f6f6' : 'white' }>
            <Image src="/logo/google-logo.png" alt="Google" width={20} height={20} />
            <Text ml='sm'>Googleで登録</Text>
          </Button>
        </Box>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </Box>
  )
}

export const SignUpWithEmail = () => {
  const { hovered, ref } = useHover();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box mt='xl'>
      <Title order={4} mb="md" ta='center'>メールアドレスで登録</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
          mb="md"
        />
        {/* パスワードを入力するフォームを追加 */}
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="password"
          key={form.key('password')}

          {...form.getInputProps('password')}
        />
        <Box mt="md" ta='center' mb="xl" ref={ref}>
          {/* 未対応:ホバーした時にボタンの色を変える */}
          <Button type="submit" color="navy" w='100%' bg={hovered ? 'navy' : 'navy'}>
            新規登録
          </Button>
        </Box>
      </form>
    </Box>
  )
}

