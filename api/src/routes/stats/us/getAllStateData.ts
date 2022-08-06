import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	const prisma = new PrismaClient();
	fastify.options("/states", async function (request, reply) {
		reply.code(200).send("Options route is available & a 200");
	});

	
	fastify.get("/states", async function (request, reply) {
		const allStateData = await prisma.stateData.findMany();
		if(allStateData.length > 0) {
			reply.code(200).send({
				code: 200,
				data: allStateData
			});
		}
		else {
			reply.code(500).send({
				code: 500,
				error: "Didn't find any info, please report."
			})
		}
	});
};

export default root;
