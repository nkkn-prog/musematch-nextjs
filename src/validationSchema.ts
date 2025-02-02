import { z } from "zod"

export const validationRegistSchema = z.object({
    name: z
        .string()
        .nonempty("名前を入力してください"),
    email: z
        .string()
        .nonempty("メールアドレスを入力してください")
        .email("無効なメールアドレス形式です"),
    password: z
        .string()
        .nonempty("パスワードを入力してください")
        .min(8, "パスワードは8文字以上です"),
    passwordConfirm: z
        .string()
        .nonempty("再確認パスワードを入力してください")
})
.superRefine(({ password, passwordConfirm }, ctx) =>  {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            code: "custom",
            message: "パスワードが一致しません",
            path: ["passwordConfirm"],
        })
    }
})

export const validationLoginSchema = z.object({
    email: z
        .string()
        .nonempty("メールアドレスを入力してください"),
    password: z
        .string()
        .nonempty("パスワードを入力してください")
})

export const validationProfileSchema = z.object({
    name: z
        .string()
        .nonempty("名前を入力してください")
        .max(50, "名前は50文字以内で入力してください"),
    bio: z
        .string()
        .max(1000, "自己紹介は1000文字以内で入力してください")
        .optional(),
    instruments: z
        .array(z.string())
        .optional()
        .default([]),
    imageUrl: z
        .string()
        .optional(),
})

export const validationPlanSchema = z.object({
    title: z
        .string()
        .nonempty("タイトルを入力してください")
        .max(100, "タイトルは100文字以内で入力してください"),
    description: z
        .string()
        .max(2000, "説明は2000文字以内で入力してください")
        .optional(),
    instruments: z
        .array(z.string())
        .optional()
        .default([]),
    thumbnailPath: z
        .string()
        .optional(),
    contract: z
        .string()
        .optional()
        .default(''),
    price: z
        .number()
        .optional()
        .default(0),
    time: z
        .number()
        .optional()
        .default(0),
    consultation: z
        .string()
        .optional()
        .default(''),
    cancellation: z
        .boolean()
        .optional()
        .default(false),
})