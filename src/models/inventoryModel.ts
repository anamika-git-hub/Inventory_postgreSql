import { z } from 'zod';

export const CreateInventorySchema = z.object({
    name: z.string().min(3),
    quantity: z.coerce.number().int().nonnegative(),
    price: z.coerce.number().nonnegative(),
    description: z.string().optional(),
});

export type CreateInventoryInput = z.infer<typeof CreateInventorySchema>;


export const UpdateInventorySchema = z.object({
    name:z.string().min(3).optional(),
    quantity: z.coerce.number().int().nonnegative().optional(),
    price: z.coerce.number().nonnegative().optional(),
    description: z.string().optional(),
})

export type CreateUpdateInput = z.infer<typeof UpdateInventorySchema>;
