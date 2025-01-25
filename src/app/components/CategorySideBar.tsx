import { Container, Flex, Menu, Paper, Text, MenuTarget, MenuItem, MenuDropdown, Box } from '@mantine/core';
import { IconChevronsRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export const CategorySideBar = () => {
  return (
    <>
      <Container size='100%' miw='20%'>
        <Paper withBorder p='1rem' my='5rem' mih='70vh'>
          <Text ta='center' fw='bold' mb='1rem'>全てのカテゴリ</Text>
          {/* TODO:このカテゴリはDBから取得した後、map関数で回して表示する 
          data.categoryにはカテゴリのデータを入れ、data.categoryinstrumentsに楽器を入れる。
          categoryIDinstrumentsIDも入れておくことで、パスの値をダイナミックにすることができる。
          */}
          <Flex direction='column' gap='1rem'>
            <Box>
              <Menu trigger="hover" openDelay={50} closeDelay={100} position='right'>
                <MenuTarget>
                  <Flex direction='row' gap='1rem' bd='1px solid #000' justify='space-between' mb='1rem'>
                    <Text>
                      <Link href='/plan/category/1'>金管楽器</Link>
                    </Text>
                    <IconChevronsRight stroke={2} />
                  </Flex>
                </MenuTarget>
                <MenuDropdown>
                  {/*  */}
                  <MenuItem><Link href='/plan/category/1/instrument/1'>トランペット</Link></MenuItem>
                  <MenuItem>トロンボーン</MenuItem>
                </MenuDropdown>
              </Menu>
            </Box>
          </Flex>
        </Paper>
      </Container>
    </>
  );
};

export default CategorySideBar;