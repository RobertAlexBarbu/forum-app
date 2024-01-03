"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateForumDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_forum_dto_1 = require("./create-forum.dto");
class UpdateForumDto extends (0, mapped_types_1.PartialType)(create_forum_dto_1.CreateForumDto) {
}
exports.UpdateForumDto = UpdateForumDto;
//# sourceMappingURL=update-forum.dto.js.map