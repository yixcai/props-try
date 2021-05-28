const expect = require('chair').expect;
const request = require('request')
const app = require('../server');

const baseUrl = 'http://localhost:5000/vendor'

const testVendorPark = {
    validBody:{
        "parkStatment": true,
        "location": [-37.79998544138848, 144.95624538089035],
        "testAddress": "cancer centre"
    }
}

const testVendorId = "6093f1ea06564d0effc0b075"

describe("vendor intergration tests", () => {
    it('should successfully set status of van of parking', function (done){
        request.post(
            {
                headers: {'content-type': 'application/json'},
                url: baseUrl + '/park/' + testVendorId,
                body: testVendorPark.validBody,
                json: true,
            },
            function (error, response, body){
                expect(response.statusCode).to.equal(200);
                expect(body.updatedVendor.parked).to.equal(true);
                if (error) done(error);
                else done();
            }
        );
    })
})