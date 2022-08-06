
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

interface QueryParams {
    page: number;
}

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	const prisma = new PrismaClient();

	fastify.options("/historicalStateData", async function(request, reply) {
		reply.code(200)
		return;
	});
	
	fastify.get<{Querystring: QueryParams}>("/historicalStateData", async function (request, reply) {
        const { page } = request.query; 
		const historicalStateData = await prisma.historicalStateData.findMany({
            take: page * 350
        });

		if(historicalStateData.length > 0) {
			reply.code(200).send({
				code: 200,
				data: historicalStateData
			});
			return;
		}
		else {
			reply.code(500).send({
				code: 500,
				error: "Didn't find any info, please report."
			})
			return;
		}
	});
};

export default root;
