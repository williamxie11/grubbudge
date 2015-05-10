var expect = require('chai').expect,
  distance = require('../../src/cluster/distance');

describe('cp.cluster.distance.get()', function () {
  it('should return correct distance', function() {
    var table1 = {
      "marktype": "text",
      "enc": {
        "row": {"name": "Effect__Amount_of_damage","type": "O"},
        "col": {"name": "Aircraft__Airline_Operator","type": "O"},
        "text": {"name": "*","aggr": "count","type": "Q","displayName": "Number of Records"}
      }
    };

    var table2 = {
      "marktype": "text",
      "enc": {
        "col": {"name": "Effect__Amount_of_damage","type": "O"},
        "row": {"name": "Aircraft__Airline_Operator","type": "O"},
        "text": {"name": "*","aggr": "count","type": "Q","displayName": "Number of Records"}
      }
    };

    var colenc1 = distance.getEncTypeByColumnName(table1),
      colenc2 = distance.getEncTypeByColumnName(table2);

    expect(distance.get(colenc1, colenc2)).to.lt(1);
  });
});