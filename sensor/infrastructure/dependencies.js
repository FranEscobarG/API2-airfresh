"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDataSensorController = exports.registerDataSensorController = exports.getAllDataSensorUseCase = exports.registerDataSensorUseCase = exports.mysqlSensorRepository = void 0;
const RegisterDataSensorUseCase_1 = require("../application/RegisterDataSensorUseCase");
const GetAllDataSensorUseCase_1 = require("../application/GetAllDataSensorUseCase");
const RegisterDataSensorController_1 = require("./controllers/RegisterDataSensorController");
const GetAllDataSensorController_1 = require("./controllers/GetAllDataSensorController");
const MysqlSensorRepository_1 = require("./MysqlSensorRepository");
exports.mysqlSensorRepository = new MysqlSensorRepository_1.MysqlSensorRepository();
exports.registerDataSensorUseCase = new RegisterDataSensorUseCase_1.RegisterDataSensorUseCase(exports.mysqlSensorRepository);
exports.getAllDataSensorUseCase = new GetAllDataSensorUseCase_1.GetAllDataSensorUseCase(exports.mysqlSensorRepository);
exports.registerDataSensorController = new RegisterDataSensorController_1.RegisterDataSensorController(exports.registerDataSensorUseCase);
exports.getAllDataSensorController = new GetAllDataSensorController_1.GetAllDataSensorController(exports.getAllDataSensorUseCase);
//# sourceMappingURL=dependencies.js.map