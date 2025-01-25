import { PlanValuesForCreate, PlanValuesForUpdate } from "@/app/types";

interface PlanResponse {
  plan: {
    id: number;
    title: string;
    description: string;
    price: number;
    instructorId: string;
  };
  contract: {
    id: number;
    planId: number;
    studentId: string;
    instructorId: string;
  } | null;
}

// api/user/plan
// 全てのプランを取得する
export const getAllPlans = async () => {
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


// api/plan
// 特定のプランを取得する
export const getPlan = async (id: number) => {
  const res = await fetch(`/api/plan/${id}`);
  return res.json() as Promise<PlanResponse>
}

// プランを申し込む
export const applyPlan = async (applyValue: { planId: number, userId: string, instructorId: string }) => {
  const res = await fetch(`/api/plan/${applyValue.planId}`, {
    method: 'POST',
    body: JSON.stringify(applyValue),
  });
  return res;
}