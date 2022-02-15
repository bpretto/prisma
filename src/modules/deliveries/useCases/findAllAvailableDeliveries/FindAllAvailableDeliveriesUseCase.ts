import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableDeliveriesUseCase {
    async execute() {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                end_at: null,
                deliveryman: null,
            }
        })

        return deliveries
    }
}