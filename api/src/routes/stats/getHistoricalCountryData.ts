
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

interface QueryParams {
    page: number;
}

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	const prisma = new PrismaClient();

	fastify.options("/historicalCountryData", async function(request, reply) {
		reply.code(200)
		return;
	});
	
	fastify.get<{Querystring: QueryParams}>("/historicalCountryData", async function (request, reply) {
        const { page } = request.query; 
		const historicalCountryData = await prisma.historicalCountryData.findMany({
            take: page * 350
        });

		if(historicalCountryData.length > 0) {
			reply.code(200).send({
				code: 200,
				data: historicalCountryData
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
