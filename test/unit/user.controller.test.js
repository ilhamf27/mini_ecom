
const Usercontroller = require('../../controllers/user.controller')
const httpMocks = require('node-mocks-http');
const {User} = require('../../models')

jest.mock("../../models")
let req,res;
beforeEach(()=>{
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
})

const user = {
    username:"Cristin",
    email:"Luis",
    password:"CLBK"
}
describe("Usercontroller.register", ()=> {
    it("should return 500, user exist", async() => {
        const reject = Promise.reject({message: "Error FindOne"})
        User.findOne.mockResolvedValue({reject})
        req.body = user
        await Usercontroller.register()
        expect(res.statusCode).toBe(500)
    })
    it("should return 400, user exist", async() => {
        // const reject = Promise.reject({message: "Error FindOne"})
        User.findOne.mockResolvedValue({
            email: "abcd@gmail.com"
        })

        req.body = user
        await Usercontroller.register()
        expect(res.statusCode).toBe(400)
    })
})