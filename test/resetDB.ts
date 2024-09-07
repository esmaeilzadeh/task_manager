// // import { promisify } from 'util';
// import { exec } from 'child_process';
// import { PrismaService } from 'nestjs-prisma';
// import { $Enums, Prisma } from '@prisma/client';
// import { LoggerService } from '../src/logger.service';
// import { seeder } from '../src/common/prisma/seeder';
// import EntityTypes = $Enums.EntityTypes;
//
// const promisifiedExec = promisify(exec);
//
// export async function resetDB(
//   prismaService: PrismaService,
//   loggerService: LoggerService,
// ) {
//   // loggerService.log('users count before', await prismaService.user.count())
//   await prismaService.$executeRawUnsafe(`
// DO $$ DECLARE
//     table_name_var text;
// BEGIN
//     FOR table_name_var IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' AND table_name <> '_prisma_migrations') LOOP
//         EXECUTE 'ALTER TABLE "' || table_name_var || '" DISABLE TRIGGER ALL';
//         EXECUTE 'TRUNCATE TABLE "' || table_name_var || '" CASCADE';
//         EXECUTE 'ALTER TABLE "' || table_name_var || '" ENABLE TRIGGER ALL';
//     END LOOP;
// END $$;
//     `);
//   // loggerService.log('users count after', await prismaService.user.count())
//   await seeder();
//   loggerService.log('seed db.');
// }
