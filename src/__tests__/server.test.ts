describe('Our first test', () => {
    it('It must review what 1 + 1 is 2', () => {
        expect(1+1).toBe(2)
    })
    it('It must review what 1 + 1 is not equal 2', () => {
        expect(1+1).not.toBe(3)
    })
})