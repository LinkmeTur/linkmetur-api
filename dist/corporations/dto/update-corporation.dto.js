"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCorporationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_corporation_dto_1 = require("./create-corporation.dto");
class UpdateCorporationDto extends (0, mapped_types_1.PartialType)(create_corporation_dto_1.CreateCorporationDto) {
}
exports.UpdateCorporationDto = UpdateCorporationDto;
//# sourceMappingURL=update-corporation.dto.js.map