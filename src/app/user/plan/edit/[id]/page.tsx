'use client'
import Plan from '@/app/components/Plan'
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => { 
  // paramsからIDを取得する
  const { id } = useParams();

  return (
    <Plan mode='edit' id={Number(id)}/>
  )
}

export default Page