import { signInWithGoogleOath } from "../actions/auth"
import { Button, Box, Title, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from "next/image";
// import { signInWithCredentials } from "../actions/auth";

export const SignInWithGoogle = ({errorMessage}:{errorMessage:string | null}) => {
  const { hovered, ref } = useHover();
  return (
    <Box mt='xl'>
      <Title order={4} mb="xl" ta='center'>外部サービスでサインイン</Title>
      <form action={signInWithGoogleOath}>
        <Box mt="md" ta='center' mb="xl" ref={ref}>
          <Button type="submit" w='100%' bg={ hovered ? '#f6f6f6' : 'white'} c='#000' bd='1px solid #000'>
            <Image src="/logo/google-logo.png" alt="Google" width={20} height={20} />
            <Text ml='sm'>Googleでサインイン</Text>
          </Button>
        </Box>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </Box>
  )
}

// export const SignInWithEmail = () => {
//   const { hovered, ref } = useHover();
//   const form = useForm({
//     mode: 'uncontrolled',
//     initialValues: {
//       email: '',
//       password: '',
//       termsOfService: false,
//     },

//     validate: {
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//     },
//   });

//   return (
//     <Box mt='xl'>
//       <Title order={4} mb="md" ta='center'>メールアドレスでサインイン</Title>
//       <form onSubmit={form.onSubmit((values) => signInWithCredentials(values))}>
//         <TextInput
//           withAsterisk
//           label="Email"
//           placeholder="your@email.com"
//           key={form.key('email')}
//           {...form.getInputProps('email')}
//           mb="md"
//         />
//         <PasswordInput
//           withAsterisk
//           label="Password"
//           placeholder="password"
//           key={form.key('password')}
//           {...form.getInputProps('password')}
//         />
//         <Box mt="md" ta='center' mb="xl" ref={ref}>
//           {/* 未対応:ホバーした時にボタンの色を変える */}
//           <Button type="submit" color="navy" w='100%' bg={hovered ? 'navy' : 'navy'}>
//             ログイン
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   )
// }

// export const SignInWithCredentials = () => {
//   const form = useForm({
//     mode: 'uncontrolled',
//     initialValues: {
//       email: '',
//       password: '',
//     },
//   });
//   return (
//     <form onSubmit={form.onSubmit(() => signInWithCredentials())}>
//       <button type="submit">ああああ</button>
//     </form>
//   )
// }

