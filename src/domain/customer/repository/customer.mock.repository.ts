export const MockRepository = ()=>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve()),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}