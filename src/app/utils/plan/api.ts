import { PlanValuesForCreate, PlanValuesForUpdate } from "@/app/types";

// 全てのプランを取得する
export const getPlan = async () => {
  const res = await fetch('/api/user/plan');
  return res.json();
}

//自身の特定のプランを取得する
export const getMyPlan = async (id: number) => {
  const res = await fetch(`/api/user/plan/${id}`);
  return res.json()
}

// プランを作成する
export const createPlan = async (planValues: PlanValuesForCreate) => {
  const res = await fetch('/api/user/plan', {
    method: 'POST',
    body: JSON.stringify(planValues),
  });
  return res;
};

// プランを更新する
export const updatePlan = async (planValues: PlanValuesForUpdate) => {
  const res = await fetch(`/api/user/plan/${planValues.id}`, {
    method: 'PUT',
    body: JSON.stringify(planValues),
  });
  return res;
};