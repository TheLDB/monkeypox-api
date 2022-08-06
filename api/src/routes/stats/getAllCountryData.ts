import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	const prisma = new PrismaClient();

	fastify.options("/countries", async function(request, reply) {
		reply.code(200)
		return;
	});
	
	fastify.get("/countries", async function (request, reply) {
		const allCountryData = await prisma.countryData.findMany();
		if(allCountryData.length > 0) {
			reply.code(200).send({
				code: 200,
				data: allCountryData
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
