"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let allComments = yield prisma.comment.findMany();
        allComments.forEach((p) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.comment.deleteMany({
                where: {
                    id: p.id,
                },
            });
        }));
        let allPosts = yield prisma.post.findMany();
        allPosts.forEach((p) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.post.deleteMany({
                where: {
                    id: p.id,
                },
            });
        }));
        let allAuthors = yield prisma.author.findMany();
        allAuthors.forEach((p) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.author.deleteMany({
                where: {
                    id: p.id,
                },
            });
        }));
        let allUsers = yield prisma.user.findMany();
        allUsers.forEach((p) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.deleteMany({
                where: {
                    id: p.id,
                },
            });
        }));
        yield prisma.user.create({
            data: {
                name: "Teste",
                email: "teste@email",
                authors: {
                    create: {
                        tags: "Teste tags",
                        surname: "Teste surname",
                        completeName: "Teste completeName",
                        posts: {
                            create: {
                                title: "Teste Title",
                                text: "Teste Text",
                            },
                        },
                    },
                },
            },
        });
        console.log("========================================");
        console.log("                  queries               ");
        console.log("========================================");
        const users = yield prisma.user.findMany({
            include: {
                authors: true,
            },
        });
        console.log("query nativa!!!");
        yield prisma.$queryRaw(client_1.Prisma.sql `update user set name = 'TesteTeste' where email like '%Teste'`);
        users.forEach((u) => console.log(u.email));
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=script.js.map