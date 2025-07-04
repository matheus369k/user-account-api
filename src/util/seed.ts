import { fakerPT_BR } from '@faker-js/faker';
import { prisma } from '@/lib/prisma';

const seed = async () => {
	await prisma.user.deleteMany();
	const fakeUsers = [
		...Array.from({
			length: 10,
		}).map(() => {
			return {
				name: fakerPT_BR.person?.firstName(),
				email: fakerPT_BR.internet?.email(),
				password: fakerPT_BR.internet?.ip(),
			};
		}),
	];
	await prisma.user.createMany({
		data: fakeUsers,
	});
};

seed().finally(() => console.log('finished seed script....'));
