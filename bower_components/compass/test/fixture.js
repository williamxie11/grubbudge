/*jshint -W069 */

// commonly used data set

var fixture = module.exports = {};

var stats = fixture.stats = {};

var count = {name:'*', type:'Q', aggr:'count'},
  count_stat = 50;

var O_15 = {name: 'O_15', type: 'O'},
  O_15_stat = {cardinality: 15},
  O_30 = {name:'O_30', type:'O'},
  O_30_stat = {cardinality: 30};

var q10 = {name: 'Q_10', type: 'Q'},
  q10_stat = {cardinality: 10, min:0, max:150};

var o_stat = {cardinality: 5},
  q_stat = {cardinality: 100, min:0, max:150},
  t_stat = o_stat;

fixture.stat = {
  o_stat: o_stat,
  q_stat: q_stat,
  t_stat: t_stat,
  count_stat: count_stat
};

stats['OxQ'] = {
  1: o_stat,
  2: q_stat,
  count: count_stat
};

stats.OxO = {
  1: o_stat,
  2: o_stat,
  count: count_stat
};

stats['Ox#'] = {
  1: o_stat,
  count: count_stat
};

stats['O_30x#'] = {
  count: count_stat,
  O_30: O_30_stat
};

stats.OxOxQ = {
  1: o_stat,
  2: o_stat,
  3: q_stat,
  count: count_stat
};


stats.OxQxQ = {
  1: o_stat,
  2: q_stat,
  3: q_stat,
  count: count_stat
};

stats['QxQ'] = {
  1: q_stat,
  2: q_stat,
  count: count_stat
};

stats['QxT'] = {
  1: q_stat,
  2: t_stat,
  count: count_stat
};

stats['Q'] = {
  1: q_stat,
  count: count_stat
};

stats['#xQ'] = {
  count: count_stat,
  2: q_stat
};
stats['#xT'] = {
  count: count_stat,
  2: t_stat
};

// fixtures


fixture['O'] = {
  fields: [{name:1, type:'O'}],
  stats: {1: o_stat}
};

fixture['O_15'] = {
  fields: [O_15],
  stats: {O_15: O_15_stat}
};

fixture['O_30'] = {
  fields: [O_30],
  stats: {O_30: O_30_stat}
};

fixture['OxQ'] = {
  fields: [
      {name:1, type:'O'},
      {name:2, type:'Q'}
  ],
  stats: stats['OxQ']
};

fixture['OxA(Q)'] = {
  fields: [
      {name:1, type:'O'},
      {name:2, type:'Q', aggr: "avg"}
  ],
  stats: stats['OxQ']
};


fixture['Ox#'] = {
  fields: [{name:1, type:'O'}, count],
  stats: stats['Ox#']
};

fixture['O_30x#'] = {
  fields: [O_30, count],
  stats: stats['O_30x#']
};

fixture['OxOx#'] = {
  fields: [
    {name:1, type:'O'},
    {name:2, type:'O'},
    count
  ],
  stats: stats.OxO
};

fixture.OxOxQ = {
  fields: [
    {name:1, type:'O'},
    {name:2, type:'O'},
    {name:3, type:'Q'}
  ],
  stats: stats.OxOxQ
};


fixture['OxOxA(Q)'] = {
  fields: [
    {name:1, type:'O'},
    {name:2, type:'O'},
    {name:3, type:'Q', aggr:'sum'}
  ],
  stats: stats.OxOxQ
};

fixture.OxQxQ = {
  fields: [
    {name:1, type:'O'},
    {name:2, type:'Q'},
    {name:3, type:'Q'}
  ],
  stats: stats.OxQxQ
};

fixture['OxA(Q)xA(Q)'] = {
  fields: [
    {name:1, type:'O'},
    {aggr:'avg', name:2, type:'Q'},
    {aggr:'avg', name:3, type:'Q'}
  ],
  stats: stats.OxQxQ
};

fixture['OxQxQxQ'] = {
  fields: [
    {name:1, type: 'O'},
    {name:2, type: 'Q'},
    {name:3, type: 'Q'},
    {name:4, type: 'Q'}
  ],
  stats: {
    1: o_stat,
    2: q_stat,
    3: q_stat,
    4: q_stat
  }
};

