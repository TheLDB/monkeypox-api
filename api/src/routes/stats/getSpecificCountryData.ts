
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

interface QueryParams {
    country: string;
}

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	const prisma = new PrismaClient();

	fastify.options("/:country", async function(request, reply) {
		reply.code(200)
		return;
	});
	
	fastify.get<{Params: QueryParams}>("/:country", async function (request, reply) {
        const { country } = request.params; 
        const countryData = await prisma.countryData.findUnique({
            where: {
                country
            }
        });

		if(countryData) {
			reply.code(200).send({
				code: 200,
				data: countryData
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
