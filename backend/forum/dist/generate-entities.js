"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
(async () => {
    const orm = await core_1.MikroORM.init({
        discovery: {
            warnWhenNoEntities: false,
        },
        dbName: 'forum',
        type: 'postgresql'
    });
    const generator = orm.getEntityGenerator();
    const dump = await generator.generate({
        save: true,
        baseDir: process.cwd() + '/test1',
        skipTables: ['users']
    });
    console.log(dump);
    await orm.close(true);
})();
//# sourceMappingURL=generate-entities.js.map