fixture['OxOxQxQx#'] = {
  fields: [
    {name:1, type:'Q', selected: undefined},
    {name:2, type:'Q', selected: undefined},
    {name:3, type:'O', selected: undefined},
    {name:4, type:'O', selected: undefined},
    {name:'*', aggr:'count', selected: undefined}
  ],
  stats: {
    1: q_stat,
    2: q_stat,
    3: o_stat,
    4: o_stat,
    5: count_stat
  }
};


fixture['Q'] = {
  fields: [{name:1, type:'Q'}],
  stats: {1: q_stat}
};

fixture['Q_10'] = {
  fields: [q10],
  stats: {Q_10: q10_stat}
};

fixture['BIN(Q)'] = {
  fields: [{name:1, type:'Q', bin: {maxbins: 15}}],
  stats: {1: q_stat}
};

fixture['QxQ'] = {
  fields: [{name:1, type:'Q'}, {name:2, type:'Q'}],
  stats: stats['QxQ']
};

fixture['Qx#'] = {
  fields: [{name:1, type:'Q'}, count],
  stats: stats.Q
};

fixture['QxT'] = {
  fields: [
    {name:1, type:'Q'},
    {name:2, type:'T'}
  ],
  stats: stats['QxT']
};

fixture['QxYEAR(T)'] = {
  fields: [
    {name:1, type:'Q'},
    {name:2, type:'T', fn: 'year'}
  ],
  stats: stats['QxT']
};

fixture['A(Q)xYEAR(T)'] = {
  fields: [
    {name:1, type:'Q', aggr: 'avg'},
    {name:2, type:'T', fn: 'year'}
  ],
  stats: stats['QxT']
};


fixture['B(Q)xB(Q)x#'] = {
  fields: [
    {name:1, type:'Q', bin: {maxbins: 15}},
    {name:2, type:'Q', bin: {maxbins: 15}},
    count
  ],
  stats: stats.QxQ
};


fixture['#'] = {
  fields: [count],
  stats: {count: count_stat}
};

// FIXME: swap order for these

fixture['#xB(Q)'] = {
  fields: [
      count,
      {name:2, type:'Q', bin: {maxbins: 15}}
  ],
  stats: stats['#xQ']
};

fixture['#xYR(T)'] = {
  fields: [
      {name:'*', type:'Q', aggr:'count'},
      {name:2, type:'T', fn:'year'}
  ],
  stats: stats['#xT']
};

fixture['#xT'] = {
  fields: [
      {name:'*', type:'Q', aggr:'count'},
      {name:2, type:'T'}
  ],
  stats: stats['#xT']
};

