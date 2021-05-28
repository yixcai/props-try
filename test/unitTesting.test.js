const expect = require('chai').expect;
const request = require('request');

const testVendorsLocation = [
    {name: "vendor1", location: [1,1]},
    {name: "vendor2", location: [2,1]},
    {name: "vendor3", location: [3,2]},
    {name: "vendor4", location: [3,3]},
    {name: "vendor5", location: [1,0]},
    {name: "vendor6", location: [2,2]},
    {name: "vendor7", location: [3,4]},
    {name: "vendor8", location: [5,4]}
]

const testVendorsResult = [
    {name: "vendor5", distance: 1},
    {name: "vendor1", distance: 1.45525898742},
    {name: "vendor2", distance: 1.23651542241},
    {name: "vendor6", distance: 1.35684122558},
    {name: "vendor3", distance: 1.85654782525},
]

describe("unit tests", () => {
    it('should return nearest five vendors', function (done){
        let curr = {"lat": 0, "lng": 0}
        var vendors = []
        for (i=0; i<testVendorsLocation.length; i++){
            var distance = Math.sqrt(Math.hypot(
                curr.lat - testVendorsLocation[i].location[0],
                curr.lng - testVendorsLocation[i].location[1]
            ))
            if(Number.isFinite(distance)){
                vendors.push({name: testVendorsLocation[i].name, distance: distance})
            }
        }
        vendors = vendors.sort(({distance:a},{distance:b}) => a - b).slice(0, 5)
        expect(vendors).to.eql(testVendorsResult)
        done()
    });
})