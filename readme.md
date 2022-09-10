http://0.0.0.0:3000/tracking?id=4&name=EiEiMin&lat=16.82755509381635&long=96.17371358181923

http://0.0.0.0:3000/tracking?id=4&name=EiEiMin&lat=16.82755509381635&long=96.17371358181923


http://0.0.0.0:3000/tracking?id=1&name=AungThuOo&lat=16.82755509381635&long=96.17371358181923&status=2
http://0.0.0.0:3000/tracking?id=2&name=KaungMyatSoe&lat=16.82755509381635&long=96.17371358181923&status=1
http://0.0.0.0:3000/tracking?id=3&name=MyatPan&lat=16.82755509381635&long=96.17371358181923&status=2
http://0.0.0.0:3000/tracking?id=4&name=BMK&lat=16.82755509381635&long=96.17371358181923&status=1


http://0.0.0.0:3000/history




//https://stackoverflow.com/questions/59443078/how-can-i-add-an-array-to-hash-with-hmset-in-redis
/*
You can add it as another field in the same hash key, but stringify the array.

await redis.hset(`role-${roleId}`, 'mandatories', JSON.stringify(mandatories))
This way you can still HGETALL the whole role object data. But then, you have to manage the array of IDs as a whole.

Or, you can flatten out the array to a list, set, or sorted set. For example, to add as set, you can do:

await redis.sadd(`role-${roleId}-mandatories`, mandatories)
Note we are adding '-mandatories' to the key name. Here you are passing the array to the node.js redis sadd function. It will add each array item as a member in the set. This allows you to manipulate the set of mandatories directly (SPOP, SREM, SISMEMBER, etc).
*/