fixture.birdstrikes = {};
fixture.birdstrikes.fields = [{"name":"Aircraft__Airline_Operator","type":"O","$$hashKey":"object:12","_any":true},{"name":"Aircraft__Make_Model","type":"O","$$hashKey":"object:13","_any":true},{"name":"Airport__Name","type":"O","$$hashKey":"object:14","_any":true},{"name":"Effect__Amount_of_damage","type":"O","$$hashKey":"object:15","_any":true},{"name":"Origin_State","type":"O","$$hashKey":"object:16","_any":true},{"name":"When__Phase_of_flight","type":"O","$$hashKey":"object:17","_any":true},{"name":"When__Time_of_day","type":"O","$$hashKey":"object:18","_any":true},{"name":"Wildlife__Size","type":"O","$$hashKey":"object:19","_any":true},{"name":"Wildlife__Species","type":"O","$$hashKey":"object:20","_any":true},{"name":"Flight_Date","type":"T","$$hashKey":"object:21","_any":true},{"name":"Cost__Other","type":"Q","$$hashKey":"object:22","_any":true},{"name":"Cost__Repair","type":"Q","$$hashKey":"object:23","_any":true},{"name":"Cost__Total_$","type":"Q","$$hashKey":"object:24","_any":true},{"name":"Speed_IAS_in_knots","type":"Q","$$hashKey":"object:25","_any":true},{"name":"*","aggr":"count","type":"Q","displayName":"Number of Records","$$hashKey":"object:26","_any":true}];
fixture.birdstrikes.stats = {"Airport__Name":{"min":null,"max":null,"cardinality":50,"count":10000,"maxlength":38,"numNulls":0,"sample":["SACRAMENTO INTL","DALLAS/FORT WORTH INTL ARPT","GREATER PITTSBURGH","KANSAS CITY INTL","LOUISVILLE INTL ARPT","CHICAGO MIDWAY INTL ARPT","CHARLOTTE/DOUGLAS INTL ARPT","MINETA SAN JOSE INTL","EPPLEY AIRFIELD","AUSTIN-BERGSTROM INTL"]},"Aircraft__Make_Model":{"min":null,"max":null,"cardinality":225,"count":10000,"maxlength":18,"numNulls":0,"sample":["B-747-1/200","B-727-200","FOKKER F100","SAAB-340","EMB-120","B-737-400","B-737-200","A-320","DC-9-30","DC-9"]},"Effect__Amount_of_damage":{"min":null,"max":null,"cardinality":6,"count":10000,"maxlength":11,"numNulls":0,"sample":["None","Minor","Substantial","Medium","C","B"]},"Flight_Date":{"min":null,"max":null,"cardinality":3625,"count":10000,"maxlength":13,"numNulls":0,"sample":["10/10/98 0:00","10/5/99 0:00","6/8/02 0:00","5/14/91 0:00","10/26/01 0:00","8/13/94 0:00","7/27/94 0:00","12/12/95 0:00","5/30/02 0:00","10/21/93 0:00"]},"Aircraft__Airline_Operator":{"min":null,"max":null,"cardinality":46,"count":10000,"maxlength":30,"numNulls":0,"sample":["UNITED AIRLINES","DELTA AIR LINES","CONTINENTAL AIRLINES","SOUTHWEST AIRLINES","AMERICAN AIRLINES","US AIRWAYS*","PINNACLE","BUSINESS","ABX AIR","NORTHWEST AIRLINES"]},"Origin_State":{"min":null,"max":null,"cardinality":29,"count":10000,"maxlength":14,"numNulls":0,"sample":["California","New Jersey","New York","Washington","Louisiana","Hawaii","Texas","Utah","Tennessee","Georgia"]},"When__Phase_of_flight":{"min":null,"max":null,"cardinality":7,"count":10000,"maxlength":12,"numNulls":0,"sample":["Landing Roll","Approach","Take-off run","Descent","Climb","Taxi","Parked"]},"Wildlife__Size":{"min":null,"max":null,"cardinality":3,"count":10000,"maxlength":6,"numNulls":0,"sample":["Medium","Small","Large"]},"Wildlife__Species":{"min":null,"max":null,"cardinality":37,"count":10000,"maxlength":21,"numNulls":0,"sample":["Unknown bird - small","Zebra dove","Unknown bird - large","Unknown bird - medium","Chimney swift","Unknown bird or bat","European starling","Killdeer","Horned lark","Barn owl"]},"When__Time_of_day":{"min":null,"max":null,"cardinality":4,"count":10000,"maxlength":5,"numNulls":0,"sample":["Day","Night","Dawn","Dusk"]},"Cost__Other":{"min":0,"max":1565354,"cardinality":65,"count":10000,"maxlength":7,"numNulls":0,"skew":0.023185985633316083,"stdev":18297.3071194526,"mean":424.2411,"median":0,"sample":["0","70","130","137","260","297","401","6860","8250","13364"]},"Cost__Repair":{"min":0,"max":7043545,"cardinality":165,"count":10000,"maxlength":7,"numNulls":0,"skew":0.03709480948374386,"stdev":97865.08006169728,"mean":3630.2865,"median":0,"sample":["0","317","668","2673","5218","7044","14331","14463","21552","40091"]},"Cost__Total_$":{"min":0,"max":7043545,"cardinality":196,"count":10000,"maxlength":7,"numNulls":0,"skew":0.03969958970315394,"stdev":102130.21419911268,"mean":4054.5276,"median":0,"sample":["0","18151","19133","20046","93546","211146","304926","559688","1715077","3811576"]},"Speed_IAS_in_knots":{"min":0,"max":350,"cardinality":123,"count":10000,"maxlength":3,"numNulls":2836,"skew":0.3110428807026861,"stdev":43.51546593453372,"mean":153.53517587939697,"median":140,"sample":["100","120","130","135","140","150","163","200","250","null"]},"count":10000};
