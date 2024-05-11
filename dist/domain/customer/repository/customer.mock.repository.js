"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRepository = void 0;
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve()),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};
exports.MockRepository = MockRepository;
